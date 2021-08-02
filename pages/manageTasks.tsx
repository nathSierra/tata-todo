import React from 'react'
import { Itask } from '../common/components/Task/Task'


type Iprops = {
    tasks: Itask[];
}

export default function manageTasks (props: Iprops) {
    return (
        <div>
            Hello Tasks
        </div>
    )
}
