import React, { useState } from 'react'
import userImg from '../../resources/user.jpg'
import calendar from '../../resources/calendar.jpg'
import '../../css/style.scss'
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { format } from 'date-fns'
import { useEffect } from 'react';
import axios from 'axios';


export default function EventOrganiserInfo({event}) {
    const style = {
        display: 'inline-block',
        margin : '15px',
        color: "white"
    }
    useEffect(()=> {
        
        const getEvent = async () => {
            const response = await axios.post('/api/user',{
                userid: event.createdBy
            });
            console.log( response,"gotten user")
            if(response.status===200) {
               setUser(response.data[0].name);
            //    console.log("user gotten", user)
            } 
        }
    
        getEvent();
        console.log("testing", new Date(event.startDate),event.startDate);
        console.log("testing", format(new Date(), 'yyyy/MM/dd kk:mm:ss'))
    },[event.createdBy]);
const [user,setUser] = useState("");
  return (
    <div>
        <div className="spacev">
            
            <div className="col">
                <img src={userImg} className="icon" alt="" />
                <h6 style={style}>{user}</h6>
            </div>
            {/* <div className="divider"/> */}
            <div className="col">
                <img src={calendar} className="icon" alt="" />
                <h6 style={style}>{event.startDate !== undefined ? format(new Date(event.startDate), 'yyyy/MM/dd kk:mm') : ""}</h6>
            </div>
            {/* <div className="divider"/> */}
            <div>
            <div className="styleLocationLabel"><i class="fas fa-map-pin"></i> {event.place?.split(',')[0]}</div>

                {/* <h6 style={style}>{event.place !== undefined ? event.place.split(',')[0] : ""}</h6> */}
            </div>
          </div>
    </div>
  )
}
