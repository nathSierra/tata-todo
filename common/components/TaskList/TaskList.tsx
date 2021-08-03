import React from 'react'
import { Task, Itask } from '../Task/Task'


type Iprops = {
    tasks: Itask[];
    setSelectedTask: (task: Itask) => void;
    onDelete: (id: string) => void;
}


export const TaskList = (props: Iprops) => {
    const {tasks, setSelectedTask, onDelete} = props;
    if (tasks.length === 0) <> No Tasks! </>
    return (
       <ul>
           {tasks.map((task: Itask) => <Task key={task.name} task={task} setSelectedTask={setSelectedTask} onDelete={onDelete}/>)}

       </ul>
    )
}
