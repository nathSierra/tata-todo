import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Itask } from "./Task";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { api } from "../../../api";

import { v4 as uuidv4 } from 'uuid';

type Iprops = {
    task: Itask | null;
    // saveTask: (task: Itask) => void;
    color?: string;
}

const ORANGE = 'hsl(	25, 89%, 60%)';



export const initialTask: Itask = {name: '', difficulty: 0, id: '', isCompleted: false, description: ""};

export default function TaskForm(props: Iprops) {
    const {task, color=ORANGE} = props;
    // const mutation = useMutation(event => {
    //   event.preventDefault()

    // })
    const queryClient = useQueryClient();

      const saveTask = async (task: Itask) => {
      const res = axios.post(api.TASK, task)
   }

    const mutation = useMutation(saveTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
  return (
      <Formik
       enableReinitialize
       initialValues={task || initialTask}
       onSubmit={(values, { setSubmitting, resetForm }) => {
         const id = values.id ? values.id : uuidv4();
         mutation.mutate({...values, id})
         setSubmitting(false);
         resetForm()
       }}
     >
       {({ isSubmitting }) => (
         <Form className="form-container">
            <span className="row"><label htmlFor="name">Name</label>
           <Field type="text" name="name" />
           </span>
           {/* <ErrorMessage name="email" component="div" /> */}
           <span className="row">
          <label htmlFor="difficulty" >Difficulty</label>
           <Field type="number" name="difficulty" />
           </span>
            <span className="row">
            <label htmlFor="description">Description</label>
           <Field type="text" name="description" />
           {/* <ErrorMessage name="password" component="div" /> */}
           </span>
           <button style={{backgroundColor: color}}type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}