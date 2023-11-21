import React, { useState, useEffect } from 'react'
import Post from '../Post'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function ComplainList() {
    const navigate = useNavigate();
  const [complains, setcomplain] = useState([])
  const handleDelete = async (id) =>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/delete/${id}`,{
        })
        // navigate('/home');
        window.location.reload();    
        alert("complain deleted success");
      } catch (error) {
        console.log(error);
      }
  }
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
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  return (
    <div>
      <Post title='Hostel safety' url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPElmzWCeKaGAm9lOTJTYPJ9PqVQKVisTmpQ&usqp=CAU' date="2023-11-12T07:06:00.233Z"></Post>
      {complains.map((data) => {
        return (
          (!data.isResponse && email == data.email) ? (
            <>
            <Post key={data._id} title={data.title} description={data.description} url={data.imageurl?data.imageurl:"https://source.unsplash.com/random/300x300/?food" }date={data.date} id={data._id}/>
            <button className=' btn btn-danger' onClick={()=>{handleDelete(data._id)}}>Delete</button>
            </>
          ):""
        )
      })}
    </div>
  );
};
