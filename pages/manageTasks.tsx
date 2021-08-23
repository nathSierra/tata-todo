import axios from 'axios'
import { keyBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import TaskForm, { initialTask } from '../common/components/Task/TaskForm/TaskForm'
import { Itask } from '../common/components/Task/TaskForm/Task'
import { TaskList } from '../common/components/Task/TaskList/TaskList'

import { v4 as uuidv4 } from 'uuid';
import { api, BASE_HREF } from '../common/api'
import { useAuth } from '../common/contexts/authContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'

type Iprops = {
    tasks: Itask[];
}

export const getTasksByTeamID = async (teamID: string) => {
    return (await axios.get(api.TASK +'/' + teamID)).data;
}

export default function ManageTasks (props: Iprops) {
  const [taskListByID, setTaskListByID] = useState({[initialTask.id]: initialTask});
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const { user } = useAuth();
  const teamID = user && user.teams ? user.teams[0].id : '';
  console.info(teamID);
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    newTask => axios.post(api.TASK, newTask),
    {
      // When mutate is called:
      onMutate: async (newTask: Itask) => {
        setSelectedTask(initialTask)
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('todos')

        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData<Itask[]>('tasks')

        // Optimistically update to the new value
        if (previousTodos) {
          queryClient.setQueryData<Itask[]>('tasks', [
            ...previousTodos,
          {...newTask, teamID}
          ])
        }

        return { previousTodos }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData<Itask[]>('tasks', context.previousTodos)
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )


  // const result = useQuery<Itask[], Error>(['tasks', teamID], () => getTasksByTeamID(teamID));

  const { isLoading, data } = useQuery(['tasks', teamID], async () => { return getTasksByTeamID(teamID)})


  if(isLoading){
    return <h1>Loading</h1>
  }

  // const postTask = (task: Itask) => {
  //       const id = task.id ? task.id : uuidv4();
  //       const postTask = async ()=> {
  //     try{
  //     const result = await axios.post(api.TASK, {...task, id});
  //     console.info(result);
  //     setTaskListByID({...taskListByID, [id]: {...task, id}})
  //     }
  //     catch(e) {
  //       console.info(e);
  //     }
  //   }
  //   postTask();
  // }

  const deleteTask = (id: string) => {
    const {[id]: deletedTask, ...tasksByID} = taskListByID;
    const deleteTask = async () => {
      try {
      const result = await axios.delete(`${api.TASK}/${id}`);
      }
      catch(e) {
        console.info(e);
      }
    }

    deleteTask();
    setTaskListByID(tasksByID)
  }

    return (
      <>
        <h1>Team: { user && user.teams && user.teams[0].name } </h1>
        <div className="m-4 flex flex-col justify-center items-center">
          <TaskForm task={selectedTask} saveTask={addTodoMutation.mutate} color="hsla(50, 100%, 63%, 1)"/>
        <TaskList setSelectedTask={setSelectedTask} onDelete={deleteTask} tasks={Object.values(data)} />
        </div>
        </>
    )
}
