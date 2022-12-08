import React from 'react'
import AdminSider from './AdminSider'
import { useState } from 'react'
import AdminRightSideView from './AdminRightSideView'
import NavBar from '../Nav/NavBar'

export default function AdminView() {
    const [cs, setcs] = useState('1')

  return (
    <div>
        <NavBar />
        <h1>Admin View</h1>
        <div className='adjuster classout'>
            <AdminSider setcs={setcs} />
            <AdminRightSideView cs={cs}  />
          </div>
    </div>
  )
}
