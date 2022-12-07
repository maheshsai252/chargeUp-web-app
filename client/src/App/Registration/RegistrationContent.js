import React, { Component } from 'react'
import '../css/register.scss'
import imgw from '../resources/event_img.jpg'
import pin from '../resources/pin.png'
import calendar from '../resources/calendar.jpg'
export default function RegistrationContent({event})  {
 
    return (
      <div>
        <div class="register-details shadow">
            <div class="register-details__item">

                <div class="item__image">
                    <img class="event_img" src={imgw} alt="rd" />
                </div>
                <div class="item__register-details">
                    <div class="item__title">
                        {event.title}
                    </div>
                    
                    <br/>
                    <div class="item__description">
                        <ul style={{listStyle: "none"}}>
                        <li class="item__price">
                        $ {event.price}
                    </li>
                            <li style = {{fontSize : "larger"}}> <img src={pin} alt="pin" style={{height: "24px", width: "24px"}} /> Fenway Park, Boston, MA</li>
                            <li style = {{fontSize : "larger"}} ><img src={calendar} style={{height: "24px", width: "24px"}} alt="" /> 22nd December, 2022</li><br />
                            <li>{event.summary}</li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
      </div>
    )
  
}
