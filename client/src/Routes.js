import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/pages/login/Login"
import Regist from "./components/pages/login/Regist"
import Home from './components/pages/home/Home';
import Article from './components/pages/article/Article';
import ArticleDetail from './components/pages/article/ArticleDetail';
import ContactUs from './components/pages/contact/ContactUs';
import Profile from './components/pages/profil/Profile';
export default function Routes() {
    return (
        <div>
            <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/Regist' component={Regist} />
        <Route path='/Home' exact component= {Home } />
         <Route exact path='/Article' component={Article} />
         <Route path='/Article/:id' component={ArticleDetail} />
        <Route path='/contact' component=  { ContactUs } />
        <Route path='/Profile' component={ Profile } />
      </Switch>
    </Router>
        </div>
    )
}
