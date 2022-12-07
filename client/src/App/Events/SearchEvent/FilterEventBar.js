import React from 'react'
import DatePicker from "react-datepicker";
import { useState } from 'react';
import axios from 'axios';

export default function FilterEventBar({setEvents,search}) {
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
            console.log(tagresponse,"responsive");
            setEvents(tagresponse.data);
             
        } catch (error) {
            // (error.response.data.message);
            return;
            // console.log(error,"error-res")
        }
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
        </div> : <p></p>}
    </div>
  )
}
