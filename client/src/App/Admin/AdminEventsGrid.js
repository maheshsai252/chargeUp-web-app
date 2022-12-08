import React, { useState } from 'react'
import AdminEventCard from './AdminEventCard'

export default function AdminEventsGrid({events,setEvents}) {
    const [upcoming, setUpcoming] = useState(false);
    const filter = () => {
        if(upcoming) {
           const f=events.filter((e) => {return e.startDate > new Date()})
           setEvents(f);
        }
        setUpcoming(!upcoming)
    }
  return (
    <div>
    <div><button onClick={filter} style={{backgroundColor: upcoming ? "yellow": "transparent" }}>{ upcoming ? "Show All" : "Show Upcoming"}</button></div>
    <div className='event-grid-container'>
    {
        events.map((event)=> {
            return <AdminEventCard event={event} setEvents={setEvents}/>
        })
    }
        
    </div>
    </div>
   
  )
}
