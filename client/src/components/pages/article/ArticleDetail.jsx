import React, { Component } from 'react'
import axios from 'axios'
import Footerbar from "../../footerbar/Footerbar"
import { URL_API } from '../../../constant';
import './ArticleStyle.css'
import NavbarFix from '../../NavbarFix';
export class ArticleDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
         article:{}, 
         questions:[],
         question:[],
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
      changHandeler =(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) =>{
        e.preventDefault()
        axios.post(URL_API +`/ajouterQuest/${this.state.article.id_article}`,
       this.state)
        .then(res =>{
            
            console.log("res", res);         
            this.setState(
              {question:[]}
          )
          window.location.reload();
        }).catch(err =>{
            console.log(err);
        })
    } 

    render() { 
        const URL_IMAGES = URL_API +'/uploads'
        const {question} = this.state;
        return (
            <>
            <NavbarFix />
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
                <form onSubmit={this.submitHandler}>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <input className="areaQuest" value={question} onChange={this.changHandeler} name="question"/>
                        <button class="myButton poseQuest" type="submit" style={{ fontSize: '12px'}}>POSER QUESTION</button>
                    </div>
                 </form>
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
