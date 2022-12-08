import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import NavBar from '../../../Nav/NavBar';
import Footer from '../../../Nav/Footer';
import avatar from '../../../resources/avatar-2.jpg';
import mail from '../../../resources/mail.png';
import cover from "../../../resources/cover.jpg";

import UsersList from './UsersList';

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
        <div className='outerbg'>
                 <img src={cover}
                    alt=""
                    className="cover"
                    style={{height: "200px"}}
                />
            <h1 className='innercenter'> Pairing suggestions for you {event.title}</h1>
         </div>
        
            <button onClick={pairing}>
                Get Pairing Suggestions
            </button>
            {message}
            <br />
            <br />
            <br />
            <UsersList regs={regs} />
            {/* <ul style={{listStyle: 'none'}}>
    {
            regs.map((reg) => {
                
                return <div style={{margin: '15px', display: 'flex', alignItems: 'center'}}>
                {
            reg.file === 'none' ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            :        
              <img style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px'}} src= {"https://chargeup.s3.amazonaws.com/"+reg.file} alt='lol'/>

          }
                    <img style={{width: '60px', height: '60px', borderRadius: '50%'}} src={avatar} alt=""/>
                    <p style={{marginLeft: '20px', fontWeight: "bolder"}}> {reg.name }</p>
                    <a href = {"mailto:"+reg.email} style={{marginLeft: '40px', fontWeight: "bolder"}}> <img style={{width: '40px', height: '40px'}} src={mail} alt=""/></a>

                </div>
            })
        }
    </ul> */}
        <Footer />
    </div>
  )
}
