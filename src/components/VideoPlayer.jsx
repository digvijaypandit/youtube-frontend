import React, { useRef, useState, useEffect } from "react";
import VideoJS from "./VideoJS";
import VideoUI from "./VideoUI";
import './VideoJS.css';

const VideoPlayer = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isCCEnabled, setIsCCEnabled] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [quality, setQuality] = useState("auto");
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [speed, setSpeed] = useState(1); // Default speed is 1x

  const qualityLevels = {
    auto: "https://res.cloudinary.com/dscnfodtk/video/upload/q_auto,f_auto/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "144p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_256,h_144,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "240p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_426,h_240,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "360p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_640,h_360,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "480p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_854,h_480,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "720p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_1280,h_720,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
    "1080p": "https://res.cloudinary.com/dscnfodtk/video/upload/w_1920,h_1080,c_scale/v1737464826/yttghqrsod87fqprzeyp.mp4",
  };

  const videoJsOptions = {
    autoplay: isAutoplay,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: qualityLevels[quality],
        type: "video/mp4",
      },
    ],
    tracks: [
      {
        kind: "captions",
        label: "English",
        src: "https://res.cloudinary.com/dscnfodtk/video/upload/e_video_subtitles:en/v1737464826/yttghqrsod87fqprzeyp.mp4",
        srclang: "en",
      },
    ],
    controlBar: {
      progressControl: true,
      playToggle: true,
      volumePanel: true,
      fullscreenToggle: true,
      subtitlesButton: true,
    },
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const progressWidth = progressBar.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const clickedPercent = (offsetX / progressWidth) * 100;
    const newTime = (clickedPercent / 100) * playerRef.current.duration();
    playerRef.current.currentTime(newTime);
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Create settings button using an SVG
    const settingsButton = player.controlBar.addChild('button', {
      name: 'settingsButton',
      className: 'vjs-settings-button bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg', // Tailwind classes
    });

    // Add an SVG as the button content
    settingsButton.el().innerHTML = `
      <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-19"></use><path d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z" fill="#fff" id="ytp-id-19"></path></svg>
    `;

    settingsButton.on('click', () => {
      setIsSettingsMenuOpen(true); // Open the settings menu when clicked
    });

    // Handle other player events
    player.on("timeupdate", () => setCurrentTime(player.currentTime()));
    player.on("loadedmetadata", () => setDuration(player.duration()));
    player.on("progress", () => {
      const buffered = player.buffered();
      if (buffered.length > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        setBuffered((bufferedEnd / player.duration()) * 100);
      }
    });
  };

  const handleSeek = (newTime) => {
    if (playerRef.current) {
      playerRef.current.currentTime(newTime);
      setCurrentTime(newTime);
    }
  };

  const toggleAutoplay = () => {
    setIsAutoplay((prevState) => !prevState);
  };

  const toggleCC = () => {
    setIsCCEnabled((prevState) => !prevState);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    if (playerRef.current) {
      const newSrc = qualityLevels[newQuality];
      playerRef.current.src([{ src: newSrc, type: "video/mp4" }]);
      playerRef.current.load();
      playerRef.current.play();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (playerRef.current) {
      playerRef.current.playbackRate(newSpeed);
    }
  };

  const renderSettingsMenu = () => (
    <div
      className="absolute top-10 right-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 w-64"
      style={{ zIndex: 9999 }} // Ensure it's on top of everything, even in fullscreen
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the settings menu
    >
      <div className="text-lg font-semibold mb-4">Settings</div>

      {/* Subtitles Toggle */}
      <div className="mb-3">
        <label htmlFor="subtitlesToggle" className="mr-2">Subtitles:</label>
        <input
          type="checkbox"
          id="subtitlesToggle"
          checked={isCCEnabled}
          onChange={toggleCC}
          className="checkbox"
        />
      </div>

      {/* Video Quality Dropdown */}
      <div className="mb-3">
        <label htmlFor="qualitySelect" className="mr-2">Quality:</label>
        <select
          id="qualitySelect"
          value={quality}
          onChange={(e) => handleQualityChange(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          {Object.keys(qualityLevels).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Playback Speed Dropdown */}
      <div className="mb-3">
        <label htmlFor="speedSelect" className="mr-2">Speed:</label>
        <select
          id="speedSelect"
          value={speed}
          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="0.25">0.25x</option>
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">Normal (1x)</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="1.75">1.75x</option>
          <option value="2">2x</option>
        </select>
      </div>

      {/* Sleep Timer */}
      <div className="mb-3">
        <label htmlFor="sleepTimeSelect" className="mr-2">Sleep Timer (minutes):</label>
        <select
          id="sleepTimeSelect"
          onChange={(e) => {
            const sleepTime = parseInt(e.target.value) * 60 * 1000;
            setTimeout(() => {
              playerRef.current.pause();
            }, sleepTime);
          }}
          className="bg-gray-700 text-white p-2 rounded"
        >
          <option value="0">Off</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
        </select>
      </div>

      <button
        className="mt-4 text-blue-500"
        onClick={() => setIsSettingsMenuOpen(false)}
      >
        Close
      </button>
    </div>
  );

  const handleClickOutside = (e) => {
    if (!e.target.closest('.vjs-settings-button') && !e.target.closest('.absolute')) {
      setIsSettingsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div>
      <VideoJS
        options={videoJsOptions}
        onReady={handlePlayerReady}
        ref={playerRef}
      />
      {isSettingsMenuOpen && renderSettingsMenu()}
    </div>
  );
};

export default VideoPlayer;
