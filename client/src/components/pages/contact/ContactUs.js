import React from 'react';
import { useState } from "react";
import { Redirect } from 'react-router-dom';
import Axios from "axios";
import Details from "./details"
import './contactStyle.css'
 
export default function ContactUs({authorized}) {
    // if(!authorized){
    //     (<Redirect to="/" />)
    //   }
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState(0);
  const [emailPro, setEmailPro] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");

  const addEmployee = () => {
      Axios.post("http://localhost:4001/create", { nom: nom, prenom: prenom, tel: tel, emailPro: emailPro, message: message, })
          .then(() => {
              setNom("")
              setPrenom("")  
              setTel("")
              setEmailPro("")
              setMessage("")            
              setAlert('message envoyer avec succes');

          })
          .catch((err) => { setAlert('Echec') })
  };

  return (
    <>
       {/* <h1 className='contact-us'>CONTACT</h1> */}
      <Details setNom= {setNom} setPrenom = {setPrenom} setTel = {setTel}setEmailPro = {setEmailPro} setMessage = {setMessage} addEmployee={addEmployee} alert={alert}/>
     </>
    );
}
