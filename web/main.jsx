import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./components/App.css"

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found for booting react app");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
