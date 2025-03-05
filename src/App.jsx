import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import PrivateRoute from "./feature/PrivateRoute";
import VideoThumbnail from "./components/VideoThumbnail";
import VideoPage from "./pages/VideoPage";
import './app.css';
import ThemeSwitcher from "./components/ThemeSwitcher";
import Dashboard from "./pages/Dashboard";
import PlaylistPage from "./pages/PlaylistPage";
import UplaodVideo from "./pages/UploadVideo";
import UploadPost from "./pages/UploadPost";
import Shorts from "./pages/Shorts";
import useNetworkStatus from "./feature/useNetworkStatus";
import ChannelPage from "./pages/ChannelPage";
import ChannelVideoPage from "./pages/ChannelVideoPage";
import ChannelPlaylistPage from "./pages/ChannelPlaylistPage";
import ChannelCommunityPage from "./pages/ChannelCommunityPage";
import Subscriptions from "./pages/Subscriptions";
import YourVideos from "./pages/YourVideos";
import UaerPlaylists from "./pages/UaerPlaylists";

function App() {  
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="absolute top-[35%] left-[40%] text-white flex flex-col justify-center">
        <img
          src="/src/assets/ErrorImg.png"
          alt="You are offline"
          style={{ maxWidth: '20%', maxHeight: '20%' }}
          className="ml-20"
        />
        <h2 className="ml-14">Connect to the Internet</h2>
        <h4>You're offline. Check your connection.</h4>
      </div>
    );
  }

  // If online, show the main app
  return (
    <ThemeSwitcher>
      <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white">
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/shorts" element={<PrivateRoute><Shorts /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/watch/:videoId" element={<PrivateRoute><VideoPage /></PrivateRoute>} />
            <Route path="/feed/you" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/playlist/:playlistId" element={<PrivateRoute><PlaylistPage /></PrivateRoute>} />
            <Route path="/uploads/video" element={<PrivateRoute><UplaodVideo /></PrivateRoute>} />
            <Route path="/user/videos" element={<PrivateRoute><YourVideos /></PrivateRoute>} />
            <Route path="/user/playlists" element={<PrivateRoute><UaerPlaylists /></PrivateRoute>} />
            <Route path="/uploads/post" element={<PrivateRoute><UploadPost /></PrivateRoute>} />
            <Route path="/channel/:username" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
            <Route path="/channel/:username/videos" element={<PrivateRoute><ChannelVideoPage /></PrivateRoute>} />
            <Route path="/channel/:username/playlists" element={<PrivateRoute><ChannelPlaylistPage /></PrivateRoute>} />
            <Route path="/channel/:username/community" element={<PrivateRoute><ChannelCommunityPage /></PrivateRoute>} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/trending" element={<Shorts />} />
            <Route path="/shopping" element={<Shorts />} />
            <Route path="/music" element={<Shorts />} />
            <Route path="/films" element={<Shorts />} />
            <Route path="/live" element={<Shorts />} />
            <Route path="/gaming" element={<Shorts />} />
            <Route path="/news" element={<Shorts />} />
            <Route path="/sport" element={<Shorts />} />
            <Route path="/courses" element={<Shorts />} />
            <Route path="/fashion-&-beauty" element={<Shorts />} />
            <Route path="/podcasts" element={<Shorts />} />
            <Route path="/report-history" element={<Shorts />} />
            <Route path="/help" element={<Shorts />} />
            <Route path="/send-feedback" element={<Shorts />} />
          </Routes>
        </Router>
      </div>
    </ThemeSwitcher>
  );
}

export default App;
