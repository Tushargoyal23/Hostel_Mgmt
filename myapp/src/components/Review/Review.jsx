import React, { useState } from 'react'
import Navbar from '../Navbar'
import './Review.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useState } from 'react'
export default function Review() {
    let navigate = useNavigate();
    const meals = ["Breakfast","Lunch","Evening","Dinner"];
    const types = [0,1,2,3,4,5];
    const [mealtime,setmealtime]=useState("")
    const [credentials, setcredentials] = useState({mealtime: "" , review:0});
    const [loading, setLoading] = useState(false);
    const day = useParams().day;
    console.log(day)
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // Your existing code for fetching and handling the registration
        const response = await fetch(`http://localhost:5000/api/addRating/${day}/${credentials.mealtime}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({hostel:localStorage.getItem('hostel') , rating: credentials.review , email:localStorage.getItem('email')})
  
      })
      const json = await response.json();
      console.log(json);
      if(!json.success){
        alert("enter valid credentials")
      }
      if(json.success){
        // localStorage.setItem("authToken" , json.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate('/mess');
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
                    <h1 id='complain_head'>Review Panel</h1>
                </div>
                <form onSubmit={handleSubmit} id="myForm">

                <div id='content' >
                    <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <b>*Meals</b>
          </label>
          <select
            className="form-control"
            name="mealtime"
            value={credentials.mealtime}
            onChange={Onchange}
          >
            <option value="" disabled>
              Select a Category
            </option>
            {meals.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            <b>*Star</b>
          </label>
          <select
            className="form-control"
            name="review"
            value={credentials.review}
            onChange={Onchange}
          >
            <option value="" disabled>
              select
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
                <Link to='/mess' className='m-3 btn btn-danger'>Back</Link>
                </form>
            </div>
        </div>
    )
}
