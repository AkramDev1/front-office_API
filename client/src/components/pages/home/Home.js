import React from 'react';

import Navbar from '../../Navbar';
import Footerbar from "../../footerbar/Footerbar"
import chu from './chu.PNG';
import "./homeStyle.css"
import { Redirect } from 'react-router-dom';

export default function Home({authorized}) {

  // if(!authorized){
  //   (<Redirect to="/" />)
  // }

  return (
    <>
    <div>
            <Navbar/>
        <div id="milieu"> 
            <div id="partie1">
                <h2>Hôpital des Spécialités</h2>
                <p>C’est un hôpital à vocation générale. Il est le plus grand des cinq hôpitaux du CHU Hassan II en termes de superficie, de capacité litière et même en termes de la diversité des spécialités qu’il abrite, tant médicales que chirurgicales.
                La prise en charge au sein de l’hôpital des spécialités concerne essentiellement les adultes. La prise en charge des enfants de moins de 15ans reste exceptionnelle, et ce, dans certaines disciplines telle la neurochirurgie.
                L’hôpital dispose de 19 services hospitaliers dont 10 chirurgicaux et 8 médicaux. Outre le service des urgences munis de soins intensifs, bloc opératoire et radiologie, il dispose également de deux Réanimations polyvalentes et deux blocs opératoires centraux.</p>
            </div>
            <img className="chu" src={chu} />
       </div>
       <Footerbar />
       </div>
    </>
  );
}
