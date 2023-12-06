import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../Components/Register'
import OtpInput from '../Components/OtpInput'
import Home from '../Components/Home'
import Login from '../Components/Login'
import { useSelector } from 'react-redux'
// import Home from '../Pages/Home'

function UserRouts() {
    const IsAuth = useSelector((state) => state.user);
  return (
    <div>
      <Routes>
        <Route path='/' element = {IsAuth.token ? <Home/> : <Register/>}/>
        <Route path='/login' element = {IsAuth.token ? <Home/>: <Login/>}/>
        <Route path='/otpinput' element = {<OtpInput/>}/>
        <Route path='/home' element = {IsAuth.token ? <Home/> : <Login/>}/>
      </Routes>
    </div>
  )
}

export default UserRouts