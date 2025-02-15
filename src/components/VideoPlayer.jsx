import React, { useRef, useEffect, useState } from "react";
import Plyr from "plyr";
import "plyr-react/plyr.css";

const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const [theaterMode, setTheaterMode] = useState(false);
    const [miniPlayer, setMiniPlayer] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            const player = new Plyr(videoRef.current, {
                controls: [
                    "play-large", "rewind", "play", "fast-forward", "progress",
                    "current-time", "duration", "mute", "volume", "captions",
                    "settings", "fullscreen"
                ],
                seekTime: 10,
                speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
                keyboard: { focused: true, global: true }
            });

            // ✅ YouTube-Like Keyboard Shortcuts
            const handleKeyDown = (e) => {
                if (e.code === "KeyJ") player.rewind(10); // ⏪ 10s Back
                if (e.code === "KeyL") player.forward(10); // ⏩ 10s Forward
                if (e.code === "KeyK") player.togglePlay(); // ▶️ Pause/Play
                if (e.code === "KeyM") player.muted = !player.muted; // 🔇 Mute
                if (e.code === "KeyF") player.fullscreen.toggle(); // 🔲 Fullscreen
                if (e.code === "KeyT") setTheaterMode(!theaterMode); // 🎭 Toggle Theater Mode
                if (e.code === "KeyI") setMiniPlayer(!miniPlayer); // 📺 Toggle Mini Player
            };

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                player.destroy();
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [theaterMode, miniPlayer]);

    return (
        <div className={`relative mx-auto ${theaterMode ? "w-screen h-screen fixed top-0 left-0 bg-black z-50" : "max-w-4xl"}`}>
            {/* 🎛️ YouTube-Style Custom Controls */}
            <div className="flex justify-between p-2 bg-[#1f1f1f]">
                <button onClick={() => setTheaterMode(!theaterMode)} className="px-3 py-1 text-white rounded bg-gray-700 hover:bg-red-600">
                    🎭 Theater Mode (T)
                </button>
                <button onClick={() => setMiniPlayer(!miniPlayer)} className="px-3 py-1 text-white rounded bg-gray-700 hover:bg-red-600">
                    📺 Mini Player (I)
                </button>
            </div>

            {/* 🎥 Video Player */}
            <div className={`border border-gray-700 rounded-lg shadow-lg overflow-hidden ${miniPlayer ? "fixed bottom-4 right-4 w-80 h-44 z-50 bg-black" : ""}`}>
                <video ref={videoRef} className="w-full border-t-2 border-red-600" controls>
                    <source src={src} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default VideoPlayer;
