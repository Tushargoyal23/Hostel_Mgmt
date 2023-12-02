import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Additem.css'
import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
export default function Additem() {
    let navigate = useNavigate();
    const types = ['Vegetable', 'Oil and Gas', 'Dairy' , 'others'];
    const [credentials, setcredentials] = useState({ name: "", price: "",category: "" });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        // Your existing code for fetching and handling the registration
        const response = await fetch('http://localhost:5000/api/add-items',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name :credentials.name , price:credentials.price , category:credentials.category , hostel:localStorage.getItem('hostel')})
  
      })
      const json = await response.json();
      console.log(json);
      if(!json.success){
        alert("enter valid credentials")
      }
      if(json.success){
        // localStorage.setItem("authToken" , json.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate('/hostel');
      }
      } catch (error) {
        console.error('Error during registration:', error.message);
      } finally {
        setLoading(false);
      }
    };
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
                    <h1 id='complain_head'>Add Daily Items</h1>
                </div>
                <form onSubmit={handleSubmit} id="myForm">

                <div id='content' >
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Name :-{" "}</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name" name='name' value={credentials.name} onChange={Onchange}/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Price :-{" "}</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="" name='price' value={credentials.price} onChange={Onchange}/>
                    </div>
                    <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <b>*Category</b>
          </label>
          <select
            className="form-control"
            name="category"
            value={credentials.category}
            onChange={Onchange}
          >
            <option value="" disabled>
              Select a Category
            </option>
            {types.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>  
                <Link to='/hostel' className='m-3 btn btn-danger'>Back</Link>
                </form>
            </div>
        </div>
    )
}
