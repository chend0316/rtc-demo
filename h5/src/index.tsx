import React from 'react';
import {render} from 'react-dom';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import { CameraPreviewer } from './pages/CameraPreviewer';
import { DeviceList } from './pages/DeviceList';
import { DevPanel } from './pages/DevPanel';
import { Home } from './pages/Home';
import { JoinMeeting } from './pages/JoinMeeting';

function App() {

  return <div>
    <Link to="/deviceList">Device List</Link>
    <Link to="/joinMeeting">Join Meeting</Link>
    <Link to="/camera">camera</Link>
    <Link to="/devPanel">devPanel</Link>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/deviceList' element={<DeviceList />} />
      <Route path='/joinMeeting' element={<JoinMeeting />} />
      <Route path='/camera' element={<CameraPreviewer />} />
      <Route path='/devPanel' element={<DevPanel />} />
    </Routes>
    </div>;
}

const root=document.createElement('div');
document.body.appendChild(root);
render(<HashRouter><App /></HashRouter>, root);
