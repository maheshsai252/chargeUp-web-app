import React, { useEffect } from 'react'
import AdminSider from './AdminSider'
import { useState } from 'react'
import AdminRightSideView from './AdminRightSideView'
import NavBar from '../Nav/NavBar'

export default function AdminView() {
    const [cs, setcs] = useState('1')
    const [available, setAvailable] = useState(false);
    useEffect(()=> {
        if(sessionStorage.getItem('userid') === "637af314e42a26786bac060b") {
            setAvailable(true)
        }
    },[])
  return (
    <div>
        <NavBar />
        <h1>Admin View</h1>
        {
            available ? 
            <div className='adjuster classout'>
            <AdminSider setcs={setcs} />
            <AdminRightSideView cs={cs}  />
          </div> 
          :
          <div>
          <br />
          <br />
          <br />

          <p style={{textAlign: "center"}}>No Access to Admin Portal</p>
          <br />
          <br />
          </div>
           
        }
        
    </div>
  )
}
