import React from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Signup() {
  let navigate = useNavigate();
  const[credentials , setcredentials] =useState({name:"" , email: "" , hostel: "" , password : ""});
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser',{
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
      // localStorage.setItem("authToken" , json.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate('/login');
    }
  }
  const Onchange = (event) =>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <div className='container' id='main'>
      <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="exampleInputname" className="form-label"><b>*Name</b></label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={Onchange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label"><b>*Email address</b></label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={Onchange}/>
    <div>*We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="location" className="form-label"><b>*Hostel</b></label>
    <input type="text" className="form-control" name='hostel' value={credentials.hostel} onChange={Onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"><b>*Password</b></label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={Onchange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to= '/login' className='m-3 btn btn-danger'>Already a user</Link>
</form>
    </div>
  )
}
