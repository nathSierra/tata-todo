import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Itask } from "./Task";
import { useAuth } from "../../../contexts/authContext";
import { v4 as uuidv4 } from 'uuid';
import { Iuser } from "../../../models";

type Iprops = {
    task: Itask | null;
    saveTask: (task: Itask) => void;
    color?: string;
    users: Iuser[];
}

const ORANGE = 'hsl(	25, 89%, 60%)';



export const initialTask: Itask = {name: '', difficulty: 0, id: '', isCompleted: false, description: "", teamID: '', assignedUserID: ''};

export default function TaskForm(props: Iprops) {
    const {task, saveTask, color=ORANGE, users} = props;
    const { user } = useAuth();


  return (
      <Formik
       enableReinitialize
       initialValues={task || initialTask}
       onSubmit={(values, { setSubmitting }) => {
         console.info(values);
         if(!user){
           alert('gotta create a team dude');
           return;
         }
         saveTask({...values, teamID: user && user.teams && user.teams[0].id || '', id: task && task.id ? task.id : uuidv4() })
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
                      <span className="row">
            <label htmlFor="assignedUserID">Assigned User</label>
           <Field as="select" name="assignedUserID">

            {users.map((account: Iuser) => {
                return <option key={account.id} value={account.id}>{account.username}</option>
            })}


             </Field>
             </span>
           <button style={{backgroundColor: color}}type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}