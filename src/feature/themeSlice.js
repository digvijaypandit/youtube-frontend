import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: initialTheme },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", state.theme === "dark");
      localStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      document.documentElement.classList.toggle("dark", action.payload === "dark");
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
