import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import Header from '../components/Header'
import VideoInfoCard from '../components/VideoInfoCard'
import CommentSection from '../components/CommentSection'
import SmallVideoCards from '../components/SmallVideoCards'

function PlaylistPlayer() {
  return (
    <div>
      <Header hiddensidebar={true} />
      <div className="p-14 flex ml-2 max-w-screen bg-[#0f0f0f]">
        <div>
          <VideoPlayer videoSrc={videoData.videoFile} className="rounded-full"/>
          <VideoInfoCard videoDetails={videoData} />
          <CommentSection videoId={videoId} />
        </div>
        <SmallVideoCards />
      </div>
    </div>
  )
}

export default PlaylistPlayer