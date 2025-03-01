import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import PredictionForm from './PredictionForm';
import StartPage from './StartPage';

function App() {
 
  return (
    <Router>
    <div className="App">
   
      <Routes>

      <Route path="/" element={<StartPage />} />
      <Route path="/predictform" element={<PredictionForm />} />

        </Routes>
    </div>
    </Router>
  );
}

export default App;
