import React, { useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom';

export default function Post(props) {
    
    const role = localStorage.getItem("role");
    const date = props.date.slice(0, 10);
    const time = props.date.slice(11,19);
    const [voted, setVoted] = useState(false);

    const [upvotesCount, setupVotesCount] = useState(props.upvote);
    const [downvotesCount, setdownVotesCount] = useState(props.downvote);
    const handleUpvote = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/upvote/${props.id}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
          });
    
          const result = await res.json();
    
          if (result.success) {
            setVoted(true);
            setupVotesCount(upvotesCount + 1);
          } else {
            alert("Already Voted");
          }
        } catch (error) {
          console.error('Error upvoting post:', error);
          alert("Error upvoting post");
        }
      };
    
      const handleDownvote = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/downvote/${props.id}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email') })
          });
    
          const result = await res.json();
    
          if (result.success) {
            setVoted(true);
            setdownVotesCount(downvotesCount + 1);
          } else {
            alert("Already Voted");
          }
        } catch (error) {
          console.error('Error downvoting post:', error);
          alert("Error downvoting post");
        }
      };
   
    // console.log(da);
    return (
        <div>
            <div className="card mb-3 my-3" id='post'>
                <img src={props.url} className="card-img-top" alt="..." id='post_img' />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text" id='post_date'>time:- {time}</p>
                    <p className="card-text" id='post_date'>Date:- {date}</p>
                    <div>
                        <Link to= {`/full-comp/${props.id}`}>see more</Link>
                    </div>
                </div>
            {(role==2)?
            <Link to= {`/resform/${props.id}`}><button className='btn btn-success' >Response</button></Link>:
            ""
        }
        {(role!=2)?
         <div>
         <span className="mx-2">{upvotesCount}</span>
          <button
            className={`btn btn-${voted ? 'success' : 'light'}`}
            onClick={handleUpvote}
            disabled={voted}
          >
            Upvote
          </button>

          <span className="mx-2">{downvotesCount}</span>

          <button
            className={`btn btn-${voted ? 'light' : 'danger'}`}
            onClick={handleDownvote}
            disabled={voted}
          >
            Downvote
          </button>
        </div>:
        <div>
        <span className="mx-2">{upvotesCount}</span>
         <button
           className={`btn btn-${voted ? 'success' : 'light'}`}
           
           disabled={voted}
         >
           Upvote
         </button>

         <span className="mx-2">{downvotesCount}</span>

         <div
           className={`btn btn-${voted ? 'light' : 'danger'}`}
           disabled={voted}
         >
           Downvote
         </div>
       </div>
}
            {/* {console.log(props.id)} */}
            </div>
        </div>
    )
}
