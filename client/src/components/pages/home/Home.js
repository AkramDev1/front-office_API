import React from 'react';

import NavbarFix from '../../NavbarFix';
import Footerbar from "../../footerbar/Footerbar"
import HomeRoute from './HomeRoute';
import "./homeStyle.css"

import { Redirect } from 'react-router-dom';

export default function Home() {
  return (
    <>
    <div>
      <NavbarFix/>
       <HomeRoute/>
       <Footerbar />
       </div>
    </>
  );
}
