import React from 'react'

export default function EventDetail({event}) {
  return (
    <div>
         <p style={{width: '60%',padding:'20px'}}>
            {event.description}
        </p>
    </div>
  )
}
