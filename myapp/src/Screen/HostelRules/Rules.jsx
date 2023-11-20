import React from 'react'
import Navbar from '../../components/Navbar'
import './Rules.css'
export default function Rules() {
  return (
    <div>
        <div>
            <Navbar></Navbar>
        </div>
        <div className='container' id='rules_body'>
            <div id='rules_head'>Hostel Rules</div>
            <div id='rules_content'>
                <ul id='items'>
                    <li>Respect designated quiet hours to ensure a peaceful environment for everyone, especially during study times and at night.</li>
                    <li>Keep your living space clean and tidy.</li>
                    <li>Follow the hostel's policies regarding guests and visitation.Sign in any guests and ensure they adhere to hostel rules.</li>
                    <li>Maintain open and respectful communication with roommates and neighbors.Discuss and establish ground rules for shared responsibilities.</li>
                    <li>Adhere to hostel policies regarding the use of alcohol and other substances.Consume responsibly and be aware of legal drinking age regulations.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
