import React from 'react'
import './ResPost.css'
export default function post(props) {
    return (
        <div>
            <div className="card mb-3 my-3" id='post'>
                <img src={props.url} className="card-img-top" alt="..." id='post_img' />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">{props.description}</p>
                    <p className="card-text"><small className="text-body-secondary">{props.date}</small></p>
                </div>
            </div>
        </div>
    )
}
