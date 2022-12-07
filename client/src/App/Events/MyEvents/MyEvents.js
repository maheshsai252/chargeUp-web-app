import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import MyEventsGrid from './MyEventsGrid';
import NavBar from '../../Nav/NavBar';
import Footer from '../../Nav/Footer';
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
       <MyEventsGrid events={events} setEvents={setEvents}/>
       <Footer />
    </div>
  )
}
