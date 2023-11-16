import React from 'react'
import './Post.css'
export default function post(props) {
    return (
        <div>
            <div className="card mb-3 my-3" id='post'>
                <img src={props.url} className="card-img-top" alt="..." id='post_img' />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    )
}
