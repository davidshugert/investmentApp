import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "typeface-roboto";
import Firebase, { FirebaseContext } from "./components/firebase";
const instance: any = new Firebase();

ReactDOM.render(
  <FirebaseContext.Provider value={instance}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
