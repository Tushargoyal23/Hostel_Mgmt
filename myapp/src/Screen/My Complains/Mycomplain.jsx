import React from 'react'
import Navbar from '../../components/Navbar'
import Post from '../../components/Post'
import './Mycomplain.css'
import { Link } from 'react-router-dom'
import MycomplainList from '../../components/Complaindisplay/MycomplainList'
{/* // copmlain portal */ }
export default function Complain() {
    const role = localStorage.getItem("role");
    // const eamil = localStorage.getItem("email");
    return (
        <div>
            <Navbar></Navbar>
            <div className='container' id='comp'>
                {/* heading */}
                <div id='comp_head'> My Complains</div>
                <div>
                    <MycomplainList></MycomplainList>
                </div>
                <div className='comp_btn'>
                    {(role == 0) ? 
                    <Link to='/complainform'>
                    <button className='btn btn-success'>Add New Complain</button>
                    </Link>
                        :""}
                </div>
            </div>
        </div>
    )
}
