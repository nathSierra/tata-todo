import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { IbaseObject } from '../../../models';

import { faPen } from "@fortawesome/free-solid-svg-icons"

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
        <li className="task">
            <button  onClick={(_) => setSelectedTask(task)}><FontAwesomeIcon icon={faPen} /></button>
            {name} | {difficulty} | {id}
             <button onClick={(_) => onDelete(id)}>X</button>
        </li>
    )
}
