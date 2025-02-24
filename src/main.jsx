import './index.css'
import store from "./store/store.js"; // Import your Redux store
import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
