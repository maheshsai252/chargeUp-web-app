import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import MyEventsGrid from './MyEventsGrid';
import NavBar from '../../Nav/NavBar';
import Footer from '../../Nav/Footer';
import empty from '../../resources/empty.jpeg';

export default function MyEvents() {
    const [events,setEvents] = useState([]);

    useEffect(()=> {
        const getEvent = async () => {
            const response = await axios.post('/api/registartionsByUser/',{
                userId: sessionStorage.getItem("userid")
            });
            console.log( response.data,"gotten")
            if(response.status===200) {
               setEvents(response.data);
            } else {
                
            }
        }
    
        getEvent();
        
    },[events]);
  return (
    <div>
      <NavBar />
      <h2> My Registrations</h2>
      <br />
      <br />

      {
        events.length !==0 ? <MyEventsGrid events={events} setEvents={setEvents}/>
        :
        <img src={empty} style={{ borderRadius: '30%', border: '2px solid yellow',width: '300px', height: "300px"}} alt="empty"/>

      }
      <br />
      <br/>
      <br />
      <br />
      <br />

       <Footer />
    </div>
  )
}
