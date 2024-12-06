import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HomeImage from '../assets/HomeImage.png'

const Start = () => {
  return (
    <div>
        <div className='flex justify-between flex-col h-screen w-full '>
            <div className='h-full w-full'>
            <img className='w-full h-full object-cover ' src={HomeImage} alt="" />    
            </div>
            <div className='bg-white pb-7 px-4 py-10'>
                <h1 className='text-[1.6rem] font-bold text-zinc-800'>Get Started With Drivio.- </h1>
                <Link  to='/login'><button className='bg-black text-white py-3 mt-5 w-full items-center justify-between px-4 rounded-lg flex '>Continue <FaArrowRight /></button></Link>
            </div>
        </div>
    </div>
  )
}

export default Start