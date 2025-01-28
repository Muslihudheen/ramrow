import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/index.css";
import App from "./App";
import { ThemeToggleProvider } from "./contexts/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";
import { persistor, store } from "./redux/store"; // Import the store
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeToggleProvider>
          <CssBaseline />
          <Router basename="/admin">
            <App />
          </Router>
        </ThemeToggleProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
