import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EventGrid from '../Events/Cards/EventGrid';

export default function EventsNearYou() {
    const [lat, setLat] = useState(42.3380964);
  const [long, setLong] = useState(-71.0879595);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const apiCall = async (lat,long) => {
            try 
            {
                
                if(data.length === 0) {
                    const response = await axios.post('/api/events-nearby',{
                        latitude: lat,
                        longitude: long
                    });
                    console.log("ilo")
               
                    console.log(response,"gotten");
                    setData(response.data);
                    setLoading(false);
                }
                
              } catch (error) {
                console.log(error)
              }
        }
        navigator.geolocation.getCurrentPosition(function(position) {
      
            console.log("position",position);
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            apiCall(lat,long);
    
        });
    })
  return (
    <div>
    <h2>Events Near You</h2>
    {
        loading ? <p>Loading..</p> : <EventGrid events={data} />
    }
    </div>
  )
}
