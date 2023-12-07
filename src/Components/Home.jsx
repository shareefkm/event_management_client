import React from 'react'
import { useSelector } from "react-redux";
import Sidebar from './Sidebar';
import Events from './Events';


function Home() {
  const user = useSelector((state) => state.user);

  return (
    <div className="bg-gray-100" >
            <Sidebar />
            <div className="md:flex  md:ml-72  lg:ml-72 ">
                <Events />
            </div>   
             
        </div>
  )
}

export default Home
