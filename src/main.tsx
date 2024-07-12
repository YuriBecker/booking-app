import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { Loader } from "./components/ui/loader.tsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loader fixed />} />
  </React.StrictMode>
);
