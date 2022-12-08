import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios';

export default function EventCreaterSider({setcs, event}) {
  const navigate = useNavigate();
  const deleteEvent = async () => {
    const response = await axios.post('/api/event/delete',{
        eventid:  event._id
    });
    console.log(response);
    navigate('/')
}
  return (
    <div className='stepcontainer classin1'>
        <button style={{margin: "10px"}} onClick={()=>setcs(1)}> Participant List</button>
        <br />
        <br />
        <button style={{margin: "10px"}} onClick={()=>setcs(2)}> Registrations</button>
        <br />
        <br />
        <button style={{margin: "10px"}} onClick={()=>setcs(3)}> Event Detail </button>
        <br />
        <button style={{margin: "10px"}} onClick={()=> navigate('/update/'+event.nameTag)}> Update Event </button>
        <br />
        <button style={{margin: "10px"}} onClick={()=> deleteEvent()}> Delete Event </button>
    </div>
  )
}
