import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../feature/videoSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});
