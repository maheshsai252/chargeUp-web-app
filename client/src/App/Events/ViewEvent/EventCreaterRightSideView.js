import React from 'react'
import EventDashboardView from './EventDashboardView'
import EventParticipants from './EventParticipants'
import EventImage from './EventImage'
import EventIntro from './EventIntro'
import EventOrganiserInfo from './EventOrganiserInfo'
import EventDetail from './EventDetail'
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
        } else if (cs===3) {
          return (
            <div>
            <EventImage event={event}/>
            <EventIntro event={event}/>
          <EventOrganiserInfo event={event}/>
          <EventDetail event={event}/>
            </div>
            
          )
        } else {
          return (
            <div>
            <EventImage event={event}/>
            <EventIntro event={event}/>
          <EventOrganiserInfo event={event}/>
          <EventDetail event={event}/>
            </div>
          )
        }
      })()}
    </div>
  )
}
