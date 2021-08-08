import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {Iuser} from '../../models';





export const initialUser: Iuser = {firstName: '', lastName: '', id: '', email: '', groupID: '', password: ''};

export default function LoginForm() {
    // const {task, saveTask} = props;

  return (
      <Formik
       enableReinitialize
       initialValues={initialUser}
       onSubmit={(values, { setSubmitting }) => {
         console.info(values);
         setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           {/* <ErrorMessage name="email" component="div" /> */}
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