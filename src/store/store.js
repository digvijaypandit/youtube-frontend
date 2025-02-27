import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import themeReducer from "../feature/themeSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;