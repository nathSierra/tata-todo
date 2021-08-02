import React from 'react'

export type Itask = {
    name: string;
    description?: string;
    difficulty: number;
}

export const Task = (props: Itask) => {
    const {name, description, difficulty} = props;
    return (
        <li>
            {name} | {difficulty}
        </li>
    )
}
