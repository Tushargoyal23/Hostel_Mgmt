import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    
  let navigate = useNavigate();
    

  const[credentials , setcredentials] =useState({email: "" , password : ""});
    const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ email:credentials.email ,  password:credentials.password})

      })
      const json = await response.json();
      if(!json.success){
        if(json.message==="Temporarily blocked"){
          alert("You are blocked")
        }
        else
        alert("enter valid credentials")
      }
      if(json.success){
        localStorage.setItem("token" , json.token);

        console.log(json.role);
        localStorage.setItem("role",json.role);
        console.log(credentials.email);
        localStorage.setItem("email",credentials.email);
        localStorage.setItem("name",json.name);
        
        localStorage.setItem("hostel",json.hostel);
        
       
        
        
    //console.log(localStorage.getItem("role",credentials.role));
        navigate('/home');
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
