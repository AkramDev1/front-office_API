import React from 'react'
import avatar from './img/avatar.png';
import bg from './img/bg.svg';
import wave from './img/wave.png';
import { Link, useHistory } from 'react-router-dom';

function RegistDetails(props) {
    
    console.log(props);
    const {setFullName, setUsername, setEmail, setPassword, addUser} = props
    
    return (
        <div>
            <div className="bodyy">
                   <img className="wave" src={wave} />
                   <div className="conttainer">
                       <div className="immg">
                           <img src={bg} />
                       </div>
                       <div className="login-content">
                           <form className="fform" action="">
                               <img src={avatar} />
                               <h2 className="title">Welcome</h2>
                               <div className="input-div one">
                                   <div className="i">
                                       <i className="fas fa-signature"></i>
                                   </div>
                                   <div className="div">
                                       <input id="fullName" placeholder="FULLNAME" style={{backgroundColor:'white'}} name="fullName" onChange={(event) => {
                                            setFullName(event.target.value);
                                        }}/>
                                   </div>
                               </div>

                               <div className="input-div one">
                                   <div className="i">
                                       <i className="fas fa-user"></i>
                                   </div>
                                   <div className="div">
                                       <input id="username" style={{backgroundColor:'white'}}  name="username" placeholder="Username" type="text"  className="input" onChange={(event) => {
                                            setUsername(event.target.value);
                                        }} />
                                   </div>
                               </div>

                               <div className="input-div pass">
                                   <div className="i">
                                       <i className="fas fa-envelope"></i>
                                   </div>
                                   <div className="div">
                                       <input id="email" placeholder="EMAIL.." name="email"    type="text"  className="input" onChange={(event) => {
                                        setEmail(event.target.value);
                                    }} />
                                   </div>
                               </div>
                              
                               <div className="input-div pass">
                                   <div className="i">
                                       <i className="fas fa-lock"></i>
                                   </div>
                                   <div className="div">
                                       <input id="password" placeholder="Password" name="password"  type="password"  className="input" onChange={(event) => {
                                        setPassword(event.target.value);
                                    }} />
                                   </div>
                               </div>
                               <Link className="switch"   to="./">@switch to login</Link>
                               <input  type="submit" className="bttnn" onClick={addUser} 
                               value="Registed"  />
                           </form>
                       </div>
                   </div>
               </div>
        </div>
    )
}

export default RegistDetails
