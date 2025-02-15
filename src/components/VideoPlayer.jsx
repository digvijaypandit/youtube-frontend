import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaying, setCurrentTime, setDuration, toggleMiniPlayer } from "../feature/videoSlice.js";
import MiniPlayer from "./MiniPlayer";
import { AiOutlinePlayCircle, AiOutlinePauseCircle, AiOutlineExpand } from "react-icons/ai";
import { MdPictureInPictureAlt } from "react-icons/md";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  
  const { isPlaying, currentTime, isMiniPlayer } = useSelector((state) => state.video);
  
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.currentTime = currentTime; // Restore time
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    const updateProgress = () => {
      dispatch(setCurrentTime(video.currentTime));
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [isPlaying, dispatch]);

  const togglePlay = () => {
    dispatch(setPlaying(!isPlaying));
  };

  return (
    <div className="relative mx-auto flex justify-center bg-black max-w-2xl">
      {!isMiniPlayer ? (
        <>
          <video 
            ref={videoRef} 
            src="https://res.cloudinary.com/dscnfodtk/video/upload/v1737464826/yttghqrsod87fqprzeyp.mp4" 
            className="w-full" 
            onClick={togglePlay} 
            onLoadedMetadata={() => dispatch(setDuration(videoRef.current.duration))}
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white flex items-center gap-4">
            <button onClick={togglePlay} className="text-2xl">
              {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
            </button>

            <button onClick={() => dispatch(toggleMiniPlayer())} className="text-2xl">
              <MdPictureInPictureAlt />
            </button>
          </div>
        </>
      ) : (
        <MiniPlayer videoRef={videoRef} />
      )}
    </div>
  );
};

export default VideoPlayer;
