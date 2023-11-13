import React from 'react'
import Navbar from '../components/Navbar'
import './Mess.css'
import { Link } from 'react-router-dom'
export default function Mess() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className='container' id='head'>
        <h1><u>Mess Menu</u></h1>
      </div>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Day</th>
              <th scope="col">Morning Snacks(8 to 9 AM)</th>
              <th scope="col">Lunch(12:30 to 2 PM)</th>
              <th scope="col">Evening Snacks(5:30 to 6:30 PM)</th>
              <th scope="col">Dinner (8 to 9 PM)</th>
              <th scope="col">Edit details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Monday</td>
              <td>Samosa</td>
              <td>Dal Roti</td>
              <td>Maggi</td>
              <td>Rajma Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Tuesday</td>
              <td>ban makkhan</td>
              <td>Urad Dal Roti</td>
              <td>pasta</td>
              <td>Aloo gobi Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Wednesday</td>
              <td>Samosa</td>
              <td>Dal Roti</td>
              <td>Maggi</td>
              <td>Rajma Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Thusday</td>
              <td>Samosa</td>
              <td>Dal Roti</td>
              <td>Maggi</td>
              <td>Rajma Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Friday</td>
              <td>Samosa</td>
              <td>Dal Roti</td>
              <td>Maggi</td>
              <td>Rajma Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Saturday</td>
              <td>Samosa</td>
              <td>Dal Roti</td>
              <td>Maggi</td>
              <td>Rajma Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Sunday</td>
              <td>Samosa</td>
              <td>Dal Roti</td>
              <td>Maggi</td>
              <td>Rajma Roti ,gulab jamun</td>
              <td><button className='btn btn-danger'>edit</button></td>

            </tr>
          </tbody>
        </table>
      </div>
      <div id='mess_members'>
        <div id='mess_head'>
          <center>
            <u>MESS DETAILS</u>
          </center>
        </div>
        <div className='row'>

          <div className='col'>
            <h2 id='mess_det_head'>Mess Members</h2>
            <table className='table' id='table1'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Post</th>
                  <th scope="col">Date of joining </th>
                  <th scope="col">Edit Details </th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Anuj Panday</td>
                  <td>Worker head</td>
                  <td>12 March 2003</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ramu Pandit</td>
                  <td>Worker</td>
                  <td>13 april 1996</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Teja rawat</td>
                  <td>Grocery Manager</td>
                  <td>12 Jan 1992</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Heeralal</td>
                  <td>chef</td>
                  <td>19 Dec 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Chandan Kumar</td>
                  <td>chef</td>
                  <td>4 Nov 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Rahim singh Joshi </td>
                  <td>Worker</td>
                  <td>9 feb 1985</td>
              <td><button className='btn btn-danger'>edit</button></td>

                </tr>
              </tbody>
            </table>
            <center><button className='btn btn-success'>Add Member</button></center>
          </div>
          <div className='col'>
            <h2 id='mess_det_head'>Mess Commitee</h2>
            <table className='table' id='table1'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Post</th>
                  <th scope="col">Date of joining </th>
                  <th scope="col">Edit details</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Anuj Panday</td>
                  <td>Worker head</td>
                  <td>12 March 2003</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Ramu Pandit</td>
                  <td>Worker</td>
                  <td>13 april 1996</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Teja rawat</td>
                  <td>Grocery Manager</td>
                  <td>12 Jan 1992</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Heeralal</td>
                  <td>chef</td>
                  <td>19 Dec 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Chandan Kumar</td>
                  <td>chef</td>
                  <td>4 Nov 1995</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Rahim singh Joshi </td>
                  <td>Worker</td>
                  <td>9 feb 1985</td>
              <td><button className='btn btn-danger'>edit</button></td>
                </tr>
              </tbody>
            </table>
            <div>
            <center><button className='btn btn-success'>Add Member</button></center>
            </div>
          </div>
        </div>
      </div>
      <div className='container' id='info'>
        <h2>
          For any complain regarding menu and mess you can add it here.
        </h2>
        <Link to='/complainform'>
        <button className='btn btn-warning'>Add Complain</button>
        </Link>
      </div>
    </div>
  )
}
