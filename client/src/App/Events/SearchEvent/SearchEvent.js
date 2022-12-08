import React, { useState } from 'react'
import NavBar from '../../Nav/NavBar'
import SearchInput from './SearchInput';
import axios from 'axios';
import FilterEventBar from './FilterEventBar';
import Map from '../../Maps/Map';
import EventList from '../Cards/EventList';
import Footer from '../../Nav/Footer';
import EventGrid from '../Cards/EventGrid';
import empty from '../../resources/empty.jpeg'
export default function SearchEvent() {
    const [search,setSearch] = useState("");
    const [events,setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    
  return (
    <div>
        <NavBar />
        <br />
        <SearchInput setSearch={setSearch} search={search} setEvents={setEvents} setLoading={setLoading}/>
        <br />
        <div className=' adjuster classout' >
        <FilterEventBar className=" classin1" search={search} setSearch={setSearch} events={events} setEvents={setEvents} />
        <div className='classin2'>
        {
            events.length !== 0 ? 
            <div className='adjuster'>

              <EventList events={events} />
              <Map events={events} zoomLevel={17} />
            </div>
             : <p>
                <br />
                {/* No results vro !! */}
                <img src={empty} style={{borderRadius: '30%', border: '2px solid yellow',width: '300px', height: "300px"}} alt="empty"/>
            </p>
        }
        </div>
        
        
       
            
        </div>
        <Footer />
    </div>
  )
}
