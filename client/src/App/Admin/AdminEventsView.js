import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminEventsGrid from './AdminEventsGrid';
export default function AdminEventsView() {
    const [events,setEvents] = useState([]);
    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await axios.post('/api/events/',{
                
                });
                if(response.status===200) {
                    setEvents(response.data);
                 } 
                 console.log(response.data,"gotten");
            } catch (error) {
                console.log(error, "error")
            }
            
           
            
        }
    
        getEvent();
    },[])
  return (
    <div>
        <h2>Events List View</h2>
        {
            events.length !== 0 ? <AdminEventsGrid events={events} /> : 
            <p>Loading</p>
        }
        
    </div>
  )
}
