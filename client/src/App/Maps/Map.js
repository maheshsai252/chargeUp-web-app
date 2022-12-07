import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import './map.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    {/* <Icon color='red' icon={locationIcon} className="pin-icon" /> */}
    <p style={{color:'blue'}}className="pin-text"><i class="fas fa-map-pin"></i></p>
    <p style={{color:'blue'}}className="pin-text">{text}</p>

  </div>
)

function  Map ({ events, zoomLevel })  {
  useEffect(()=> {

  },[events])
return (
  <div className="map">
    {/* <h2 className="map-h2">Come Visit Us At Our Campus</h2> */}

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDWiOF31Xvh-AiFoDQVIl2y_RBpuJzrLC8' }}
        defaultCenter={{
          lat: events.length !==0 ? events[0].latitude : 42,
          lng: events.length !==0 ? events[0].longitude : 71,
          address: events.length !==0 ? events[0].place : "northeastern"
        }}
        defaultZoom={zoomLevel}
      >
      {
        events.map((event)=>{
          return <LocationPin
          lat={event.latitude}
          lng={event.longitude}
          text={event.place.split(',')[0]}
        />
        })
      }
        
      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map