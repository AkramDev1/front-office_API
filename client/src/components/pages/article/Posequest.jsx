


    // const [question, setQuestion] =useState(""); 
    // const [QuestList, setQuestList] = useState([]); 

    // const addQuest = () => {
    //     console.log('sssssssss');
    //     console.log("article", this.props.id_article);

    //      axios.post(URL_API +`/ajouterQuest/${this.state.id_article}/${this.state.id_user}`,
    //      { question: question}
    //      )
    //      .then(() => { 
    //        setQuestList([ 
    //              ...QuestList,
    //     {
    //          question: question,

    //        },
    // //       alert("Question ajouter avec succès")
    //    ]); 
    // //   console.log('Question ajouter avec succès');
    //      })
    //      .catch((err) => { console.log(err); })
    //     };


import React, { Component } from 'react'
import axios from 'axios';
import { URL_API } from '../../../constant';

export default class Posequest extends Component {
    constructor(props) {
        super(props)
        this.state = {

             question:[]
        }
      }
      changHandeler =(e)=>{
          this.setState({[e.target.name]: e.target.value})
      }
      submitHandler = e =>{
          e.preventDefault()
          console.log("this.state", this.state);
          axios.post(URL_API +`/ajouterQuest/8/1`,
         this.state)
          .then(res =>{
              console.log("res", res);
          }).catch(err =>{
              console.log(err);
          })
          
      }
    render() {
        const {question} = this.state;
        return (
            <form onSubmit={this.submitHandler}>
                 <div style={{display:"flex", justifyContent:"center"}}>
             <input className="areaQuest" value={question} onChange={this.changHandeler} name="question"/>
             <button class="myButton poseQuest" type="submit">POSER QUESTION</button>
                {/* <a href="#"  class="myButton poseQuest">POSER QUESTION</a> */}
        </div>
            </form>
        )
    }
}
        