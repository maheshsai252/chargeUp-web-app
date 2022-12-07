import React from 'react'
import VerticalCard from './VerticalCard'

export default function EventList({events}) {
  return (
    <div>
    {
        events.map((event)=> {
            return <VerticalCard event={event}/>
        })
    }
        
    </div>
  )
}
