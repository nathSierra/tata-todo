import axios from 'axios'
import { keyBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import TaskForm, { initialTask } from '../common/components/Task/TaskForm/TaskForm'
import { Itask } from '../common/components/Task/TaskForm/Task'
import { TaskList } from '../common/components/Task/TaskList/TaskList'

import { v4 as uuidv4 } from 'uuid';
import { api, BASE_HREF } from '../common/api'
import { useAuth } from '../common/contexts/authContext'

type Iprops = {
    tasks: Itask[];
}

export default function ManageTasks (props: Iprops) {
  const [taskListByID, setTaskListByID] = useState({[initialTask.id]: initialTask});
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const { team } = useAuth();

  useEffect(() => {
    const fetchData = async ()=> {
      try{
      const teamID = team && team.id? team.id : ''
      const result = await axios.get(api.TASK + '/teamID?'+ teamID);
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
  if(!team){
    return <h1>Why no team?</h1>
  }
    return (
      <>
        <h1>Team: { team.name } </h1>
        <div className="m-4 flex flex-col justify-center items-center">
          <TaskForm task={selectedTask} saveTask={saveTask} color="hsla(50, 100%, 63%, 1)"/>
        <TaskList setSelectedTask={setSelectedTask} onDelete={deleteTask} tasks={Object.values(taskListByID)} />
        </div>
        </>
    )
}
