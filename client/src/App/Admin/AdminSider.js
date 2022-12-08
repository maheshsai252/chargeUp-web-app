import React from 'react'

export default function AdminSider({setcs}) {
  return (
    <div className='stepcontainer classin1'>
    <button style={{margin: "10px"}} onClick={()=>setcs(1)}> Event List</button>
        <br />
        <br />
        <button style={{margin: "10px"}} onClick={()=>setcs(2)}> User List</button>
        
    </div>
  )
}