import React from 'react'
import ResponseList from '../components/Response/ResponseList'
import './Response.css'
import Navbar from '../components/Navbar'
export default function Complain() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div id='resp_head'>
        Response Section
      </div>
      <div className='container'>
          <ResponseList></ResponseList>
      </div>
    </div>
  )
}
