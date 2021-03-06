import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Itask } from "./Task";
import { useAuth } from "../../../contexts/authContext";

type Iprops = {
    task: Itask | null;
    saveTask: (task: Itask) => void;
    color?: string;
}

const ORANGE = 'hsl(	25, 89%, 60%)';



export const initialTask: Itask = {name: '', difficulty: 0, id: '', isCompleted: false, description: "", teamID: ''};

export default function TaskForm(props: Iprops) {
    const {task, saveTask, color=ORANGE} = props;
    const {team} = useAuth();

  return (
      <Formik
       enableReinitialize
       initialValues={task || initialTask}
       onSubmit={(values, { setSubmitting }) => {
         console.info(values);
         if(!team){
           alert('gotta create a team dude');
           return;
         }
         saveTask({...values, teamID: team.id})
         setSubmitting(false);
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