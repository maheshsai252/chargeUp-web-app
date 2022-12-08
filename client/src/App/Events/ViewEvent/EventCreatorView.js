import React from 'react'
import Footer from '../../Nav/Footer'
import NavBar from '../../Nav/NavBar'
import EventParticipants from './EventParticipants'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import EventDashboardView from './EventDashboardView'
import EventCreaterSider from './EventCreaterSider'
import EventCreaterRightSideView from './EventCreaterRightSideView'

export default function EventCreatorView({event}) {
  const [regs,setRegs] = useState([]);

  useEffect(()=> {
    const getEvent = async () => {
        const response = await axios.post('/api/registartionsByEvent/',{
            eventId: event._id
        });
        console.log( response.data,"gotten")
        if(response.status===200) {
           setRegs(response.data);
        } else {
            
        }
    }

    getEvent();
    
},[]); 
  const [cs, setcs] = useState('1')
  return (
    <div>
        <NavBar />
          <div className='adjuster classout'>
            <EventCreaterSider setcs={setcs} event={event} />
            <EventCreaterRightSideView cs={cs} regs={regs} event={event} />
          </div>
         

         
        <Footer />
    
    </div>
  )
}
