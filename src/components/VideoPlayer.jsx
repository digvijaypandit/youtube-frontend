const VideoPlayer = () => {
  return (
    <div className="w-3xl p-2">
      <iframe
        className="rounded-xl"
        src="https://player.cloudinary.com/embed/?public_id=r1e1w44ujmcy8b5hupxu&cloud_name=dscnfodtk&profile=HLS%20format"
        width="640"
        height="360"
        style={{ height: "auto", width: "100%", aspectRatio: "640 / 360" }} // ✅ Fixed style
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen // ✅ Fixed allowfullscreen
        frameBorder="0" // ✅ Fixed frameborder
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
