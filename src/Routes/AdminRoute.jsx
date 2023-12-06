import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../Components/Admin/AdminLogin'
import AdminHome from '../Components/Admin/AdminHome'
import EventsPage from '../Components/Admin/EventsPage'


function AdminRoute() {
  const isAuth = useSelector((state)=>state.admin)
  return (
    <div>
      <Routes>
        <Route path='/' element={isAuth.token ? <AdminHome/> : <AdminLogin/>}/>
        <Route path='/home' element={isAuth.token ? <AdminHome/> : <AdminLogin/>}/>
        <Route path='/events' element={isAuth.token ? <EventsPage/> : <AdminLogin/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoute
