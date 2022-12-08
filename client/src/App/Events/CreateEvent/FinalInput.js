import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import UploadImageToS3WithNativeSdk from '../../Media/UploadFile';

export default function FinalInput({place, setCsteps, files,setSelectedFiles, name, setStatus, nameTag,setNameTag,nameTagError,setNameTagError, tags,setTags,tagError, setTagError}) {
    useEffect(() => {
        if(nameTag.length === 0) {
            const name_array = name.split(' ');
            setNameTag(name_array.join("-"));
        }
        console.log(place, "setting")
        
    },[name,setNameTag, nameTag])
    const handlePrevious = (e) => {
        e.preventDefault();
        console.log("prev");
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
        "completed": false
    

    }]);
    }
   
    const addTag = (e) => {
        e.preventDefault();
        const tag = document.getElementById("tag").value;
        setStatus("");
        console.log("adding", tag)

        if(tags.length >=5) {
            setTagError("only 5 tags allowed");
            return
        }
        if(!(/[A-Za-z]/.test(tag))) {
            setTagError("only letters allowed");
            return
        }
        if(tag.length > 10) {
            setTagError("only 10 letters allowed");
            return
        }
        setTags([
            ...tags,
            tag
        ]);

        document.getElementById("tag").value = "";
    }
    const handleNameTag = async (e) => {
        e.preventDefault();
        setNameTag(e.target.value);
        setNameTagError("")
        setStatus("");
        try {
            const _ = await axios.post('/api/events/checkNameTag', {
                nameTag: nameTag
            });
        } catch(error) {
            setNameTagError(error.response.data.message);

        }
       
        
    }
    return (
    <div>
    <div className='form-group' >
            <label>tags:</label>
            <div style={{display: 'flex'}}>
            <input
                type="text" 
                id='tag'
            />
            <input id="btn-sm" type="button" value="Add" onClick={addTag} />
            </div>
            
        </div>
        {tagError && <p style={{color: 'red'}}>{tagError}</p>}

        <div style={{overflow: 'scroll', marginTop: '20px', display: "flex", flexDirection: "row"}}>
            {tags.map((tag) => 
               <p style={{margin: '15px', padding: '10px',borderRadius: '20px', border: '2px solid yellow'}}>{tag}</p> 
            )}
        </div>
        <br/>


        <div className='form-group' >
            <label>link name:</label>
            <div style={{display: 'flex'}}>
            <input
                type="text" 
                id='name-tag'
                value={nameTag}
                onChange={handleNameTag}
            />
            <input id="btn-sm" type="button" value="Add" onClick={addTag} />
            </div>
            
        </div>
        {nameTagError && <p style={{color: 'red'}}>{nameTagError}</p>}
        <br />
        <label>Files</label>
        <br />

        <UploadImageToS3WithNativeSdk  files={files} setSelectedFiles={setSelectedFiles}/>
        {
            files.map((file) => {
                
                return <div>
                <img style={{width: '150px', height: '150px'}}src= {"https://chargeup.s3.amazonaws.com/"+file} alt='lol'/>
                {/* <p>{file}</p> */}
                </div>;
            })
        }
        <div className='float-right m-20' >
        
         <button id="submit-btn1" className='float-right'  type='submit' value="Add Event"> Add Event</button> 
        <button id="submit-btn1" className='float-right' onClick={(e)=>handlePrevious(e)}>Prev</button> 
        {/* <button onClick={handlePrevious}>Prev</button> */}
        </div>
    </div>
  )
}
