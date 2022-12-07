import React from 'react'
import SimilarEventCard from './SimilarEventCard'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import EventGrid from '../Cards/EventGrid'

export default function SimilarEvents({event}) {
  useEffect(()=> {
    
    const getEvent = async () => {
      try {
        const response = await axios.post('/api/events-fromOrganiser',{
          userId: event.createdBy
      });
      console.log( response,"gotten")
      console.log(response,"seeve")
      if(response.status===200) {
          setEvents(response.data)
          
      } else {
          
      }
      } catch (error) {
        console.log(error,"error-msg")
      }
        
    }

    getEvent();
    
},[]);
  const [events,setEvents] = useState([]);
  return (
    <div>
          <h2>Similar Events</h2>
          <EventGrid events={events} />
         {/* <div className="row">
         {
          events.map((event) => {
            return <VerticalCard event={event} />
          })
         } */}
            
         {/* </div> */}
    </div>
  )
}
