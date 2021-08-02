import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TaskList } from '../common/components/TaskList/TaskList'
import { Itask } from '../common/components/Task/Task'



export default function Home() {
  const tasks= [
  {
    name: 'Complete App',
    difficulty: 7,
  },
    {
    name: 'Clean cat box',
    difficulty: 1,
  },
    {
    name: 'Take out trash',
    difficulty: 2,
  },
    {
    name: 'Become Veteran Rank',
    difficulty: 4,
  },
]
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
        <TaskList tasks={tasks} />
      </main>

      <footer className={styles.footer}>
        <p>Hello</p>
      </footer>
    </div>
  )
}
