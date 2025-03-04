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
            <Route path="/uploads/post" element={<PrivateRoute><UploadPost /></PrivateRoute>} />
            <Route path="/channel/:username" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
            <Route path="/channel/:username/videos" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
            <Route path="/channel/:username/playlists" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
            <Route path="/channel/:username/community" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
          </Routes>
        </Router>
      </div>
    </ThemeSwitcher>
  );
}

export default App;
