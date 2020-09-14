// window.process = window.process || {};
// window.process.env = { NODE_ENV: "development" };

import React from "react";
import ReactDOM from "react-dom";

import Verne from "./components/Verne";

ReactDOM.render(
  <React.StrictMode>
    <Verne />
  </React.StrictMode>,
  document.getElementById("root")
);
