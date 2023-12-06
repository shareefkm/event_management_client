import React from 'react'
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import Tables from './Tables';

function AdminHome() {
    const admin = useSelector((state) => state.admin);
  return (
    <div className="md:flex">
        <div>
          <SideBar/>
        </div>
        <div className='pl-5 md:w-full'>
        <Tables path={'/getusers'} action={'/userstatus'}/>
        </div>
      </div>
  )
}

export default AdminHome
