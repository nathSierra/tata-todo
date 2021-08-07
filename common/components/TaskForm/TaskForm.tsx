import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Itask } from "../Task/Task";

type Iprops = {
    task: Itask | null;
    saveTask: (task: Itask) => void;
}



export const initialTask: Itask = {name: '', difficulty: 0, id: 0, isCompleted: false, description: ""};

export default function TaskForm(props: Iprops) {
    const {task, saveTask} = props;

  return (
      <Formik
       enableReinitialize
       initialValues={task || initialTask}
       onSubmit={(values, { setSubmitting }) => {
         console.info(values);
           saveTask(values)

       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="name" />
           {/* <ErrorMessage name="email" component="div" /> */}
           <Field type="number" name="difficulty" />
           <Field type="text" name="description" />
           {/* <ErrorMessage name="password" component="div" /> */}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}