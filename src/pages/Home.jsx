import React from 'react'
import Header from '../components/header/Header'
import HomeVideos from './HomeVideos'

function Home() {
  return (
    <div>
        <Header />
        <div className='p-14 max-w-screen bg-[#0f0f0f]'>
          <HomeVideos />
        </div>
    </div>
  )
}

export default Home
