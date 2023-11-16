import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    
  let navigate = useNavigate();
    
  const[credentials , setcredentials] =useState({name:"" , email: "" , hostel: "" , password : ""});
    const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name :credentials.name , email:credentials.email , hostel:credentials.hostel , password:credentials.password})
  
      })
      const json = await response.json();
      console.log(json);
      if(!json.success){
        alert("enter valid credentials")
      }
      if(json.success){
        localStorage.setItem("token" , json.token);
        // console.log(localStorage.getItem("authToken"));
        navigate('/');
      }
    }
    const Onchange = (event) =>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
      <div className='container' id='main'>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label"><b>*Email address</b></label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={Onchange}/>
      <div>*We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label"><b>*Password</b></label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={Onchange}/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to= '/createuser' className='m-3 btn btn-danger'>I am new user</Link>
  </form>
      </div>
  
    )
}
