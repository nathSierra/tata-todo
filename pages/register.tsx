import React, { useState } from 'react'
import LoginForm from '../common/components/LoginForm/LoginForm'
import SignUpForm from '../common/components/LoginForm/SignUpForm'

 enum registration  {
  SIGNUP = "SIGN_UP",
  LOGIN = "LOGIN"
}

export default function Register() {
  const [View, setView] = useState(registration.SIGNUP)

  return (
    <main className="flex flex-col justify-center items-center p-40 h-screen">
   {View === registration.LOGIN ?
   <>
   <LoginForm />
    <h2> Not registered? No problem: <button onClick={() => setView(_ => registration.SIGNUP)}>Go to Registration</button></h2>
   </>
    :
    <>
    <SignUpForm />
      <h2> Login instead? <button onClick={() => setView(_ => registration.LOGIN)}>Login</button></h2>
     </>
  }
  </main>
  )
}
