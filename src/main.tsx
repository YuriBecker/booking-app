import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Loader } from "./components/ui/loader.tsx";
import router from "./router/index.tsx";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/global.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader fixed />} persistor={persistor}>
        <RouterProvider router={router} fallbackElement={<Loader fixed />} />
        <Toaster richColors />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
