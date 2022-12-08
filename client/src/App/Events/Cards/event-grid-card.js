import React from 'react'
import { format } from 'date-fns'
import '../../css/eventcard.scss'
import axios from 'axios';
import { useNavigate } from 'react-router';

function CardImage({event}) {
    console.log(event.filenames, "filesu")
    // const isImageURL = event.filenames[0];
    // If an image was passed:
    if (event && event.filenames[0]) {
      return (
        <div className="styleImage">
        <img style={{width: '350px'}} 
        src= {"https://chargeup.s3.amazonaws.com/"+event.filenames[0]} alt='lol'/> 

         
        </div>
      );
    }
    return null;
  }
  const likeEvent = async (event) => {
      try {
          const res = await axios.post('/api/likeEvent', {
            userid: sessionStorage.getItem('userid'),
            eventid: event._id
          })
      } catch (error) {
        console.log(error,"interests")
      }
  }
  
  function CardContent({event}) {
    const navigate = useNavigate();
    return (
      <div className="styleCardContent">
        <p className="styleCardTitle">{event.name}</p>
        <div className="styleLocationLabel"><i class="fas fa-map-pin"></i> {event.place?.split(',')[0]}</div>
  
        <div className="styleDateLabel"><i class="fa fa-calendar"></i> {format(new Date(event.startDate), 'yyyy/MM/dd kk:mm')}</div>

        <p className="styleDescription" style={{padding: '20px 0 20px'}}>{event.summary}</p>
        
        {/* <a href="#" class="card-link">Book Now!</a> */}
        {/* <div class="card-footer text-muted">
        
        2 days ago
       </div> */}
       <div class="card-footer">
       <button class="btn_heart" onClick={() => {likeEvent(event)}}><i class="fas fa-solid fa-heart"></i></button>

       <button class="card_btn" onClick={() => {navigate('/event/'+event.nameTag)}}><i class="fas fa-chevron-circle-right"></i></button>
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
