import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import '../Complainform/Complainform.css'
import { Link, useNavigate ,useParams} from 'react-router-dom'

// import { useState } from 'react'
export default function Complainform() {
    let navigate = useNavigate();
    const  {id}  = useParams();
   const [title,settitle]=useState("");
   const [description,setdescription]=useState("");
    

    console.log(id);
    const [response, setresponse] = useState({response:"" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/api/response`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({response:response.response,id:id})
        })
        const json = await res.json();
        
        
        if (!json.Success) {
            alert(console.error())
        }
        if (json.Success) {
            alert("response submitted")
            navigate('/complain');
        }
    }
    const getComplain = async () => {
       
        const res = await fetch(`http://localhost:5000/api/complain/${id}`, {
            method: 'GET',
            
          
        })
        const json = await res.json();
        
       settitle(json.data.title)
       setdescription(json.data.description)
      
        if (!json.success) {
            alert("error")
        }
        
    }
    useEffect(() => {
        getComplain();
      }, []);
  

    const Onchange = (event) => {
        setresponse({ ...response, [event.target.name]: event.target.value })
    }
    return (
        <div>
            
            <div>
                <Navbar></Navbar>
            </div>
            <div className='container' id="form_details">
                <div>
                    <h1 id='complain_head'>Complain Panel</h1>
                </div>
                <form onSubmit={handleSubmit}>
                <div><h1>{title}</h1></div>
                <div><h3>{description}</h3></div>
                <div id='content' >
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Example textarea :-{" "}</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={response.response} name='response'onChange={Onchange}></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>  
                <Link to='/home' className='m-3 btn btn-danger'>Back to home</Link>
                </form>
            </div>
        </div>
    )
}
