import axios from 'axios'
import { keyBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import TaskForm, { initialTask } from '../common/components/Task/TaskForm/TaskForm'
import { Itask } from '../common/components/Task/TaskForm/Task'
import { TaskList } from '../common/components/Task/TaskList/TaskList'

import { v4 as uuidv4 } from 'uuid';
import { api, BASE_HREF } from '../common/api'



type Iprops = {
    tasks: Itask[];
}


  const tasks= [
  {
    id: '1',
    name: 'Complete App',
    difficulty: 7,
    isCompleted: false,
  },
    {
    id: '2',
    name: 'Clean cat box',
    difficulty: 1,
    isCompleted: false,
  },
    {
    id: '3',
    name: 'Take out trash',
    difficulty: 2,
    isCompleted: false,
  },
    {
    id:'4',
    name: 'Become Veteran Rank',
    difficulty: 4,
    isCompleted: false,
  },
]






export default function ManageTasks (props: Iprops) {
     const [taskListByID, setTaskListByID] = useState({[initialTask.id]: initialTask});
  const [selectedTask, setSelectedTask] = useState(initialTask);

  useEffect(() => {
    const fetchData = async ()=> {
      try{
      const result = await axios.get(api.TASK);
      setTaskListByID(keyBy(result.data, 'id'))
      }
      catch(e) {
        console.info(e);
      }
    }
    fetchData();
  }, [])
  const saveTask = (task: Itask) => {
        const id = task.id ? task.id : uuidv4();
        const postTask = async ()=> {
      try{
      const result = await axios.post(api.TASK, {...task, id});
      console.info(result);
      setTaskListByID({...taskListByID, [id]: {...task, id}})
      }
      catch(e) {
        console.info(e);
      }
    }
    postTask();
  }

  const deleteTask = (id: string) => {
    const {[id]: deletedTask, ...tasksByID} = taskListByID;
    setTaskListByID(tasksByID)
  }
    return (
        <>
          <TaskForm task={selectedTask} saveTask={saveTask}/>
        <TaskList setSelectedTask={setSelectedTask} onDelete={deleteTask} tasks={Object.values(taskListByID)} />
        </>
    )
}
