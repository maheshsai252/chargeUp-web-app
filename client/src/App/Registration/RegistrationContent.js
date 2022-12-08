import React, { Component } from 'react'
import { format } from 'date-fns'

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
                        <li class="item__price" style={{color: "green"}}>
                        {event.price===0 ? <p >"Free"</p> : <p>${event.price}</p> }
                    </li>
                    <br />
                            <li style = {{fontSize : "large"}}> <img src={pin} alt="pin" style={{height: "24px", width: "24px"}} /> <span style={{paddingLeft: '10px'}}>{event.place.split(',')[0]}</span></li>
                            <br />
                            <li style = {{fontSize : "large", }} ><img src={calendar} style={{height: "24px", width: "24px" }} alt="" /><span style={{paddingLeft: '15px'}}>{format(new Date(event.startDate), 'yyyy/MM/dd kk:mm')}</span></li><br />
                            <br />
                            <li>{event.summary}</li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
      </div>
    )
  
}
