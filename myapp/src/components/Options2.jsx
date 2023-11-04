import React from 'react'
import './Options.css'
export default function Options(props) {
    return (
        <div>
            <div id='options'>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <p className="card-text"><h6>{props.discription}</h6></p>
                                {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={props.url} className="img-fluid rounded-start" alt="..." id='imgopt'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
