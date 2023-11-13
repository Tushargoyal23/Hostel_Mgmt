import React from 'react'
import Navbar from '../components/Navbar'
import './Mess.css'
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
              </tr>
              <tr>
               <th scope="row">2</th>
                <td>Tuesday</td>
                <td>ban makkhan</td>
                <td>Urad Dal Roti</td>
                <td>pasta</td>
                <td>Aloo gobi Roti ,gulab jamun</td>
              </tr>
              <tr>
               <th scope="row">3</th>
                <td>Wednesday</td>
                <td>Samosa</td>
                <td>Dal Roti</td>
                <td>Maggi</td>
                <td>Rajma Roti ,gulab jamun</td>
              </tr>
              <tr>
               <th scope="row">4</th>
                <td>Thusday</td>
                <td>Samosa</td>
                <td>Dal Roti</td>
                <td>Maggi</td>
                <td>Rajma Roti ,gulab jamun</td>
              </tr>
              <tr>
               <th scope="row">5</th>
                <td>Friday</td>
                <td>Samosa</td>
                <td>Dal Roti</td>
                <td>Maggi</td>
                <td>Rajma Roti ,gulab jamun</td>
              </tr>
              <tr>
               <th scope="row">6</th>
                <td>Saturday</td>
                <td>Samosa</td>
                <td>Dal Roti</td>
                <td>Maggi</td>
                <td>Rajma Roti ,gulab jamun</td>
              </tr>
              <tr>
               <th scope="row">7</th>
                <td>Sunday</td>
                <td>Samosa</td>
                <td>Dal Roti</td>
                <td>Maggi</td>
                <td>Rajma Roti ,gulab jamun</td>
              </tr>
            </tbody>
          </table>
          <div>
            
          </div>
        </div>
    </div>
  )
}
