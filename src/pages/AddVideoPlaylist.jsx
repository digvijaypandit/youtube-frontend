import React from 'react'
import Header from '../components/header/Header'
import PlaylistMenu from '../components/PlaylistMenu'

function AddVideoPlaylist() {
  return (
    <div>
        <Header />
        <div className='p-14 max-w-screen bg-[#0f0f0f]'>
          <PlaylistMenu />
        </div>
    </div>
  )
}

export default AddVideoPlaylist