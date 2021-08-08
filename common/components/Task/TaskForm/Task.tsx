import React from 'react'
import { IbaseObject } from '../../../models';

export interface Itask extends IbaseObject {
    name: string;
    description?: string;
    difficulty: number;
    isCompleted: boolean;
}

export type Iprops = {
  task: Itask;
  setSelectedTask: (task: Itask) => void;
  onDelete: (id: string) => void;
}

export const Task = (props: Iprops) => {
    const {task, setSelectedTask, onDelete} = props;
    const {name, difficulty, id} = task;
    return (
        <li>
            <button onClick={(_) => setSelectedTask(task)}>Edit</button>
            {name} | {difficulty} | {id}
             <button onClick={(_) => onDelete(id)}>X</button>
        </li>
    )
}
