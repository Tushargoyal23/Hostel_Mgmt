import React, { useEffect, useState } from 'react'
import './Fullcomp.css'
import Navbar from '../../components/Navbar'
import Comments from '../../components/Comments/Comments'
import MyComments from '../../components/Comments/MyComments'
import { Link, useParams } from 'react-router-dom'
export default function Fullcomp() {
  const { id } = useParams();
  const [complain, setcomplain] = useState("");
  const [description, setdescription] = useState("");
  const [response, setresponse] = useState("");
  const [x, setx] = useState(0);
  const [voted, setVoted] = useState(false);
  const [votesCount, setVotesCount] = useState(complain.votes.length);


  const handleUpvote = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/upvote/${id}`, {
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
        setVotesCount(votesCount + 1);
      } else {
        alert("Error upvoting complaint");
      }
    } catch (error) {
      console.error('Error upvoting complaint:', error);
      alert("Error upvoting complaint");
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/downvote/${id}`, {
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
        setVotesCount(votesCount - 1);
      } else {
        alert("Error downvoting complaint");
      }
    } catch (error) {
      console.error('Error downvoting complaint:', error);
      alert("Error downvoting complaint");
    }
  };





  let json;
  const handlechange = async () => {
    setx(1 - x);
  }

  const handleSubmit = async () => {
    console.log(localStorage.getItem('name'));
    try {
      const res = await fetch(`http://localhost:5000/api/add-comments/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: response, email: localStorage.getItem('email'), date: Date.now(), name: localStorage.getItem('name') })
      });

      const result = await res.json();

      if (result.success) {
        // Update state with the new comment
        setcomplain(prevComplain => {
          const updatedComments = [...prevComplain.comments, { text: response, email: localStorage.getItem('email'), date: Date.now() }];
          return { ...prevComplain, comments: updatedComments };
        });

        // Reset the response state
        setresponse("");
        handlechange();
      } else {
        alert("Error adding comment");
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert("Error adding comment");
    }
  };

  // console.log(id);
  const getComplain = async () => {

    const res = await fetch(`http://localhost:5000/api/complain/${id}`, {
      method: 'GET',


    })
    json = await res.json();


    setcomplain(json.data)
    setdescription(json.data.description)
    if (!json.success) {
      alert("error")
    }


  }
  useEffect(() => {
    getComplain();
  }, []);
  // console.log(complain);
  const comments = complain.comments
  // console.log(comments);
  const useremail = localStorage.getItem('email');
  const Onchange = (event) => {
    setresponse(event.target.value);
  }
  return (
    <div id='full_comp'>
      <div>
        <Navbar></Navbar>
      </div>
      {complain ? (
        <>
          <div id='comp_cont'>
            <img id='comp_img' src={complain.imageurl} alt="Complain Image" />
          </div>
          <div id='comp_details'>
            <div id='comp_title'>
              <u>{complain.title}</u>
            </div>
            <div id='comp_des'>
              {complain.description}
            </div>
          </div>
          <div id='com_head'>
            Comments
          </div>
          {/* {console.log(useremail)} */}
          <div id='comp_body'>
            {complain.comments.map((comment, index) => (
              (comment.email === useremail) ? <MyComments text={comment.text} email={comment.email} name={comment.name}></MyComments> :
                <Comments text={comment.text} email={comment.email} name={comment.name}></Comments>
            ))}
           
          </div>

          <div>{(x) ? <>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div id='content' >
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Add comment :-{" "}</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={response} name='response' onChange={Onchange}></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="submit" className="btn btn-danger" onClick={handlechange}>Cancel</button>
            </form>
          </>
            : <button className='btn btn-success' onClick={handlechange}> Add Comment</button>}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
