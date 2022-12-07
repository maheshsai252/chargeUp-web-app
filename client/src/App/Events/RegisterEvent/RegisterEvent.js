import React from 'react'

import NavBar from '../../Nav/NavBar'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import RegistartionHeader from './RegistartionHeader';
import Footer from '../../Nav/Footer';

export default function RegisterEvent() {
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

        <NavBar />
        <RegistartionHeader event={event} />
        <Footer />
    </div>
  )
}
