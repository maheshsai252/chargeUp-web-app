import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EventGrid from '../Events/Cards/EventGrid';
import Loader from '../Home/Loader';

export default function EventsNearYou() {
    const [lat, setLat] = useState(42.3380964);
  const [long, setLong] = useState(-71.0879595);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
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
                    if(response.data.length > 10) {
                        
                        setData(shuffle(response.data.slice(1,11)));
                   
                        // setEvents(response.data.slice(1,11));
                      } else {
                        setData(shuffle(response.data));
                      }
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
        loading ? <Loader /> : <EventGrid events={data} />
    }
    </div>
  )
}
