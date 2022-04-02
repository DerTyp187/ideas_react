import React from 'react';
import IdeaList from './IdeaList';
import IdeaContent from './IdeaContent';
import './css/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App(){

  return (
    <Router>
       
      <div className="App">
        <div className="sidebar">
          <Routes>
            <Route path="/" element={<IdeaList/>} />
            <Route path="/idea/:ideaId" element={<IdeaList/>} />
          </Routes>
        </div>
        <div className="content">
          <Routes>
            <Route path="/idea/:ideaId" element={<IdeaContent/>} />
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
