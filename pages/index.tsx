import Head from 'next/head'
import { useState } from 'react'
import { initialUser } from '../common/components/LoginForm/LoginForm'
import { useAuth } from '../common/contexts/authContext';
import styles from '../styles/Home.module.css'


export default function Home() {
    const { user, login, logout } = useAuth();

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
              <div>
                    <h1>Hello Context</h1>
                    <h2>User: {user ? user.username : "no user!"}</h2>
                    <div>
                        {/* <button onClick={login}>Login</button>
                        <button onClick={logout}>Logout</button> */}
                    </div>
                </div>

      </main>

      <footer className={styles.footer}>
        <p>Hello</p>
      </footer>
    </div>
  )
}
