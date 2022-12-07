import React from 'react'
import '../../css/step.scss';

export default function Stepper(props) {
  return (
    <div className='stepcontainer classin1'>


        {props.steps.map((step,idx) => {
        return <div className='steps'>
                <div className='step'> 
                
                    <div className="circle">
                        {
                            step.completed === true 
                            
                            ? <div className="checkmark"> </div> : <div></div> 
                        
                        }
                        
                    </div>
                    <h4 className='stepTitle'>{step.name}</h4>
                </div>
                {(idx !== props.steps.length-1) ? 
                        <div className='questionNumberLine'> 
                     </div>: <div></div> } 

            </div>
        })}
    </div>
  )
}
