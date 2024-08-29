import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./common/header";
import StdList from "./page/home/stdList";

function App() {
  return (
    <div>
      <Header />
      <div>
        <StdList />
      </div>
    </div>
  );
}

export default App;
