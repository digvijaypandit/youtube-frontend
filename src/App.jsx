import React,{useState} from 'react'
import Header from './components/header/Header'
import VideoPlayer from './components/VideoPlayer'

function App() {

  return (
    <div className='overflow-hidden'>
      {/* <Header /> */}
      {/* <VideoPlayer src="http://res.cloudinary.com/dscnfodtk/video/upload/v1737464826/yttghqrsod87fqprzeyp.mp4"/> */}
      <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
            <VideoPlayer src="http://res.cloudinary.com/dscnfodtk/video/upload/v1737464826/yttghqrsod87fqprzeyp.mp4" />
        </div>
    </div>
  )
}

export default App