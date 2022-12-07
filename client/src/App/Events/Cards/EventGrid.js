import React from 'react'
import EventGridCard from './event-grid-card'
import VerticalCard from './VerticalCard'

export default function EventGrid({events}) {
  return (
    <div className='event-grid-container'>
    {
        events.map((event)=> {
            return <EventGridCard event={event}/>
        })
    }
        
    </div>
  )
}
