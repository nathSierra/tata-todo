import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Iuser } from '../../models';
import router, { useRouter } from "next/router";
import axios from "axios";
import { api } from "../../api";
import { useAuth } from "../../contexts/authContext";





export const initialUser: Partial<Iuser> = {username: '', password: ''};

export interface IloginResponse {
  data: {user: Iuser, accessToken: string}
}
export default function LoginForm() {
  const { user, login, logout, assignTeam } = useAuth();
  const loginUser = (values: Partial<Iuser>) => {
        const postUser = async ()=> {
      try{
        const result: IloginResponse = await axios.post(api.LOGIN, values);
        const {user, accessToken} = result.data;
        console.info(accessToken)
        localStorage.setItem('bearerToken', accessToken);
        console.info(user);
        login(user);



        router.push('/manageTasks');
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
         loginUser(values);
         setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
          <Form className="flex flex-col border-2 border-yellow-normal">

         {/* <ErrorMessage name="email" component="div" /> */}
           <label htmlFor="username">Username</label>
           <Field type="text" name="username" className="hover:bg-yellow-light" placeholder="mel" />
           <label htmlFor="password">Password</label>
           <Field type="password" name="password" className="hover:bg-yellow-light" />

           {/* <ErrorMessage name="password" component="div" /> */}
           <button className="bg-yellow-normal hover:bg-yellow-light" type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}