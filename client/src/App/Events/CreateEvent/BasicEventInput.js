import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import '../../css/createEvent.scss'
import "bootstrap/dist/css/bootstrap.min.css";

export default function BasicEventInput({summary,setSummary, setStatus,csteps,setCsteps ,name, setName, description, setDescription, setPlace, setType, startDate, setStartDate, endDate, setEndDate}) {
    
    
    const options = [
        {
                label: "Apple",
                value: "apple",
        },
        {
            label: "op",
            value: "op",
    }
    ];
    useEffect(() => {
        console.log("executing");
    },[])
    const handleNext = () => {
        setCsteps([
            {
                "name": "About",
                "completed": true
            }, 
            {
                "name": "More",
                "completed": true
            }, 
            {
                "name": "Complete",
                "completed": false
            }
        ])
    }

    
  return (
    <div>
        
        <div class="form-group">
        <label>Event name:</label>
        <br />
        <input
          type="text" 
          value={name}
          onChange={(e) => {setStatus(""); setName(e.target.value)}}
        />
        
        </div>
        <div class="form-group">
        <label>Enter your summary: </label>
        <br />
        <textarea
                type="text" 
                value={summary}
                onChange={(e) => {setStatus(""); setSummary(e.target.value)}}
            />
        
        
        </div>
        <div class="form-group">
        <label>Enter your Description: </label>
        
        <textarea
                className='desc-textarea'
                type="text" 
                value={description}
                onChange={(e) => {setStatus(""); setDescription(e.target.value)}}
            />
        
        
        </div>
        
        
       
      
        
        
        <button id="submit-btn1"  className='float-right' onClick={handleNext}>Next</button>
        
    </div>
  )
}
