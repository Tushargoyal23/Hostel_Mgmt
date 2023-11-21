import React from 'react'
import Navbar from '../../components/Navbar'
import Post from '../../components/Post'
import './Complain.css'
import { Link } from 'react-router-dom'
import ComplainList from '../../components/Complaindisplay/ComplainList'
{/* // copmlain portal */ }
export default function Complain() {
    const role = localStorage.getItem("role");
    return (
        <div>
            <Navbar></Navbar>
            <div className='container' id='comp'>
                {/* heading */}
                <div id='comp_head'>Complains</div>
                <div>
                    <ComplainList></ComplainList>
                </div>
                <div className='comp_btn'>
                    {(role == 0)? 
                    <Link to='/complainform'>
                    <button className='btn btn-success'>Add New Complain</button>
                    </Link>
                        :""}
                </div>
            </div>
        </div>
    )
}
