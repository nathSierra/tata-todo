import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Itask } from "./Task";

type Iprops = {
    task: Itask | null;
    saveTask: (task: Itask) => void;
}



export const initialTask: Itask = {name: '', difficulty: 0, id: '', isCompleted: false, description: ""};

export default function TaskForm(props: Iprops) {
    const {task, saveTask} = props;

  return (
      <Formik
       enableReinitialize
       initialValues={task || initialTask}
       onSubmit={(values, { setSubmitting }) => {
         console.info(values);
         saveTask(values)
         setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
            <label htmlFor="name">Name</label>
           <Field type="text" name="name" />
           {/* <ErrorMessage name="email" component="div" /> */}
          <label htmlFor="difficulty">Difficulty</label>
           <Field type="number" name="difficulty" />
            <label htmlFor="description">Description</label>
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