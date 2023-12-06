import React from 'react'
import SideBar from './SideBar'
import Tables from './Tables'

function EventsPage() {
  return (
    <div className="md:flex">
        <div>
          <SideBar/>
        </div>
        <div className='pl-5 md:w-full'>
          <Tables path={'/getevents'}/>
        </div>
      </div>
  )
}

export default EventsPage
