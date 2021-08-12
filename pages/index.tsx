import Head from 'next/head'
import { useState } from 'react'
import LoginForm, { initialUser } from '../common/components/LoginForm/LoginForm'
import { useAuth } from '../common/contexts/authContext';
import home from '../styles/Home.module.css'


export default function Home() {
    const { user, login, logout } = useAuth();

  return (
    <div className={home.container}>
      <Head>
        <title>Ta Ta Todo</title>
        <meta name="description" content="A Chore app to consolidate ideas and needs" />
        <link rel="icon" href="/favicon.ico" />

      </Head>


      <main className={home.postIt}>
        <h1 className={home.title}>
          Welcome to Ta Ta Todo
        </h1>
        <LoginForm />
              <div className="flex flex-col justify-center items-center">
                    <h1>hello.</h1>
                    <h2>User: {user ? user.username : ''}</h2>
                    <div>
                        {/* <button onClick={login}>Login</button>
                        <button onClick={logout}>Logout</button> */}
                    </div>
                </div>

      </main>

      <footer className={home.footer}>
        <p>Hello</p>
      </footer>
    </div>
  )
}
