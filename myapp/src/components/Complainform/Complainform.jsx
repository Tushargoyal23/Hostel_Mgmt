import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Complainform.css'
import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
export default function Complainform() {
    let navigate = useNavigate();
   
    const [credentials, setcredentials] = useState({ name: "", email: "", title: "", description: "" , img:"" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const form = document.getElementById('myForm');

  // Create a FormData object and append form fields
  const formData = new FormData(form);

  // Optionally, you can append additional key-value pairs to the FormData object
  formData.append('hostel', localStorage.getItem('hostel'));

  // Get the file input element
  const fileInput = document.getElementById('fileInput');

//   Check if a file is selected
  if (fileInput.files.length > 0) {
    // Append the file to the FormData object
    formData.append('image', fileInput.files[0]);
  }
  

  // Add other fields to FormData
//   formData.append('name', credentials.name);
//   formData.append('email', credentials.email);
//   formData.append('title', credentials.title);
//   formData.append('description', credentials.description);

  // Make a POST request using the fetch API
  fetch('http://localhost:5000/api/addcomplain', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
        alert("complain submitted")
            navigate('/complain');  
      console.log('Response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });



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
                <form onSubmit={handleSubmit} id="myForm">

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
                    <div className="mb-3">
                        <label for="fileInput" className="form-label">Image :-{" "}</label>
                        <input type="file" className="form-control" id="fileInput" placeholder="upload image" value={credentials.img} name='img'onChange={Onchange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>  
                <Link to='/home' className='m-3 btn btn-danger'>Back to home</Link>
                </form>
            </div>
        </div>
    )
}
