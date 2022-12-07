import React from 'react'
import { format } from 'date-fns'

export default function EventIntro({event}) {
    const style = {
        fontFamily: 'italic',
        paddingTop: '8px'
    }
  return (
    <div>
        <div className="hero-unit" style={{paddingTop: '20px'}}>
             <p className="badge bg-secondary"> <em>Trending </em> #2</p>

            <h5>{format(new Date(event.startDate),"dd-mm-yyyy")} </h5>
            <h1 style={{fontFamily: 'cursive'}}>
                {event.name}
            </h1>
            <p style={style}>
                {event.summary}
            </p>
          </div>
    </div>
  )
}
