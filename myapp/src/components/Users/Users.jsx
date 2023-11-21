import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import './User.css'
import axios from 'axios'
export default function Users() {
    const [UserData, setUserData] = useState([])
    const handleBlock = async (id) =>{
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
    const getData = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/userdata", {
                //   hostel:localStorage.getItem("hostel")
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
                            </tr>
                        </thead>
                        <tbody>
                            {/* {UserData.map((data) => {
                                return (
                                    <tr>
                                        <th scope="col">1</th>
                                        <th scope="col">{data.name}</th>
                                        <th scope="col">{data.email}</th>
                                        <th scope="col"><button className='btn btn-danger'>block</button></th>
                                    </tr>
                                )
                            })} */}
                            {UserData.map((data, index) => (
                                (data.role != 2)?(<tr key={index}>
                                    <th scope="row">{'>'}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.hostel}</td>
                                    <td>
                                        {!data.isBlock?
                                        <button className='btn btn-danger' onClick={() => {handleBlock(data._id)}}>
                                            Block
                                        </button>:<button className='btn btn-success' onClick={() => {handleBlock(data._id)}}>
                                            unBlock
                                        </button>}
                                    </td>
                                </tr>):""
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
