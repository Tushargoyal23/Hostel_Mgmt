
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    hostel: '', // Updated to be an empty string initially
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const hostels = ['Tandon', 'Malviya', 'Tilak']; // Example list of hostels

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Your existing code for fetching and handling the registration
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
    } catch (error) {
      console.error('Error during registration:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container" id="main">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="exampleInputname" className="form-label">
            <b id="elements">*Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <b>*Email address</b>
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div>*We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="hostel" className="form-label">
            <b>*Hostel</b>
          </label>
          <select
            className="form-control"
            name="hostel"
            value={credentials.hostel}
            onChange={onChange}
          >
            <option value="" disabled>
              Select a hostel
            </option>
            {hostels.map((hostel) => (
              <option key={hostel} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <b>*Password</b>
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <Link to="/login" className="m-3 btn btn-danger">
          Already a user
        </Link>
      </form>
    </div>
  );
}
