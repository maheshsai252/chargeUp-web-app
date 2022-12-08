import React from 'react'
import EventGridCard from './event-grid-card'
import VerticalCard from './VerticalCard'

export default function EventGrid({events}) {
  return (
    <div>

{
      events.length === 0 ?
      <p> No Events</p>
      :
    <div className='event-grid-container'>
    {
        events.map((event)=> {
            return event !== undefined ? <EventGridCard event={event}/> : <p></p>
        })
    }
        
    </div>
    }
    </div>
    
    
    
  )
}
