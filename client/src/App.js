import React from 'react';

import {BrowserRouter,Route, Routes} from "react-router-dom"
import Auth from './pages/Auth';
import Home from './pages/Home';
import Landing from './pages/Landing';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/" element={<Landing/>} />
<Route path="/home" element={<Home/>} />
<Route path="/auth" element={<Auth/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
