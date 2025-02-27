import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import VideoInfoCard from '../components/VideoInfoCard'
import Header from '../components/header/Header'
import SmallVideoCards from './SmallVideoCards'
import CommentSection from '../components/CommentSection'
function VideoPage() {
  return (
    <div>
       <Header hiddensidebar={true} />
        <div className='p-14 flex ml-2 max-w-screen'>
            <div>
                <VideoPlayer />
                <VideoInfoCard/>
                <CommentSection />
            </div>
            <SmallVideoCards />
        </div>
    </div>
  )
}

export default VideoPage