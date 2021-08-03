import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TaskList } from '../common/components/TaskList/TaskList'
import { Itask } from '../common/components/Task/Task'
import { useState, useEffect } from 'react'
import TaskForm, { initialTask } from '../common/components/TaskForm/TaskForm'
import { v4 as uuidv4 } from 'uuid';
import { keyBy } from 'lodash'



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


export default function Home() {
  const [taskListByID, setTaskListByID] = useState(keyBy(tasks, 'id'));
  const [selectedTask, setSelectedTask] = useState(initialTask);

  const saveTask = (task: Itask) => {
    const id = task?.id || uuidv4();

    setTaskListByID({...taskListByID, [id]:task})

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
