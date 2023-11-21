import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom';
export default function post(props) {
    const role = localStorage.getItem("role");
    const date = props.date.slice(0, 10);
    return (
        <div>
            <div className="card mb-3 my-3" id='post'>
                <img src={props.url} className="card-img-top" alt="..." id='post_img' />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text" id='date'>{date}</p>
                </div>
            {(role==2)?
            <Link to= {`/resform/${props.id}`}><button className='btn btn-success' >Response</button></Link>:
            ""
            }
            {/* {console.log(props.id)} */}
            </div>
        </div>
    )
}
