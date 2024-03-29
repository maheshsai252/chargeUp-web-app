import React from 'react'
import { format } from 'date-fns'
import axios from 'axios';
import { useNavigate } from 'react-router';

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
  
  function MyCardContent({event,setEvents}) {
    const unregister = async () => {
        const response = await axios.post('/api/event/delete',{
            eventid:  event._id
        });
        console.log(response);
        getEvent()
    }
    const navigate = useNavigate();
    const getEvent = async () => {
        const response = await axios.post('/api/events/',{
            
        });
        console.log( response.data,"gotten")
        if(response.status===200) {
           setEvents(response.data);
        } else {
            
        }
    }
    return (
      <div className="styleCardContent">
        <p className="styleCardTitle">{event.name}</p>
        <div className="styleLocationLabel"><i class="fas fa-map-pin"></i> {event.place?.split(',')[0]}</div>
  
        <div className="styleDateLabel"><i class="fa fa-calendar"></i> {event.startDate !== undefined ? format(new Date(event.startDate), 'yyyy/MM/dd kk:mm') : "undefined"}</div>
        <div>
            <button onClick={unregister} className='unregister'> Delete </button>
        </div>
        <div>
            <button onClick={() => {navigate('/update/'+event.nameTag)}} className='unregister' style={{border: '1px solid yellow'}}> Update Event </button>
            <button  onClick={() => {navigate('/admin/manage/'+event.nameTag)}} className='unregister' style={{marginLeft: '10px',border: '1px solid yellow'}}> Manage Event </button>

        </div>
        {/* <div>
            <button className='pairingbutton'><a style={{textDecoration: 'none'}} href={"/pairing/"+event.nameTag}>Pairing </a>  </button>
        </div> */}
        {/* <a href="#" class="card-link">Book Now!</a> */}
        {/* <div class="card-footer text-muted">
        
        2 days ago
       </div> */}
       {/* <div class="card-footer">
       <button class="card_btn"><i class="fas fa-chevron-circle-right"></i></button>
      </div>  */}
    </div>
    );
  }

export default function AdminEventCard({event,setEvents}) {
    
  return (
    <div>
        <div style={{ width: "350px" }}>
        <div className="styleCard">
          <CardImage event={event} />
          <MyCardContent
            event={event}
            setEvents={setEvents}
          />
        </div>
      </div>
    </div>
  )
}
