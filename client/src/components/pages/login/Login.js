 import React from 'react'
 import { useState} from 'react';
 import Axios from 'axios'
 import './LoginStyle.css'
import LoginDetails from './LoginDetails';
 
function Login() {


   const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(""); 
    const login = () =>
        { Axios.post("http://localhost:4001/",
        { username: username, password: password})
            .then((response) => {
                    if (response.data.message) {                                         
                    setLoginStatus(response.data.message); 
                }else {
                        setLoginStatus(response.data[0].username);
                        //  history.push("/home");
                        }
                        }); 
                    };




    return (
        <div>
               <LoginDetails setUsername={setUsername} setPassword={setPassword} loginStatus={loginStatus} login={login}/>
        </div>
    )
}

export default Login
