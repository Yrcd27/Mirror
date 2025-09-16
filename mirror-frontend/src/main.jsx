import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./theme.css";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingControls from "./components/FloatingControls";
import { setupSmoothScrolling } from "./utils/scrollUtils";

// Initialize the application
const initApp = () => {
  // Setup smooth scrolling with a small offset for fixed headers
  setupSmoothScrolling(60);
  
  // Render the React application
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
          <FloatingControls />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
