import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SiteLayout from "./components/SiteLayout";
import Web3Porivder from "./components/Web3Provider";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Web3Porivder>
      <SiteLayout>
        <App />
      </SiteLayout>
    </Web3Porivder>
  </StrictMode>
);
