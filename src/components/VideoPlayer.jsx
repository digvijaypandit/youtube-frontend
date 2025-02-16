import { useRef, useState, useEffect } from "react";
import {
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
} from "react-icons/ai";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdOutlineTheaters,
  MdOutlineSlowMotionVideo,
} from "react-icons/md";
import {
  BsVolumeUp,
  BsVolumeMute,
  BsSkipStart,
  BsSkipEnd,
} from "react-icons/bs";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const bufferVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("auto");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  const qualityLevels = {
    auto: "https://res.cloudinary.com/dscnfodtk/video/upload/q_auto,f_auto/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "144p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_256,h_144,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "240p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_426,h_240,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "360p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_640,h_360,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "480p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_854,h_480,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "720p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_1280,h_720,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "1080p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_1920,h_1080,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
  };

  const [videoSrc, setVideoSrc] = useState(qualityLevels["auto"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    isPlaying ? video.play() : video.pause();

    const updateProgress = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", updateProgress);

    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleQualityChange = (newQuality) => {
    if (!videoRef.current || !bufferVideoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    const wasPlaying = !videoRef.current.paused;

    setTransitioning(true);
    setSelectedQuality(newQuality);

    const bufferVideo = bufferVideoRef.current;
    bufferVideo.src = qualityLevels[newQuality];
    bufferVideo.currentTime = currentTime;
    bufferVideo.muted = true;
    bufferVideo.playbackRate = playbackSpeed;
    bufferVideo.load();

    bufferVideo.onloadeddata = () => {
      videoRef.current.src = bufferVideo.src;
      videoRef.current.currentTime = currentTime;
      videoRef.current.muted = isMuted;
      videoRef.current.playbackRate = playbackSpeed;

      if (wasPlaying) videoRef.current.play();
      setTransitioning(false);
    };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 10;
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 10;
          break;
        case "KeyM":
          setIsMuted((prev) => !prev);
          break;
        case "KeyF":
          if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen();
            setIsFullscreen(true);
          } else {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
        case "KeyT":
          setTheaterMode((prev) => !prev);
          break;
        case "KeyI":
          setIsMiniPlayer((prev) => !prev);
          break;
        case "BracketRight":
          setPlaybackSpeed((prev) => Math.min(prev + 0.25, 2));
          break;
        case "BracketLeft":
          setPlaybackSpeed((prev) => Math.max(prev - 0.25, 0.5));
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`fixed ${isMiniPlayer ? "bottom-5 right-5 w-80 h-45 shadow-lg" : "inset-0"} ${
        theaterMode ? "max-w-full h-screen" : "max-w-2xl"
      } mx-auto bg-black transition-all rounded-md overflow-hidden`}
    >
      <div className="relative">
        {/* Active Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          className={`w-full h-full object-cover transition-opacity ${
            transitioning ? "opacity-50" : "opacity-100"
          }`}
          onClick={() => setIsPlaying(!isPlaying)}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
          muted={isMuted}
        />

        {/* Buffer Video (Hidden) */}
        <video ref={bufferVideoRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 text-white flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span>Quality:</span>
          <select
            value={selectedQuality}
            onChange={(e) => handleQualityChange(e.target.value)}
            className="bg-gray-700 text-white p-1 rounded"
          >
            <option value="auto">Auto (Best)</option>
            {Object.keys(qualityLevels).map((quality) => (
              <option key={quality} value={quality}>
                {quality.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            videoRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
          className="w-full h-1 bg-red-500 appearance-none cursor-pointer"
        />

        <div className="flex items-center justify-between mt-2">
          <button onClick={() => (videoRef.current.currentTime -= 10)}>
            <BsSkipStart />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
          </button>
          <button onClick={() => (videoRef.current.currentTime += 10)}>
            <BsSkipEnd />
          </button>
          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <BsVolumeMute /> : <BsVolumeUp />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
