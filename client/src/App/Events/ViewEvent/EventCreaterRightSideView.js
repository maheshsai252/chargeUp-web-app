import React from 'react'
import EventDashboardView from './EventDashboardView'
import EventParticipants from './EventParticipants'

export default function EventCreaterRightSideView({cs,event, regs}) {
  return (
    <div className='classin2'>
       <h2>{event.name}</h2>   
         <strong>
         {event.available} Available |  {regs.length} booked
         </strong>
        <br/>
        <br/>

         {(() => {
        if (cs===1) {
          return (
            <EventParticipants event={event} regs={regs} />
          )
        } else if (cs===2) {
          return (
            <EventDashboardView event={event} regs={regs} />
          )
        } else {
          return (
            <div>catch all</div>
          )
        }
      })()}
    </div>
  )
}
