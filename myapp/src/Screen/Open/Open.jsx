import React from 'react'
import './Open.css'
import { Link } from 'react-router-dom'
export default function Open() {
  return (
    <>
      <div>
        <div className='container'>
          <div id="open_head">
            Hostel Management Portel
          </div>
          <Link to='/login' id='expo'>
              Explore
            {/* </div> */}
          </Link>
        </div>
      </div>
    </>
  )
}
