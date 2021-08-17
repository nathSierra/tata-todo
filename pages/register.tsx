import React, { useState } from 'react'
import LoginForm from '../common/components/LoginForm/LoginForm'
import SignUpForm from '../common/components/LoginForm/SignUpForm'
import TeamForm from '../common/components/TeamForm/TeamForm'

 export enum registrationEnum  {
  SIGNUP = "SIGN_UP",
  TEAM = 'TEAM',
  LOGIN = "LOGIN"
}

export default function Register() {
  const [view, setView] = useState(registrationEnum.SIGNUP)


  switch(view) {
    case registrationEnum.LOGIN:
      return    (
      <main className="flex flex-col justify-center items-center p-40 h-screen"><LoginForm />
    <h2> Not registered? No problem: <button className="bg-yellow-normal hover:bg-yellow-light" onClick={() => setView(_ => registrationEnum.SIGNUP)}>Go to Registration</button></h2>
  </main>)
    case registrationEnum.SIGNUP:
      return (    <main className="flex flex-col justify-center items-center p-40 h-screen">
    <SignUpForm setView={setView} />
      <h2> Login instead? <button className="bg-yellow-normal hover:bg-yellow-light" onClick={() => setView(_ => registrationEnum.LOGIN)}>Login</button></h2>
     </main>)
         case registrationEnum.TEAM:
      return (   <main className="flex flex-col justify-center items-center p-40 h-screen">
    <TeamForm />
     </main>)
  }
}
