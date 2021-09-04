import React from 'react'
import { Link, useHistory } from "react-router-dom";
import avatar from './img/avatar.png';
import bg from './img/bg.svg';
import wave from './img/wave.png';

function LoginDetails(props) {

     console.log(props);
    const {setUsername, setPassword, loginStatus, login,} = props
    return (
            <div>
              <div className="bodyy">
                    <img className="wave" src={wave} />
                    <div className="conttainer">
                        <div className="immg">
                            <img src={bg} />
                        </div>
                        <div className="login-content">
                            <form className="fform"    >
                                <img src={avatar} />
                                <h2 className="title">Welcome</h2>
                               
                                <div className="input-div one">
                                    <div className="i">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="div">
                                        <input id="username"  onChange={(event) => {
                                    setUsername(event.target.value);
                                     }} style={{backgroundColor:'white'}} name="username" placeholder="Username" type="text"  className="input"    />
                                    </div>
                                </div>

                               
                                <div className="input-div pass">
                                    <div className="i">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <div className="div">
                                        <input id="password"  onChange={(event) => {
                                        setPassword(event.target.value);
                                    }} placeholder="Password" name="password" type="password"  className="input"   />
                                    </div>
                                </div>

                                <Link className="switch" to="/Regist">@Switch to registration</Link>
                                {/* <input  type="submit" className="bttnn" value="Login"    onClick={() =>{
                                    history.push("/Home")
                                }} /> */}
                                <button className="bttnn"  onClick={login} onClick={login}>Login</button>
                                <h4>{loginStatus}</h4>

                             </form>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default LoginDetails
