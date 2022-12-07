import React, { useState } from 'react'
import axios from 'axios';

export default function FreeEvent({event}) {
    const [message,setMessage] = useState('');
    const userRegister = async () => {
        console.log(event._id,sessionStorage.getItem('userid'),"details");
        try {
            const response = await axios.post('/api/registration/create',{
                userid: sessionStorage.getItem('userid'),
                eventId: event._id
            });
            console.log( response,"gotten")
            if(response.status===200) {
                setMessage("Registration successful")
            }
        } catch (error) {
            console.log(error.response.data.message,"error")
            // console.log(response.data)
            setMessage(error.response.data.message);
        }
        
        
    }
  return (
    <div>
        {/* <p><bold>Free</bold></p> */}
        
        <div style={{marginTop: 0}}class="register-container">
            <div class="actions">
            <button className="register-btn action__submit" onClick={userRegister}>Register</button>

            </div>
        </div> 
        <p>{message}</p>
    </div>
  )
}
