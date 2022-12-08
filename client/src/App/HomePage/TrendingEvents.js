import React, { useEffect, useState } from 'react'
import TrendingEventRow from './TrendingEventRow'
import axios from 'axios'
import EventGrid from '../Events/Cards/EventGrid';

export default function TrendingEvents() {
  const [events,setEvents] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("ilo")
        const response = await axios.post('/api/events-popular',{
        });
        console.log(response,"gotten");
      setEvents(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetch();
  },[])
  return (
    <div>
        <h2>Trending Events Near You</h2>
        <EventGrid events={events} />
    </div>
  )
}


// <div class="container-fluid">
//     <div class="row">
//       <div class="col-12 col-md-6 col-lg-3 card2"> 
       
//         </div>
//       <div class="col-12 col-md-6 col-lg-3 card2">
//         <div class="flip-card">

//           <!-- <section> -->
//             <div class="flip-card-inner">
//               <div class="flip-card-front">
//                 <img src="../../resources/websummit2.gif" alt="Avatar" style="width:300px;height:300px;">
//               </div>
//               <div class="flip-card-back">
//                 <div class="content">
//                   <p>
//                     Experience the expansive—and growing—network of shared-use 
//                   </p>
                  
//                   <button type="button btn-light">Show More</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </div>
//       <div class="col-12 col-md-6 col-lg-3 card2">
//         <div class="flip-card">

//           <!-- <section> -->
//             <div class="flip-card-inner">
//               <div class="flip-card-front">
//                 <img src="../../resources/cruise.webp" alt="Avatar" style="width:300px;height:300px;">
//               </div>
//               <div class="flip-card-back">
//                 <div class="content">
//                   <p>
//                     Experience the expansive—and growing—network of shared-use 
//                   </p>
                  
//                   <button type="button btn-light">Show More</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </div>
//       <div class="col-12 col-md-6 col-lg-3 card2">
//         <div class="flip-card">

//           <!-- <section> -->
//             <div class="flip-card-inner">
//               <div class="flip-card-front">
//                 <img src="../../resources/nba.gif" alt="Avatar" style="width:300px;height:300px;">
//               </div>
//               <div class="flip-card-back">
//                 <div class="content">
//                   <p>
//                     Experience the expansive—and growing—network of shared-use 
//                   </p>
                  
//                   <button type="button btn-light">Show More</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </div>
    
//     </div>
      
//     </div>