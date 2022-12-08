import React from 'react'
import DatePicker from "react-datepicker";
import { useState } from 'react';
import axios from 'axios';

export default function FilterEventBar({setEvents, search, setSearch, events}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const categories = ["music", "food", "theater", "sports", "arts", "science", "business", "travel"]
    const [type, setType] = useState("");
    const [price, setPrice] = useState("free");
    const [show,setShow] = useState(true);

    const filter = async () => {
        try {
            const tagresponse = await axios.post('/api/events-filterByCategory/', {
                searchCategory: type,
                start: startDate,
                end: endDate,
                price: price === "free" ? 0 : 1,
                search: search

            });
            const pr = price === "free" ? 0 : 1
            console.log({
                searchCategory: type,
                start: startDate,
                end: endDate,
                price: price === "free" ? 0 : 1,
                search: search

            },events ,"responsivep")
            const ev = events.filter((e) => {
                return e.type === type && e.price >= pr && e.startDate >= startDate
            })
            setEvents(ev);
            // console.log(price === "free" ? 0 : 1,tagresponse,"responsive");
            setEvents(tagresponse.data);
             
        } catch (error) {
            console.log(error, "responsive")
            // (error.response.data.message);
            return;
            // console.log(error,"error-res")
        }
    }
    const fetchFree = async () => {
        const response = await axios.post('/api/freeEvents', {
            

        });
        setSearch("")
        setEvents(response.data);
    }
  return (
    <div>
    <div className='spacebtn'>
        <h5 style={{fontWeight: 'bolder'}} onClick={() => setShow(show ? false : true)}>Filter</h5>

        {show ? <button style={{float: 'right'}} onClick={filter}>Apply</button> : <p> </p> }
    </div>
        {
            show ? 
            
            
        <div>

        
        <label>Start Date</label>
       <br/>
        <DatePicker selected={startDate}
            showTimeSelect
            dateFormat="Pp" 
            wrapperClassName="datePicker" 

            onChange={(date) => {
            console.log(date);
                
                setStartDate(date);

        }} />
        
        <br />
        <label> Category </label>
        <select style={{width: '100%', backgroundColor: "black", color: "white", border: "1px solid yellow"}} className="form-control" onChange={(e) => {setType(e.target.value)}}>
            {
                categories.map((category) => {
                    return <option value={category}>{category}</option>

                })
            }
        </select>
        <label>Price </label>
        <select style={{backgroundColor: "black", color: "white", border: "1px solid yellow"}} className="form-control" onChange={(e) => {setPrice(e.target.value)}}>
           
            <option value="free">free</option>
            <option value="price">price</option>

                
        </select>
        <br />
        <br/>
        <div className='hor'></div>
        <button onClick={fetchFree}>Fetch All Free Events</button>

        </div> : <p></p>}
      
    </div>
  )
}
