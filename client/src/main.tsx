import React from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import App from "./App";

// @ts-ignore
import GlobalStyles from "./GlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>
);
