import axios from 'axios'
import { keyBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import TaskForm, { initialTask } from '../common/components/Task/TaskForm/TaskForm'
import { Itask } from '../common/components/Task/TaskForm/Task'
import { TaskList } from '../common/components/Task/TaskList/TaskList'

import { v4 as uuidv4 } from 'uuid';
import { api, BASE_HREF } from '../common/api'
import { useMutation, useQueryClient, useQuery } from 'react-query'

type Iprops = {
    tasks: Itask[];
}

export default function ManageTasks (props: Iprops) {
  const [selectedTask, setSelectedTask] = useState(initialTask);
    const { isLoading, isError, data, error } = useQuery('tasks', async () => {

      const result = await axios.get(api.TASK)
      return result.data as Itask[];
    }
   )


   if(isLoading){
     return <span>Loading...</span>
   }
    //  const [taskListByID, setTaskListByID] = useState({[initialTask.id]: initialTask});

  // const queryClient = useQueryClient();


  // const mutation = useMutation()

  // useEffect(() => {
  //   const fetchData = async ()=> {
  //     try{

  //     setTaskListByID()
  //     }
  //     catch(e) {
  //       console.info(e);
  //     }
  //   }
  //   fetchData();
  // }, [])



  const deleteTask = (id: string) => {
    // const {[id]: deletedTask, ...tasksByID} = taskListByID;

    const deleteTask = async () => {
      try {
      await axios.delete(`${api.TASK}/${id}`);
      }
      catch(e) {
        console.info(e);
      }
    }

    deleteTask();
    // setTaskListByID(tasksByID)
  }
    return (

        <div className="m-4 flex flex-col justify-center items-center">
          <TaskForm task={selectedTask} color="hsla(50, 100%, 63%, 1)"/>
        <TaskList setSelectedTask={setSelectedTask} onDelete={deleteTask} tasks={data} />
        </div>
    )
}
