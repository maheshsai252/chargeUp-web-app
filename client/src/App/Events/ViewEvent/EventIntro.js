import React from 'react'
import { format } from 'date-fns'
import axios from 'axios'
export default function EventIntro({event}) {
    const style = {
        fontFamily: 'italic',
        paddingTop: '8px'
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
  return (
    <div>
        <div className="hero-unit" style={{paddingTop: '20px'}}>
             <p className="badge bg-secondary"> <em>Trending </em> #2</p>

            {/* <h5>{format(new Date(event.startDate),"dd-mm-yyyy")} </h5> */}
            <div className='spacebtn'>
                <h1 style={{fontFamily: 'cursive'}}>
                    {event.name}
                </h1>
                {
                  sessionStorage.getItem('userid') !== undefined && event.createdBy !== sessionStorage.getItem('userid') ? 
                  <div>
                <button>
                    Register
                </button>
                <button style= {{margin: "10px"}}class="btn_heart" onClick={() => {likeEvent(event)}}><i class="fas fa-solid fa-heart"></i></button>

                </div> :
                <div>
                </div>
                }
                
               
            </div>
            
            <p style={style}>
                {event.summary}
            </p>
          </div>
    </div>
  )
}
