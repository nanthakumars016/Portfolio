import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AOSInitializer from "./helpers/AosInitializer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AOSInitializer>
      <App />
    </AOSInitializer>
  </React.StrictMode>
);
