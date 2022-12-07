import React from 'react'
import axios from 'axios';
import mgglass from '../../resources/mgglass.png'
export default function SearchInput({setSearch,search,setEvents,setLoading}) {
    const searchEvents = async () => {
        const response = await axios.post('/api/events/search',{
            search: search
        });
        console.log( response,"gotten")
        if(response.status===200) {
            
            setEvents(response.data);
        } else {
            setLoading(false)
        }
    }
  return (
    <div className='stylev classout'>
        <input className="classin2" type="text" style={{width: '60%', height:'50px'}}onChange={(e)=> {setSearch(e.target.value)}} />
        <button className="searchbutton"  onClick={searchEvents}>   
                 <img style={{width: '35px', height: '35px'}} src={mgglass} alt="" />
        </button>
    </div>
    
  )
}
