import React from 'react'

export default function EventDetail({event}) {
  return (
    <div>
         <p style={{width: '70%',padding:'20px', paddingLeft: '0px'}}>
            {event.description}
        </p>
        
    </div>
  )
}
