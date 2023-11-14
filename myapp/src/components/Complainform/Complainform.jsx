import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Complainform.css'
import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
export default function Complainform() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", title: "", description: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/addcomplain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, title: credentials.title, description: credentials.description})
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            alert("enter valid credentials")
        }
        if (!json.success) {
            alert("complain submitted")
            navigate('/complain');
        }
    }
    const Onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
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

                <div id='content' >
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Name :-{" "}</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name" name='name' value={credentials.name} onChange={Onchange}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Email address :-{" "}</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name='email' value={credentials.email} onChange={Onchange}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Title :-{" "}</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title" value={credentials.title} name='title'onChange={Onchange}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Example textarea :-{" "}</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={credentials.description} name='description'onChange={Onchange}></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>  
                <Link to='/' className='m-3 btn btn-danger'>Back to home</Link>
                </form>
            </div>
        </div>
    )
}
