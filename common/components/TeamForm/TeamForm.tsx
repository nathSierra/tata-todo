import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Iteam } from '../../models';
import router, { useRouter } from "next/router";
import axios from "axios";
import { api } from "../../api";
import { useAuth } from "../../contexts/authContext";

import {v4 as uuidv4} from 'uuid';





export const initialTeam: Partial<Iteam> = {id: '', name: ''};

export interface IteamResponse {
  data: Iteam;
}
export default function TeamForm() {
  const { assignTeam } = useAuth();
  const createTeam = (values: Partial<Iteam>) => {
        const postTeam = async ()=> {
      try{
        const result: IteamResponse = await axios.post(api.TEAM, {...values, id: uuidv4()});
        console.info('result', result);
        console.info(result.data);
        assignTeam(result.data);
        router.push('/manageTasks')
      }
      catch(e) {
        console.info(e);
      }
    }
    postTeam();
  }

  return (
      <Formik
       enableReinitialize
       initialValues={initialTeam}
       onSubmit={(values, { setSubmitting }) => {
         createTeam(values);
         setSubmitting(false);
       }}
     >
       {({ isSubmitting }) => (
          <Form className="flex flex-col border-2 border-yellow-normal">

         {/* <ErrorMessage name="email" component="div" /> */}
           <label htmlFor="name">Team Name</label>
           <Field type="text" name="name" className="hover:bg-yellow-light" placeholder="Crazed Wombats" />

           {/* <ErrorMessage name="password" component="div" /> */}
           <button className="bg-yellow-normal hover:bg-yellow-light" type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
  );
}