import React from 'react'
import MyEventCard from './MyEventCard'

export default function MyEventsGrid({events}) {
  return (
    <div className='event-grid-container'>
    {
        events.map((event)=> {
            return <MyEventCard event={event}/>
        })
    }
        
    </div>
  )
}
