import React, { useState } from 'react'
import Payment from '../../Registration/Payment'

export default function PaidEvent({event}) {
    const [email,setemail] = useState("");
    
  return (
    <div> 
      <div className="register-container">
            <div className="payment">
                <div className="payment__title">
                    Payment 
                </div>

                <div className="payment__info">
                    <div className="payment__cc">
                        <div className="field">
                            <div className="title" style={{fontWeight: "bolder"}}>E-mail address
                            </div>
                            
                            <input type="text" className="input txt" placeholder="yourmail@gmail.com" onChange={(e)=>{setemail(e.target.value)}}/>
                            <br />
                            <br/>
                            <br />
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       {/* <input type="text" placeholder='email' onChange={(e)=>{setemail(e.target.value)}}/> */}
       <Payment event={event} description={`${event.name}-${event.price}`} amount={event.price} email={email} />

    </div>
  )
}
