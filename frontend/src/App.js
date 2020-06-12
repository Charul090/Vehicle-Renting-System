import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes/Routes';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes />
    </div>
  );
}

export default App;
