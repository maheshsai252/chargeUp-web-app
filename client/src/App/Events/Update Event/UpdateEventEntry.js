import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router';
import { updateEvent } from '../../services/EventService';
import { useParams } from 'react-router';
import axios from 'axios';
import UploadImageToS3WithNativeSdk from '../../Media/UploadFile';
export default function UpdateEventEntry() {
    const navigate=useNavigate();
    const [event, setEvent] = useState('')
    const {nameTag} = useParams();
    const [loading,setLoading] = useState(false);

    useEffect(()=> {
        setLoading(true);
        console.log(nameTag,"gotten name tag");
        const getEvent = async () => {
            const response = await axios.post('/api/event',{
                nameTag: nameTag
            });
            console.log( response,"gotten")
            if(response.status===200) {
                setLoading(false);
                setEvent(response.data[0]);
                updateDetails(response.data[0])
            } else {
                setLoading(false)
            }
        }
       getEvent();
        
        
    },[nameTag]);
    const updateDetails = (event)=> {
        console.log(event, "while updatin")
        setName(event.name);
        setSummary(event.summary);
        setDescription(event.description);
        setSelectedFiles(event.filenames);
        setStartDate(new Date(event.startDate));
        setEndDate(new Date(event.endDate));
        setCapacity(event.capacity);
        setPrice(event.price);

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("submitted",place,place.address_components,"setting");
        if(name.length === 0) {
            setStatus("name can't be empty");
            return;
        }
        if(summary.length === 0) {
            setStatus("summary can't be empty");
            return;
        }
        if(description.length === 0) {
            setStatus("name can't be empty");
            return;
        }
        
        if(startDate>=endDate) {
            setStatus("end date must be greater than start date");
            return;
        }
        if(capacity.length === 0 || !/^-?\d+$/.test(capacity)) {
            setStatus("capacity is invalid");
            return;
        }
        if(price.length === 0 || !/^-?\d+$/.test(price)) {
            setStatus("price is invalid");
            return;
        }
        if(files.length === 0) {
            setStatus("Please add a image ");
            return;
        }

        
        console.log(files, "observe")
        const eventc = {
            "name": name,
            "description": description,
            "summary": summary,
            "tags": event.tags,
            "startDate": startDate,
            "endDate": endDate,
            "type": event.type,
            "capacity": parseInt(capacity),
            "available": parseInt(capacity) - parseInt(event.capacity !== undefined ? event.capacity : 0),
            "nameTag": event.nameTag,
            "filenames": files,
            "price": parseInt(price),
            "userid": sessionStorage.getItem("userid"),
            "eventid": event._id
        }
        
        try {
            const response = await updateEvent(eventc);
                console.log(response);
                if(response["status"]===200) {
                    setStatus("event updated")
                    navigate('/event/'+event.nameTag)
                } else {
                    setStatus("error occured")
                }
        } catch (error) {
            setStatus(error.response.data.message)
        }
         
        
    };
    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const [status, setStatus] = useState("");
    
    const [files, setSelectedFiles] = useState(event.filenames)
    const [summary, setSummary] = useState(event.summary)
   
    const [capacity, setCapacity] = useState(event.capacity);
    const [price, setPrice] = useState(event.price);

  return (
    <div className='classin2' >
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
    <UploadImageToS3WithNativeSdk  files={files} setSelectedFiles={setSelectedFiles}/>
        {
          files &&  files.map((file) => {
                
                return <div>
                <img style={{width: '150px', height: '150px'}}src= {"https://chargeup.s3.amazonaws.com/"+file} alt='lol'/>
                <button onClick={(e)=> {const filesc = files.filter(
                    (i) => {
                        return i !== file
                    }
                );
                setSelectedFiles(filesc)
                }}>delete</button>

                {/* <p>{file}</p> */}
                </div>;
            })
        }
        <br />
        <p className='status'>{status}</p>
        <br />
        <button onClick={handleSubmit}>Update Event</button>
    </div>
  )
}
