import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./views/Root";
import "normalize.css";
import "./theme/variables.scss";
import "./theme/global.scss";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
