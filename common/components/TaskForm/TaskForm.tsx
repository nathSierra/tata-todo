import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Itask } from "../Task/Task";
import { v4 as uuidv4 } from 'uuid';

type Iprops = {
    task: Itask | null;
    saveTask: (task: Itask) => void;
}

export const initialTask: Itask = {name: '', difficulty: 0, id: ''};

export default function TaskForm(props: Iprops) {
    const {task, saveTask} = props;

  return (
      <Formik
       enableReinitialize
       initialValues={task || initialTask}
       onSubmit={(values, { setSubmitting }) => {
           const id = uuidv4();
           saveTask({...values, id})
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="name" />
           {/* <ErrorMessage name="email" component="div" /> */}
           <Field type="number" name="difficulty" />
           {/* <ErrorMessage name="password" component="div" /> */}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}