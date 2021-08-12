import React, { useState } from 'react'
import LoginForm from '../common/components/LoginForm/LoginForm'
import SignUpForm from '../common/components/LoginForm/SignUpForm'

 enum registration  {
  SIGNUP = "SIGN_UP",
  LOGIN = "LOGIN"
}

export default function Login() {
  const [View, setView] = useState(registration.LOGIN)

  if (View === registration.LOGIN){
  return (
    <>
   <LoginForm />
    <h3> Not registered? No problem: <button onClick={() => setView(_ => registration.SIGNUP)}>Go to Registration</button></h3>
   </>
  )}
  else {
    return(
    <>
    <SignUpForm />
      <h3> Login instead? <button onClick={() => setView(_ => registration.LOGIN)}>Login</button>:</h3>
    </>
    )
  }
}
