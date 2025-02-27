import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Removed AuthProvider here since it's redundant with AppProvider */}
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
