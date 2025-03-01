import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import PredictionForm from './PredictionForm';

function App() {
 
  return (
    <Router>
    <div className="App">
   
      <Routes>

     
      <Route path="/" element={<PredictionForm />} />

        </Routes>
    </div>
    </Router>
  );
}

export default App;
