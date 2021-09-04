import React from 'react';
import {useState} from 'react'
import Axios from 'axios';
import prof from './avatar.png'
import Navbar from '../../Navbar';
import "./profileStyle.css"
import { Redirect } from 'react-router-dom';

export default function PROFILE({authorized}) {
    // if(!authorized){
    //     (<Redirect to="/" />)
    //   }
   
    const [fullName] = useState("");
  const [username] = useState("");
  const [email] = useState("");

  return (
    <>
        <Navbar/>
            <div >                                
                <h2 className="username">Hey <span className="user">{username} AkramDev </span> welcome back</h2>
                <div className="card-prof">
                    <img src={prof} alt="prof" className="prof"  />
                    <h4>{fullName} Akram Esaaidi</h4>
                    <h5>{email} Akram@Akram.com</h5>
                    <p className="title_prof"></p>
                    <p>This is your profile page where you can add all the information about yourself</p>
                    <div className="soc-prof">
                        <a href="#"><i class="fab fa-twitter"></i></a> 
                        <a href="#"><i class="fab fa-instagram"></i></a>  
                        <a href="#"><i class="fab fa-linkedin"></i></a>  
                        <a href="#"><i class="fab fa-facebook"></i></a> 
                    </div>
                    <p><button><a href="../contact" className="btn-prof">contact US..</a></button></p>
                </div>
            </div>  
    </>
  );
}
