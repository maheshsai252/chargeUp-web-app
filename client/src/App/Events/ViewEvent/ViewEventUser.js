import React from 'react'
import Footer from '../../Nav/Footer'
import NavBar from '../../Nav/NavBar'
import EventDetail from './EventDetail'
import EventImage from './EventImage'
import EventIntro from './EventIntro'
import EventOrganiserInfo from './EventOrganiserInfo'
import EventStatus from './EventStatus'
import SimilarEvents from './SimilarEvents'
import Map from '../../Maps/Map'

export default function ViewEventUser({event}) {
  return (
    <div>
    <NavBar />
        <EventStatus event={event} />
        <EventImage event={event}/>
        <EventIntro event={event}/>
        <EventOrganiserInfo event={event}/>
        <EventDetail event={event}/>
         { event.place !== "online" ? <Map events={[event]} zoomLevel={17} /> : <p></p> }
        <SimilarEvents event={event}/>
        <Footer/>
    </div>
  )
}
