import React, {useState} from 'react'
import BasicEventInput from './BasicEventInput'
import CompletionInput from './CompletionInput';
import Stepper from './Stepper';
import { createEvent } from '../../services/EventService';
import '../../css/createEvent.scss';
import NavBar from '../../Nav/NavBar';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import FinalInput from './FinalInput';
import { useNavigate } from 'react-router';

export default function CreateEvent() {
    const steps = [{
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
    }];
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
        if(type.length === 0) {
            setStatus("Please add a category");
            return;
        }

        
        try {
            const tagresponse = await axios.post('/api/events/checkNameTag', {
                nameTag: nameTag
            });
            console.log(tagresponse,"response");
            if(tagresponse.status !== 200) {
                console.log(tagresponse.response.data.message);
                setNameTagError(tagresponse.response.data.message);
                return;
            }
        } catch (error) {
            setNameTagError(error.response.data.message);
            setStatus("name tag already taken");
            return;
            // console.log(error,"error-res")
        }
        
        console.log(files,"files")
        const event = {
            "name": name,
            "description": description,
            "summary": summary,
            "tags": tags,
            "startDate": startDate,
            "endDate": endDate,
            "type": type,
            "capacity": parseInt(capacity),
            "nameTag": nameTag,
            "userid": sessionStorage.getItem('userid'),
            "files": files,
            "price": parseInt(price)
        }
        if(place===undefined) {
            event.place = "online"

        } else {
            const ans =  place.address_components.reduce(function (a, b) {
                return (a.short_name || a) + ", " + b.short_name}
            )
            console.log("kdkd")
            event.place = place.name + "," + ans
            event.latitude= place.geometry.location.lat()
            event.longitude = place.geometry.location.lng()
        }
        
        
        console.log(event,place, place===undefined, place,"final eve")

        
        const response = await createEvent(event);
        console.log(response);
        if(response["status"]===200) {
            setStatus(response.data["name"])
            navigate('/event/'+response.data["nameTag"]);
        } else {
            setStatus(response.data["message"])
        }
        
    };
    const [csteps, setCsteps] = useState(steps);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [place, setPlace] = useState();
    const [status, setStatus] = useState("");
    const [type, setType] = useState("music");

    const [tags, setTags] = useState([]);
    const [tagError, setTagError] = useState("");
    const [nameTag, setNameTag] = useState("");
    const [nameTagError, setNameTagError] = useState("");
    const [files, setSelectedFiles] = useState([])
    const [summary, setSummary] = useState("")
    const [summaryError, setSummaryError] = useState("")
    const [capacity, setCapacity] = useState("20");
    const [price, setPrice] = useState("0");

  return (
    <div>
    <NavBar />
    <div className='adjuster classout' style={{display: 'flex',justifyContent:"space-around"}}>
    <Stepper style={{padding: '50px'}} steps={csteps}/>
    <div className='basic-form classin2'>
    <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
            {csteps[2].completed === true ? <FinalInput
                place={place}
                setCsteps={setCsteps} 
                setStatus={setStatus}
                nameTag={nameTag} setNameTag = {setNameTag} nameTagError={nameTagError} setNameTagError={setNameTagError} 
                tags={tags} setTags={setTags} tagError={tagError} setTagError={setTagError} place= {place} setPlace={setPlace}
                files={files} setSelectedFiles={setSelectedFiles}
                name={name}
            /> : csteps[1].completed === false ?
            <BasicEventInput 
            summaryError={summaryError} setSummaryError={setSummaryError} summary={summary} setSummary={setSummary} 
            setStatus={setStatus} csteps={csteps} setCsteps={setCsteps} name={name}
            setName={setName} description={description} setDescription= {setDescription}
            
            /> : 
            <div>
                <CompletionInput 
                name={name}
                capacity = {capacity}
                setCapacity = {setCapacity}
                price={price}
                setPrice={setPrice}
                place={place}
                setPlace = {setPlace}
                setType={setType} 
                    setStatus={setStatus}
                    setCsteps={setCsteps}
                    startDate={startDate} setStartDate={setStartDate}
                endDate={endDate} setEndDate={setEndDate}
                />
            </div>
             }
             <p className='event-add-status'>{status}</p>

        </form>
        </div>
    </div>
    
       
    </div>
  )
}
