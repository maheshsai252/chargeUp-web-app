import React from 'react'
import AdminEventsGrid from './AdminEventsGrid'
import AdminEventsView from './AdminEventsView'
import AdminUsersListView from './AdminUsersListView'

export default function AdminRightSideView({cs}) {
  return (
    <div className='classin2'>
       
        <br/>
        <br/>

         {(() => {
        if (cs===1) {
          return (
            <AdminEventsView />
          )
        } else if (cs===2) {
          return (
            <AdminUsersListView />
          )
        } else {
          return (
            <div></div>
          )
        }
      })()}
    </div>
  )
}
