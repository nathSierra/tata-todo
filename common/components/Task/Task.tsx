import React from 'react'

export type Itask = {
    id: string;
    name: string;
    description?: string;
    difficulty: number;
}

export type Iprops = {
  task: Itask;
  setSelectedTask: (task: Itask) => void;
}

export const Task = (props: Iprops) => {
    const {task, setSelectedTask} = props;
    const {name, difficulty, id} = task;
    return (
        <li>
            {name} | {difficulty} | {id}
            <button onClick={(_) => setSelectedTask(task)}>Edit</button>
        </li>
    )
}
