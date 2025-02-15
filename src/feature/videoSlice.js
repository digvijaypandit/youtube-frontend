import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isMiniPlayer: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    toggleMiniPlayer: (state) => {
      state.isMiniPlayer = !state.isMiniPlayer;
    },
  },
});

export const { setPlaying, setCurrentTime, setDuration, toggleMiniPlayer } = videoSlice.actions;
export default videoSlice.reducer;
