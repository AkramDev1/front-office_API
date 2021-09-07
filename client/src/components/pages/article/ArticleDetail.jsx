import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../Navbar';
import Footerbar from "../../footerbar/Footerbar"
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
        axios.get(`http://localhost:4001/article/${this.props.match.params.id}`, { })
            .then((response) => {            
                console.log(response.data)
                this.setState(
                    {article: response.data}
                )
            });

        axios.get(`http://localhost:4001/question/${this.props.match.params.id}`, { })
            .then((response) => {            
                console.log("response.data", response.data)
                //new axios for response:
                response.data?.map(e=>{
                    console.log("e", e);
                     axios.get(`http://localhost:4001/reponse/${e.id_user}/${e.id_quest}`, { })
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
        const URL_IMAGES = 'http://localhost:4001/uploads'
        console.log("question", this.state.questions);
        return (
            <>
            <Navbar />
            <article style={{margin:'15px'}}>  
                <img src={`${URL_IMAGES+'/'+this.state.article.image}`} alt="usin" style={{width:'600px'}}/>
                <h3 style={{display:"flex"}}>
                    {this.state.article.title} <h5 className="time"> {this.state.article.creat_at}</h5>
                </h3>
                <p style={{width : '713px'}}> 
                    {this.state.article.description}
                </p>
            </article>

            <article>
            <div>POSER QUESTION</div>
                <input type="text"/>
                <div className="showQuest">
                    {this.state.questions?.map(element => (
                        <div>
                            {element[0].question}
                            <div>
                            {element[1]?.map(el =>{
                                return <h3>{el.reponse}</h3>;
                            })}
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
