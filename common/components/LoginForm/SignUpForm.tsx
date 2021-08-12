import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {Iuser} from '../../models';
import { api } from "../../api";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useRouter } from 'next/router'





export const initialUser: Partial<Iuser> = {username: '', email: '', password: ''};

export default function SignUpForm() {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const createUser = (values: Partial<Iuser>) => {
        const postUser = async ()=> {
      try{
      const result: {data: Iuser} = await axios.post(api.USER, values);
      console.info(result);
      login(result.data);
      router.push('/')
      }
      catch(e) {
        console.info(e);
      }
    }
    postUser();
  }
  return (
      <Formik
       enableReinitialize
       initialValues={initialUser}
       onSubmit={(values, { setSubmitting }) => {
         createUser(values);
         setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
          <label htmlFor="username">Username</label>
          <Field type="text" name="username" />
          <label htmlFor="email">Email</label>
           <Field type="text" name="email" />
          <label htmlFor="password">Password</label>
           <Field type="password" name="password" />

           {/* <ErrorMessage name="password" component="div" /> */}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}