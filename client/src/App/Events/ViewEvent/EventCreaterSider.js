import React from 'react'

export default function EventCreaterSider({setcs}) {
  return (
    <div className='stepcontainer classin1'>
        <button onClick={()=>setcs(1)}> Participant List</button>
        <br />
        <br />
        <button onClick={()=>setcs(2)}> Regs Over date</button>
    </div>
  )
}
