import React from 'react'
import Footer from '../../Nav/Footer'
import NavBar from '../../Nav/NavBar'
import EventDetail from './EventDetail'
import EventImage from './EventImage'
import EventIntro from './EventIntro'
import EventOrganiserInfo from './EventOrganiserInfo'
import EventStatus from './EventStatus'
import SimilarEvents from './SimilarEvents'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {ActionCreators} from '../../actions/actionCreators'
import PrivateRoute from '../../Login/PrivateRoute'
import Map from '../../Maps/Map'
import EventCreatorView from './EventCreatorView'

export default function ViewEvent({event}) {
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ActionCreators.changeActiveTab(""))
    })
  return (
    <div>
    {
      event.createdBy === sessionStorage.getItem('userid') ? 
      <EventCreatorView event={event} /> :  
      
      <div style={{margin: '1%'}} className="event-detail">
     <NavBar />
        <EventStatus event={event} />
        <EventImage event={event}/>
        <EventIntro event={event}/>
        <EventOrganiserInfo event={event}/>
        <EventDetail event={event}/>
        <Map events={[event]} zoomLevel={17} />
        <SimilarEvents event={event}/>
        <Footer/>
     </div>
     } 
     
        
    </div>
  )
}
