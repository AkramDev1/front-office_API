
import React, { Component } from 'react'
import Navbar from '../../Navbar';
import Footerbar from "../../footerbar/Footerbar"
import axios from 'axios'
import Articles from './Articles'
 
import './ArticleStyle.css'
export class Article extends Component {
        constructor(props) {
          super(props)
          this.state = {
           articles:[]
          }
        }
componentDidMount(){
      axios.get("http://localhost:4001/article", { })
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
        <Navbar />
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
