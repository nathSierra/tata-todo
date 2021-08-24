import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { IbaseObject, Iuser } from '../../../models';

import { faPen } from "@fortawesome/free-solid-svg-icons"
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAccountsByTeamID } from '../../../../pages/manageTasks';
import axios from 'axios';
import { api } from '../../../api';

export interface Itask extends IbaseObject {
    name: string;
    description?: string;
    difficulty: number;
    isCompleted: boolean;
    teamID: string;
    assignedUserID?: string;
}

export type Iprops = {
  task: Itask;
  setSelectedTask: (task: Itask) => void;
  onDelete: (id: string) => void;
}

export const Task = (props: Iprops) => {
    const {task, setSelectedTask, onDelete} = props;
    const {name, difficulty, id} = task;
    const [assignedUserID, setAssignedUserID] = useState(task.assignedUserID || '');
    const { isLoading: isAccountsLoading, data } = useQuery(['accounts', task.teamID], async () => { return getAccountsByTeamID(task.teamID)})


    const queryClient = useQueryClient();

  const updateTaskMutation = useMutation(
    updatedTask => axios.post(api.TASK, updatedTask),
    {
      // When mutate is called:
      onMutate: async (updatedTask: Itask) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('tasks')

        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData<Itask[]>('tasks')

        // Optimistically update to the new value
        if (previousTodos) {
          queryClient.setQueryData<Itask[]>('tasks', [
            ...previousTodos,
          {...updatedTask, assignedUserID }
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
        queryClient.invalidateQueries('tasks')
      },
    }
  )


    if(isAccountsLoading){
        return <div>Looking for accounts...</div>
    }

    const handleChange = (event: any) => {
        setAssignedUserID(event.target.value);
        updateTaskMutation.mutate({...task, assignedUserID: event.target.value})
    }



    return (
        <li className="task">
            <button  onClick={(_) => setSelectedTask(task)}><FontAwesomeIcon icon={faPen} /></button>
            {name} | {difficulty} | {id} | {assignedUserID}
            <select value={assignedUserID} onChange={handleChange}>
            {data.accounts.map((account: Iuser) => {
                return <option key={account.id} value={account.id}>{account.username}</option>
            })}

            </select>
            <button onClick={(_) => onDelete(id)}>X</button>
        </li>
    )
}
