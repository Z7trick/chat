import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";

import store from "./redux/store/store";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
