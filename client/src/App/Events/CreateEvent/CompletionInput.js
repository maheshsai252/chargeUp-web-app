import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

// import Autocomplete from "react-google-autocomplete";
import AutoComplete from './AutoComplete';
export default function CompletionInput({price,setPrice,capacity, setCapacity, setType, place,startDate, setStartDate, endDate, setEndDate, setStatus, setCsteps, name, setPlace, files,setSelectedFiles}) {
    
    
    const handlePrevious = () => {
        setCsteps([{
            "name": "About",
            "completed": true
        }, 
        {
            "name": "More",
            "completed": false
        },
    {
        "name": "Complete",
        "completed": false
    

    }]);
    }
    const handleNext = () => {
        setCsteps([{
            "name": "About",
            "completed": true
        }, 
        {
            "name": "More",
            "completed": true
        },
    {
        "name": "Complete",
        "completed": true
    

    }]);
    }
    const categories = ["music", "food", "theater", "sports", "arts", "science", "business", "travel"]

  return (
    <div>
    <div className='form-group'>
        <label> Category </label>
        <select style={{width: '70%', backgroundColor: "black", color: "white", border: "1px solid yellow"}}className="form-control" onChange={(e) => {setStatus("");console.log(e.target.value,"category");setType(e.target.value)}}>
            {
                categories.map((category) => {
                    return <option value={category}>{category}</option>

                })
            }
        </select>
    </div>
    <div className='form-group'>
        <label> Capacity </label>
        <br/>
        <input type="text" value={capacity} onChange= {(e)=> {setCapacity(e.target.value)}}/>
    </div>
    <br/>
    <div className='form-group'>
        <label> Price $ </label>
        <br/>
        <input type="text" value={price} onChange= {(e)=> {setPrice(e.target.value)}}/>
    </div>
    <br />
     <div className='form-group'>
       <label>Start Date</label>
       <br/>
       
        <DatePicker selected={startDate}
            showTimeSelect
            dateFormat="Pp" 
            wrapperClassName="datePicker" 
            onChange={(date) => {
            console.log(date);
                setStatus("");
                setStartDate(date);
        }
            
        } />
       </div>
        <div className='form-group'>
        <label>End Date</label>
        <br />
        <DatePicker selected={endDate}
            showTimeSelect
            dateFormat="Pp" 
            wrapperClassName="datePicker" 
            onChange={(date) => {
                console.log(date);
                setEndDate(date);
            }} />
        </div>
        
    <br/>

        <div className='form-group'>
        <label>Location</label>

        </div>
        <AutoComplete place={place} setPlace={setPlace} setStatus={setStatus}/>

        
        {/* <br /> */}
        {/* <Autocomplete
            apiKey= {apiKey}
            onPlaceSelected={(place) => {
                setPlace(place);
                console.log(place,"geometry");
            }}
            className="autoComplete"
        /> */}
        {/* <br/> */}
        
        <div className='float-right m-20' >

        <button id="submit-btn1" className='float-right' onClick={handleNext} > Next</button>
        <button id="submit-btn1" className='float-right' onClick={handlePrevious}>Prev</button>

        </div>
        
        
       
    </div>
  )
}
