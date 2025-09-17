import React from 'react'
import { Link } from 'react-router-dom'
import Top from '../parts/Top'
import Bottom from '../parts/Bottom'
const Section = () => {
  return (
    <>
    <Top/>
    <div className='h-screen bg-zinc-700'>
      <Link to="/Section/Profile">Profile</Link>
      <Link to="/Section/Attendance">Attendance</Link>
    </div>
    <Bottom/>
    </>
  )
}

export default Section
