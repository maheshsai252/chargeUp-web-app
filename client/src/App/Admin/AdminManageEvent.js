import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';
import EventCreatorView from '../Events/ViewEvent/EventCreatorView';
export default function AdminManageEvent() {
  
    const {nameTag} = useParams();
    const [event,setEvent] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(()=> {
        setLoading(true);
        console.log(nameTag,"gotten name tag");
        const getEvent = async () => {
            const response = await axios.post('/api/event',{
                nameTag: nameTag
            });
            console.log( response,"gotten")
            if(response.status===200) {
                setLoading(false);
                setEvent(response.data[0]);
            } else {
                setLoading(false)
            }
        }
       getEvent();
        
        
    },[nameTag]);
  return (
    <div>
    {
        event !== undefined ? <EventCreatorView event={event} /> : <p></p>
    }

    </div>
  )
}
