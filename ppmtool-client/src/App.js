import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import NavBar from "./components/Layout/Header";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Dashboard />
    </div>
  );
}

export default App;
