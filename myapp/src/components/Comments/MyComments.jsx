import React from 'react'
import './MyComments.css'
export default function Comments(props) {
  return (
    <div id='Mycomment_body'>
        < div id='Mycomment_det'>
            <img src='https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw' id='Mycomment_img'></img>
           {"    "}{(props.name)?(props.name):("You")}
        </div>
      <div id='Mycomment_des'>{props.text}</div>
          <div id='Mycomment_time'> Time: 12:15:32</div>
    </div>
  )
}
