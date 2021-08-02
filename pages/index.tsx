import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TaskList } from '../common/components/TaskList/TaskList'
import { Itask } from '../common/components/Task/Task'
import { useState, useEffect } from 'react'
import TaskForm, { initialTask } from '../common/components/TaskForm/TaskForm'

  const tasks= [
  {
    id: '1',
    name: 'Complete App',
    difficulty: 7,
  },
    {
    id: '2',
    name: 'Clean cat box',
    difficulty: 1,
  },
    {
    id: '3',
    name: 'Take out trash',
    difficulty: 2,
  },
    {
    id: '4',
    name: 'Become Veteran Rank',
    difficulty: 4,
  },
]


export default function Home() {
  const [taskList, setTaskList] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(initialTask);

  // useEffect(() => {alert(selectedTask.name)},[selectedTask])

  const saveTask = (task: Itask) => {
    setTaskList([...taskList, task])
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
        <TaskList setSelectedTask={setSelectedTask} tasks={taskList} />
      </main>

      <footer className={styles.footer}>
        <p>Hello</p>
      </footer>
    </div>
  )
}
