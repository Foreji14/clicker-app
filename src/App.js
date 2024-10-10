import React, { useState } from "react";
import Header from "./components/Header";
import Clicker from "./components/Clicker";
import "./App.css";

export default function App() {
  const [title] = useState("My App");

  return (
    <div className="App">
      <Header title={title} />
      <Clicker />
    </div>
  );
}
