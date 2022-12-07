import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import NavBar from '../../../Nav/NavBar';
import Footer from '../../../Nav/Footer';
import avatar from '../../../resources/avatar-2.jpg';
import mail from '../../../resources/mail.png';

export default function PairingEntry() {
    const {nameTag} = useParams();
    const [event,setEvent] = useState('');
    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState("");
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
    const [regs,setregs]=useState([]);
    const pairing = async () => {
        try {
            const response = await axios.post('/api/pair-users',{
                userid: sessionStorage.getItem('userid'),
                eventid: event._id
            });
            console.log(response,"pop");
            setregs(response.data)
        } catch (error) {
            setMessage(error.response.data.message);
        }
       
    }
  return (
    <div>
        <NavBar />
            <h1> Pairing suggestions for you {event.title}</h1>
            <button onClick={pairing}>
                Get Pairing Suggestions
            </button>
            {message}
            <br />
            <br />
            <br />

            <ul style={{listStyle: 'none'}}>
    {
            regs.map((reg) => {
                
                return <div style={{margin: '15px', display: 'flex', alignItems: 'center'}}>
                    <img style={{width: '60px', height: '60px', borderRadius: '50%'}} src={avatar} alt=""/>
                    <p style={{marginLeft: '20px', fontWeight: "bolder"}}> {reg.name }</p>
                    <a href = {"mailto:"+reg.email} style={{marginLeft: '40px', fontWeight: "bolder"}}> <img style={{width: '40px', height: '40px'}} src={mail} alt=""/></a>

                </div>
            })
        }
    </ul>
        <Footer />
    </div>
  )
}
