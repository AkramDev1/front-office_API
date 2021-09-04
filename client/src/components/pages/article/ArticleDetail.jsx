import React, { Component } from 'react'
import axios from 'axios'
import usin from "./images/USIN.PNG"
import Navbar from '../../Navbar';
import Footerbar from "../../footerbar/Footerbar"
export class ArticleDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
         article:{

         }
        }
      }
      componentDidMount(){
        axios.get(`http://localhost:4001/article/${this.props.match.params.id}`, { })
            .then((response) => {            
                console.log(response.data)
                this.setState(
                    {article: response.data}
                )
            })
      }
        

    render() { 
        return (
            <>
            <Navbar />
            <article style={{margin:'15px'}}>  
                <img src={usin} alt="usin" style={{width:'600px'}}/>
                <h3 style={{display:"flex"}}>
                    {this.state.article.title} <h5 className="time"> {this.state.article.creat_at}</h5>
                </h3>
                <p style={{width : '713px'}}> 
                    {this.state.article.description}
                </p>
            </article>

            <Footerbar />
            </>
        )
    }
}

export default ArticleDetail
