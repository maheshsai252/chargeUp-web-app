import React from 'react'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {ActionCreators} from '../../actions/actionCreators'
import PrivateRoute from '../../Login/PrivateRoute'
import EventCreatorView from './EventCreatorView'
import ViewEventUser from './ViewEventUser'

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
      <ViewEventUser event={event} />
     </div>
     } 
     
        
    </div>
  )
}
