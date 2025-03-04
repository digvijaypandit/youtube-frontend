import React from 'react'
import Header from '../components/header/Header'
import ErrorImg from '../assets/ErrorImg.png'
function Shorts() {
  return (
    <div>
        <Header />
        <div className='p-14 max-w-screen bg-[#0f0f0f]'>
          <div className='absolute top-[40%] left-[35%] flex items-center justify-between'>
            <img src={ErrorImg} alt="Error" className='w-40 h-40' />
            <h1 className='m-2'>This page isn't available. Sorry about that.<br/>Try searching for something else.</h1>
          </div>
        </div>
    </div>
  )
}

export default Shorts