import React from 'react'
import { format } from 'date-fns'
import '../../css/eventcard.scss'

function CardImage({event}) {
    const isImageURL = event.filenames[0];
    // If an image was passed:
    if (isImageURL) {
      return (
        <div className="styleImage">
        <img style={{width: '350px'}} 
        src= {"https://chargeup.s3.amazonaws.com/"+event.filenames[0]} alt='lol'/> 

         
        </div>
      );
    }
    return null;
  }
  
  function CardContent({event}) {
    return (
      <div className="styleCardContent">
        <p className="styleCardTitle">{event.name}</p>
        <div className="styleLocationLabel"><i class="fas fa-map-pin"></i> {event.place?.split(',')[0]}</div>
  
        <div className="styleDateLabel"><i class="fa fa-calendar"></i> {format(new Date(event.startDate), 'yyyy/MM/dd kk:mm')}</div>

        <p className="styleDescription">{event.summary}</p>
        
        {/* <a href="#" class="card-link">Book Now!</a> */}
        {/* <div class="card-footer text-muted">
        
        2 days ago
       </div> */}
       <div class="card-footer">
       <button class="card_btn"><i class="fas fa-chevron-circle-right"></i></button>
      </div> 
    </div>
    );
  }

export default function EventGridCard({event}) {
  return (
    <div>
        <div style={{ width: "350px" }}>
        <div className="styleCard">
          <CardImage event={event} />
          <CardContent
            event={event}
          />
        </div>
      </div>
    </div>
  )
}
