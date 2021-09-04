import React from 'react'
import { useState } from "react";
import Axios from 'axios'
import './LoginStyle.css'
import RegistDetails from './RegistDetails';


function Regist() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(0);
    const [password, setPassword] =useState(""); 
    const [UserList, setUserList] = useState([]); 

    const addUser = () => {
         Axios.post("http://localhost:4001/regist",
          { fullName: fullName, username: username, email: email, password: password, })
          .then(() => { 
             setUserList([ 
                  ...UserList,
         {
              fullName: fullName,
               username: username, 
                email: email, 
                password: password,
            },
            alert("User registed")
        ]); 
        console.log('success');
          }); };

    return (
        <div>
                <RegistDetails setFullName={setFullName} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} addUser={addUser}/>
            
        </div>
    )
}

export default Regist
