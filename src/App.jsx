import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import PrivateRoute from "./feature/PrivateRoute";
import VideoThumbnail from "./components/VideoThumbnail";
import VideoPage from "./pages/VideoPage";
import './app.css'
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {  
  return (
    <ThemeSwitcher>
      <div className="bg-white dark:bg-black text-black dark:text-white">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watch/:videoId" element={<VideoPage />} />
          <Route path="/test" element={<VideoThumbnail />} />
        </Routes>
      </Router>
    </div>
    </ThemeSwitcher>
  );
}

export default App;
