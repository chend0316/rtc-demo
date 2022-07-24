import React from 'react';
import {render} from 'react-dom';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import { DevPanel } from './pages/DevPanel';
import { Home } from './pages/Home';
import { JoinMeeting } from './pages/JoinMeeting';

function App() {

  return <div>
    <Link to="/">Home</Link>
    <Link to="/joinMeeting">Join Meeting</Link>
    <Link to="/devPanel">devPanel</Link>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/joinMeeting' element={<JoinMeeting />} />
      <Route path='/devPanel' element={<DevPanel />} />
    </Routes>
    </div>;
}

const root=document.createElement('div');
document.body.appendChild(root);
render(<HashRouter><App /></HashRouter>, root);
