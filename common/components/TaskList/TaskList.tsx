import React from 'react'
import { Task, Itask } from '../Task/Task'


type Iprops = {
    tasks: Itask[]
}


export const TaskList = (props: Iprops) => {
    const {tasks} = props;
    if (tasks.length === 0) <> No Tasks! </>
    return (

       <>
       <ul>
           {tasks.map((task: Itask) => <Task key={task.name} {...task} />)}
       </ul>
       </>
    )
}
