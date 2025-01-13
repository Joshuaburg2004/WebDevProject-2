import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom";
import AttendanceApp from "./AttendanceApp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        Hello WORLD!
      </header>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AttendanceApp />
  </React.StrictMode>,
  document.getElementById("root")
);

export default App;
