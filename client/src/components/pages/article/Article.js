
import React, { Component } from 'react'
import Footerbar from "../../footerbar/Footerbar"
import axios from 'axios'
import Articles from './Articles'
import {URL_API} from "../../../constant"
import './ArticleStyle.css'
import NavbarFix from '../../NavbarFix';
export class Article extends Component {
        constructor(props) {
          super(props)
          this.state = {
           articles:[]
          }
        }
componentDidMount(){
      axios.get(URL_API +"/article", { })
          .then((response) => {            
            this.setState({
              articles:response.data
            })
          })
    }
        

  render() {
    console.log(this.props)
    return (
      <div>
        <NavbarFix />
         <div className="row">              
            {this.state.articles?.map(article => (
              <div className="col-md-6" >
                  <Articles article={article} {...this.props}/>

               </div>
            ))}
          </div> 
          <Footerbar />
      </div>
    )
  }
}

export default Article
