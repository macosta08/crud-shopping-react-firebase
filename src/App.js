import React from "react";
import { Card } from "./components/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <h1>Shopping</h1>
        <hr />
        <Card />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
