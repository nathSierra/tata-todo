import axios from 'axios'
import React, { useState } from 'react'
import TaskForm, { initialTask } from '../common/components/Task/TaskForm/TaskForm'
import { Itask } from '../common/components/Task/TaskForm/Task'
import { TaskList } from '../common/components/Task/TaskList/TaskList'

import { api } from '../common/api'
import { useAuth } from '../common/contexts/authContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type Iprops = {
    tasks: Itask[];
}

export const getTasksByTeamID = async (teamID: string) => {
    return (await axios.get(api.TASK +'/' + teamID)).data;
}

export const getAccountsByTeamID = async (teamID: string) => {
  return (await axios.get(api.ACCOUNTSBYTEAM + teamID)).data;
}

export default function ManageTasks (props: Iprops) {
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const { user, team } = useAuth();

  const teamID = team ? team.id : '';

  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    newTask => axios.post(api.TASK, newTask),
    {
      // When mutate is called:
      onMutate: async (newTask: Itask) => {
        setSelectedTask(initialTask)
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('tasks')

        // Snapshot the previous value
        const previousTasks = queryClient.getQueryData<Itask[]>('tasks')

        // Optimistically update to the new value
        if (previousTasks) {
          queryClient.setQueryData<Itask[]>('tasks', [
            ...previousTasks,
          {...newTask, teamID}
          ])
        }

        return { previousTasks }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.previousTasks) {
          queryClient.setQueryData<Itask[]>('tasks', context.previousTasks)
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('tasks')
      },
    }
  )

  const deleteTaskMutation = (useMutation(
    (deletedTaskID: string) => axios.delete(`${api.TASK}/${deletedTaskID}`),
    {
      onMutate: deletedTaskID => {
        const previousTasks = queryClient.getQueryData<Itask[]>('tasks');
        const removeDeleted = previousTasks?.filter((task) => task.id !== deletedTaskID);

        queryClient.setQueryData('tasks', removeDeleted);

        return queryClient.setQueryData('tasks', previousTasks);
      },

            // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('tasks')
      },
    }))



  const { isLoading: isTasksLoading, data: taskData } = useQuery(['tasks', teamID], async () => { return getTasksByTeamID(teamID)})
  const { isLoading: isAccountsLoading, data: userData } = useQuery(['accounts', teamID], async () => { return getAccountsByTeamID(teamID)})


  let appIsLoading = isTasksLoading || isAccountsLoading;
  if(appIsLoading){
    return <h1>Loading</h1>
  }

    return (
      <>
        <h1>Team: { user && user.teams && user.teams[0].name } </h1>
        <div className="m-4 flex flex-col justify-center items-center">
        <TaskForm task={selectedTask} saveTask={addTodoMutation.mutate} users={userData.accounts} color="hsla(50, 100%, 63%, 1)"/>
        <TaskList setSelectedTask={setSelectedTask} onDelete={deleteTaskMutation.mutate} tasks={Object.values(taskData)} />
        </div>
        </>
    )
}
