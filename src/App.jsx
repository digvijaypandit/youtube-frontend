import React,{useState} from 'react'
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Header from './components/header/Header'
import VideoPlayer from './components/VideoPlayer'


function App() {

  return (
    <Provider store={store}>
      {/* <Header /> */}
      <VideoPlayer />
      </Provider>
  )
}

export default App