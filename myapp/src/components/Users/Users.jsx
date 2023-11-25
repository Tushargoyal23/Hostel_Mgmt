import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import './User.css'
import axios from 'axios'
// const User = require('../../../backend/models/User') 
export default function Users() {
    const [UserData, setUserData] = useState([])
    const [post, setpost] = useState("");
    const [add, setadd] = useState("");
    const Onchange = (event) => {
        setpost(event.target.value);
    }
    const handleBlock = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/blockuser/${id}`, {
                //   hostel:localStorage.getItem("hostel")
            })
            if (res.data.success) {
                alert("successfully saved");
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (id) => {
        setadd(() => id);
      };
      

    const handleAdd = async (name,email,hostel) => {
        // console.log(UserData);
        console.log(name)
        try {
            
            const res = await axios.post(`http://localhost:5000/api/add-commitee-member`, {
                //   hostel:localStorage.getItem("hostel")\
                name: name,
                post: post,
                email: email,
                hostel: hostel
            })
            console.log(res);
            if (res.data.success) {
                alert("successfully added");
                // setadd(null)
                window.location.reload()
            }
            else {
                console.log("error")
            }
            setadd("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = async (id) => {
        // console.log(id);
        try {
            const res = await axios.delete(`http://localhost:5000/api/delete-commitee-member/${id}`)
            //   hostel:localStorage.getItem("hostel") 
            if (res.data.success) {
                alert("successfully removed");
                window.location.reload()
            }
            else {
                console.log("error")
            }
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/userdata", {
                hostel: localStorage.getItem("hostel")
            })
            if (res.data.success) {
                setUserData(res.data.data);
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            {/* {console.log(UserData)} */}
            <div>
                <Navbar></Navbar>
            </div>
            <div className='container'>
                <div id='user_head'>
                    User Details
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Hostel</th>
                                <th scope="col">block</th>
                                <th scope="col">Commitee Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserData.map((data, index) => (
                                (data.role != 2) ? (<tr key={index}>
                                    <th scope="row">{'>'}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.hostel}</td>
                                    <td>
                                        {!data.isBlock ?
                                            <button className='btn btn-danger' onClick={() => { handleBlock(data._id) }}>
                                                Block
                                            </button> : <button className='btn btn-success' onClick={() => { handleBlock(data._id) }}>
                                                unBlock
                                            </button>}
                                    </td>
                                    <td>
                                        {

                                            (data.role == 1) ?
                                                <button className='btn btn-danger' onClick={() => { handleRemove(data._id) }}>
                                                    Remove
                                                </button> : (add!==data._id) ? <button className='btn btn-success' onClick={() => handleClick(data._id)}>

                                                    Add
                                                </button> : <>
                                                    <form onSubmit={(e) => { e.preventDefault(); handleAdd(data.name,data.email,data.hostel) }}>
                                                        <div id='content' >
                                                            <div className="mb-3">
                                                                <label for="exampleFormControlTextarea1" className="form-label"> Post:-{" "}</label>
                                                                <input className="form-control" id="exampleFormControlTextarea1" rows="2" value={post} name='response' onChange={Onchange}></input>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </form>
                                                </>}
                                    </td>
                                </tr>) : ""
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
