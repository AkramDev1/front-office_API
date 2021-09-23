import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {URL_API} from '../../../constant';

export class Articles extends Component {

    render() { 
        const URL_IMAGES = URL_API +'/uploads'
        const {image, title,description, id_article} = this.props.article;
        return (
            // <div className="cardT">
            //     <div id="card">
            //           <div className="card-body">
            //               <img src={`${URL_IMAGES+'/'+image}`} alt={`artile image ${id_article}`} />
            //               <span>
            //                     <h4 className="card-title"> <a href="">{title}</a></h4>
            //                </span>
            //               <p className="card-text">{description}</p>
            //           </div>
            //            <Link to={`/Article/${id_article}`}>details</Link>
            //       </div>
            // </div>
            <>
            <div className="card mt-5" style={{width: '32rem'}}>
                <img src={`${URL_IMAGES+'/'+image}`} className="card-img-top" alt={`artile image ${id_article}`} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}.</p>
                    <Link to={`/Article/${id_article}`} className="btn btn-primary">details</Link>
                </div>
            </div>
        </>
            
        )
    }
}

export default Articles
