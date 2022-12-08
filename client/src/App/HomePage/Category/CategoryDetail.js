import React from 'react'

import cover from "../../resources/cover.jpg";
import EventGrid from '../../Events/Cards/EventGrid';

export default function CategoryDetail({category, desc, events}) {
  return (
    <div>
    <div className='outerbg'>
    <img src={cover}
                    alt=""
                    className="cover"
                    style={{height: "200px"}}
                />
                <h2 className="innercenter" style={{textAlign: "center"}}>{category}</h2>
    </div>
    
      
    <h5 style={{margin: ' 0 30px 30px'}}>{desc}</h5>
    <h2 style={{color: "yellow"}}>Events in {category}</h2>
    <EventGrid events={events} />
    </div>
  )
}
