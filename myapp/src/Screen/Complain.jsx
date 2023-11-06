import React from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import './Complain.css'
{/* // copmlain portal */}
export default function Complain() {
    return (
        <div>
            <Navbar></Navbar>
            <div className='container' id='comp'>
{/* heading */}
                <div id='comp_head'>Complains</div>
{/* complain posts */}
{/* complain posts */}
                <div id='comp_post'>
                    <Post title='Hostel safety' url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPElmzWCeKaGAm9lOTJTYPJ9PqVQKVisTmpQ&usqp=CAU'></Post>
                    <Post title='Mess food Quality' url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv9uSq5LsREIGwRwU5kLeXBpA1CRQ8AB_ShQ&usqp=CAU'></Post>
                    <Post title='Commitee behaviour' url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAIIMby7G7ZgCe0rf2heKkp4XKjfV0ottkXgN6yw5n849BJVfKVNuaGQhEB9dRlkL8eSo&usqp=CAU'></Post>
                    <Post title='bathroom problem' url='https://i.pinimg.com/736x/d3/63/13/d36313be1a86e219d8ef63a0a3539f8d.jpg'></Post>
                    <Post title='water cooler'url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxXTQdyy54oYGOGUlxCGDyy2FQY3jyLuacSPlEfeAeeYVLOW3cylgl3YOa4kNA5qNFTg&usqp=CAU'></Post>
                </div>
            </div>
        </div>
    )
}
