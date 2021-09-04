import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Articles extends Component {

    render() { 
        const URL_IMAGES = 'http://localhost:4001/uploads'
        const {image, title,description, id_article} = this.props.article;
        return (
            <div className="cardT">
                <div id="card">
                      <div className="card-body">
                          <img src={`${URL_IMAGES+'/'+image}`} alt={`artile image ${id_article}`} />
                          <span>
                                <h4 className="card-title"> <a href="">{title}</a></h4>
                           </span>
                          <p className="card-text">{description}</p>
                      </div>
                       <Link to={`/Article/${id_article}`}>details</Link>
                  </div>
            </div>
            
        )
    }
}

export default Articles
