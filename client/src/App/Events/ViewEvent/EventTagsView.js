import React from 'react'

export default function EventTagsView({event}) {
  return (
    <div>
         <div style={{overflow: 'scroll', marginTop: '20px', display: "flex", flexDirection: "row"}}>
            {event.tags.map((tag) => 
               <p style={{color:"black", fontWeight: "bold", backgroundColor: "yellow", margin: '15px', padding: '10px',borderRadius: '20px', border: '2px solid yellow'}}>{tag}</p> 
            )}
        </div>
    </div>
  )
}
