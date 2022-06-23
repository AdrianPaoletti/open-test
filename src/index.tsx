import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "./i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WizardContextProvider from "./store/context/WizardContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <WizardContextProvider>
      <App />
    </WizardContextProvider>
  </React.StrictMode>
);

reportWebVitals();
