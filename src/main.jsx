import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import themeOptions from "./style/theme.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import "@fontsource-variable/comfortaa";
import { FirestoreProvider } from "./context/FirestoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <AuthProvider>
        <FirestoreProvider>
          <App />
        </FirestoreProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
