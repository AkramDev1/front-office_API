import React, { Component } from 'react'
import axios from 'axios'
import Footerbar from "../../footerbar/Footerbar"
import { URL_API } from '../../../constant';
import Posequest from './Posequest';
import './ArticleStyle.css'
import NavbarFix from '../../NavbarFix';
export class ArticleDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
         article:{

         }, 
         questions:[],
         reponses:[]
        }
      }
      componentDidMount(){
        axios.get(URL_API +`/article/${this.props.match.params.id}`, { })
            .then((response) => {            
                console.log(response.data)
                this.setState(
                    {article: response.data}
                )
            });

        axios.get(URL_API +`/question/${this.props.match.params.id}`, { })
            .then((response) => {            
                console.log("response.data", response.data)
                //new axios for response:
                response.data?.map(e=>{
                    console.log("e", e);
                     axios.get(URL_API +`/reponse/${e.id_user}/${e.id_quest}`, { })
                .then((res) => {            
                    this.setState(
                        {reponses: res.data}
                    )
                       console.log("res", res.data);
                       this.setState(
                        {questions:[...this.state.questions,[e, res.data]]}
                    )
                });
                })
                
            });
      }
        

    render() { 
        const URL_IMAGES = URL_API +'/uploads'
        console.log("question", this.state.questions);
        return (
            <>
            <NavbarFix />
            {/* <article className="art" style={{margin:'15px'}}>  
                <div className="par">
                    <img src={`${URL_IMAGES+'/'+this.state.article.image}`} alt="usin" style={{width:'600px'}}/>
                    <h3 style={{display:"flex"}}>
                        {this.state.article.title} <h5 className="time"> {this.state.article.creat_at}</h5>
                    </h3>
                </div>
                <p style={{width : '713px'}}> 
                    {this.state.article.description}
                </p>
            </article> */}
               <div className="card mb-3 articl mt-4"  >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={`${URL_IMAGES+'/'+this.state.article.image}`} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{this.state.article.title}</h5>
        <p className="card-text"> {this.state.article.description}.</p>
        <p className="card-text"><small className="text-muted">{this.state.article.creat_at}</small></p>
      </div>
    </div>
  </div>
</div>

            <article>
                <div className="showQuest">
                <Posequest />
                    {this.state.questions?.map(element => (
                        <div className="quest">
                            {element[0].question}
                            <div className="rep">
                            {element[1]?.map(el =>(
                                <div style={{display:'flex'}}>
                                 <h3>{el.reponse}</h3>
                                 </div>
                            ))}
                        </div>
                        </div>
                    ))}
                    
                </div>

            </article>

            <Footerbar />
            </>
        )
    }
}

export default ArticleDetail
