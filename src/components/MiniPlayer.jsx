import { useDispatch, useSelector } from "react-redux";
import { setPlaying, toggleMiniPlayer } from "../feature/videoSlice.js";
import { AiOutlinePauseCircle, AiOutlinePlayCircle, AiOutlineExpand } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const MiniPlayer = ({ videoRef }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.video.isPlaying);

  const togglePlay = () => {
    dispatch(setPlaying(!isPlaying));
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-40 bg-black shadow-lg rounded-md border border-gray-700">
      <div className="relative">
        <video ref={videoRef} className="w-full h-24 object-cover" onClick={togglePlay} />

        <button onClick={togglePlay} className="absolute bottom-2 left-2 text-white text-2xl">
          {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
        </button>

        <button onClick={() => dispatch(toggleMiniPlayer())} className="absolute top-1 left-1 text-white bg-black/50 p-1 rounded-full">
          <AiOutlineExpand size={20} />
        </button>

        <button onClick={() => dispatch(toggleMiniPlayer())} className="absolute top-1 right-1 text-white bg-black/50 p-1 rounded-full">
          <MdClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;
