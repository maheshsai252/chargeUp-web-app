import React from 'react'
import img from '../../resources/event1.png'
export default function EventImage({event}) {
  return (
    <div>
         <div className="row">
         {
          event.filenames.length !==0 ? 
          <img style={{width: '100%', height: '100%'}}src= {"https://chargeup.s3.amazonaws.com/"+event.filenames[0]} alt='lol'/> 
          :
          <p>no image</p>
         }
            {/* <img className="col header-img" src={} alt="" /> */}
            

          </div>
    </div>
  )
}
