import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { TaskList } from '../common/components/TaskList/TaskList'
import { Itask } from '../common/components/Task/Task'
import { useEffect, useState } from 'react'
import TaskForm, { initialTask } from '../common/components/TaskForm/TaskForm'
import { v4 as uuidv4 } from 'uuid';
import { keyBy } from 'lodash'
import axios from 'axios';



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
    id: '4',
    name: 'Become Veteran Rank',
    difficulty: 4,
    isCompleted: false,
  },
]

const BASE_HREF = 'http://localhost:5000';
const TASK = `${BASE_HREF}/Tasks`;

export default function Home() {
  const [taskListByID, setTaskListByID] = useState({[initialTask.id]: initialTask});
  const [selectedTask, setSelectedTask] = useState(initialTask);

  useEffect(() => {
    const fetchData = async ()=> {
      try{
      const result = await axios.get(TASK);
      setTaskListByID(keyBy(result.data, 'id'))
      }
      catch(e) {
        console.info(e);
      }
    }
    fetchData();
  }, [])
  const saveTask = (task: Itask) => {
        const postTask = async ()=> {
      try{
      const result = await axios.post(TASK, {...task, id: '4'});
      setTaskListByID({...taskListByID, [result.data.id]:task})
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
    <div className={styles.container}>
      <Head>
        <title>Tata Todo</title>
        <meta name="description" content="A Chore app to consolidate ideas and needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Tata Todo
        </h1>
        <TaskForm task={selectedTask} saveTask={saveTask}/>
        <TaskList setSelectedTask={setSelectedTask} onDelete={deleteTask} tasks={Object.values(taskListByID)} />
      </main>

      <footer className={styles.footer}>
        <p>Hello</p>
      </footer>
    </div>
  )
}
