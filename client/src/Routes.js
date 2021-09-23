import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from "./components/Auth/Auth"
import Home from './components/pages/home/Home';
import Article from './components/pages/article/Article';
import ArticleDetail from './components/pages/article/ArticleDetail';
export default function Routes() {
    return (
        <div>
            <Router>
      <Switch>
        <Route exact path='/' component={Auth} />
         <Route exact path='/Article' component={Article} />
         <Route path='/Article/:id' component={ArticleDetail} />
        <Route path='/Home' exact component= {Home } />
      </Switch>
    </Router>
        </div>
    )
}
