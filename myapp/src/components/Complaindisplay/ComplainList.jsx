import React, { useState, useEffect } from 'react'
import Post from '../Post'
import './ComplainList.css'
import axios from "axios";
export default function ComplainList() {
  const [complains, setcomplain] = useState([])
  const getComplaints = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/complaindata",{
        hostel:localStorage.getItem("hostel")
      })
      if (res.data.success) {
        setcomplain(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);
  const role = localStorage.getItem("role");
  return (
    <div id='post_id'>
      {/*Post the requested complians*/}
      {/* <Post title='Hostel safety' url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPElmzWCeKaGAm9lOTJTYPJ9PqVQKVisTmpQ&usqp=CAU' date="2023-11-12T07:06:00.233Z"></Post> */}
      {complains.map((data) => {
        // {console.log(data)}
        return (
          !data.isResponse ? (
            <Post key={data._id} title={data.title} description={data.description} url={data.imageurl?data.imageurl:"https://source.unsplash.com/random/300x300/?food" }date={data.date} id={data._id} upvote={data.countupvote
          } downvote={data.countdownvote
          } />
          ):""
        )
      })}
    </div>
  );
};
