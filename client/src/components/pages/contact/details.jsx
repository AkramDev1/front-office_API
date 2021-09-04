import React from 'react'

import Navbar from '../../Navbar';
import Footerbar from "../../footerbar/Footerbar"
function Details(props) {
    console.log(props);
    const {setNom, setPrenom, setTel, setEmailPro, setMessage, addEmployee, alert} = props
    return (
        <div>
            <div>
                <div>
                    <Navbar />
                    <div className = "content" >
                        <h1> Contact </h1> 
                        <p className = "parName" >
                            Pour obtenir un première étude gratuite de votre besoin, ou <strong strong > pour toute demande d 'information</strong>, n'
                            hésitez pas à nous envoyer un message à l 'aide du formulaire ci-dessous ! 
                            </p> 
                        <form className="contactForm">
                            <label for = "nom" > NOM <span> * </span> </label >
                            <input type = "text" name = "nom" className = "A" size = "32" placeholder = "Votre nom"
                            onChange = {
                                (event) => {
                                    setNom(event.target.value);
                                }
                            }/>
                            <label for = "prenom" > PRENOM < span > * </span></label >
                            <  input type = "text"  name = "prenom" size = "32" className = "B" placeholder = "Votre prénom"
                                onChange = {
                                    (event) => {
                                        setPrenom(event.target.value);
                                    }
                                }/> 
                            <label for = "tel" > Telephone < span > * </span> </label >
                            <  input type = "texte"  name = "tel" className = "D" size = "32" placeholder = "Votre numero de telephone"
                            onChange = {
                                (event) => {
                                    setTel(event.target.value);
                                }
                            }/> 
                            < label for = "emailPro" > EMAIL PROFESSIONNEL < span > * </span></label >
                            < input type = "text" name = "emailPro" size = "32" className = "C"  placeholder = "Votre Courriel"
                            onChange = {
                                (event) => {
                                    setEmailPro(event.target.value);
                                }
                            } />  
                            <label for = "message" > MESSAGE </label> 
                            < textarea cols = "39" rows = "6" name = "message" placeholder = "Votre message.."
                            onChange = {
                                (event) => {
                                    setMessage(event.target.value);
                                }
                            }> </textarea> 
                            <div className = "button_cont" align = "center" > < a className = "example_b" href = "#" onClick = { addEmployee } > SOUMETTRE </a></div >
                    </form> 
                    <div className="alert"> {alert} </div>           

        
            </div> 
            <Footerbar />
        </div>
    </div>
        </div>
    )
}

export default Details
