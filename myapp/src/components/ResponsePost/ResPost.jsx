import React from 'react'
import './ResPost.css'
export default function ResPost(props) {
    const date = (props.date)?props.date.slice(0, 10):"2023-12-15";
    const time = (props.date)?props.date.slice(11,19):"12:20:56";
    return (
        <div>
            <div className="card mb-3 my-3" id='post'>
                <img src={props.url} className="card-img-top" alt="..." id='post_img' />
                <div id='part_1'>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
                </div>
                <hr id='res_hr'></hr>
                <div className="card-body" id='resp_sec'>
                    <div><h3>Response</h3></div>
                    <p className="card-text">{props.Response}</p>
                    <p className="card-text"><small className="text-body-secondary"><h5>{date}</h5></small></p>
                </div>
            </div>
        </div>
    )
}
