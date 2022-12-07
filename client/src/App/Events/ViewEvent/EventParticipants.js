import React, {useEffect, useState} from 'react'
import axios from 'axios';
import avatar from '../../resources/avatar-2.jpg';

export default function EventParticipants({event, regs}) {

  return (
    <div>
    <ul style={{listStyle: 'none'}}>
    {
            regs.map((reg) => {
                
                return <div style={{margin: '15px', display: 'flex', alignItems: 'center'}}>
                    <img style={{width: '60px', height: '60px', borderRadius: '50%'}} src={avatar} alt=""/>
                    <p style={{marginLeft: '10px'}}> {reg.user.name }</p>
                </div>
            })
        }
    </ul>
        
    </div>
  )
}
