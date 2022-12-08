import React from 'react'

export default function EventStatus({event}) {
  const color = () => {
    console.log(event.available, event.capacity,event.available > event.capacity/2, "pop")
    if(event.available > event.capacity/2) {
      return "alert alert-info"
    } else {
      return "alert alert-danger"
    }
  }
  return (
    <div>
        <div className={color()}>
            This Event is {event.available <= event.capacity/2 ? "Fast filling" : "Picking Spotlight"}
          </div>
    </div>
  )
}
