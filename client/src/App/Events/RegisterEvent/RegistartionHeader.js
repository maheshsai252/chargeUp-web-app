import React from 'react'
import RegistrationContent from '../../Registration/RegistrationContent'
import FreeEvent from './FreeEvent'
import PaidEvent from './PaidEvent'

export default function RegistartionHeader({event}) {
  return (
    <div>
        <div className="register-header">
          <div className="register-container">
              <div className="navigation">

              </div>
          </div>
          <div className="notification">
          Registering for {event.name}
          </div>
        </div>
        <section className="register-content">
        <RegistrationContent event={event } />

        </section>
        <div>

        {
            event.price===0 ? <FreeEvent event={event} /> : <PaidEvent event={event} />
        }
        </div>
    </div>
  )
}
