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
  const registerUser = (values: Partial<Iuser>) => {
        const postUser = async ()=> {
      try{
      const result: {data: Iuser} = await axios.post(api.USER, values);
      login(result.data);
      router.push('/manageTasks')
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
         registerUser(values);
         setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
         <Form className="flex flex-col border-2 border-yellow-normal">
          <label htmlFor="username">Username</label>
          <Field type="text" name="username" className="hover:bg-yellow-light" placeholder="Melvin" />
          <label htmlFor="email">Email</label>
           <Field type="text" name="email" className="hover:bg-yellow-light" />
          <label htmlFor="password">Password</label>
           <Field type="password" name="password" className="hover:bg-yellow-light" />
          <label htmlFor="groupID">groupID</label>
          <Field type="text" name="groupID" className="hover:bg-yellow-light" placeholder="80-94-32-21"/>

           {/* <ErrorMessage name="password" component="div" /> */}
           <button className="bg-yellow-normal hover:bg-yellow-light" type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}