import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Profile from './pages/Profile';
import CreateClass from './pages/CreateClass';
import ClassroomDetails from './pages/ClassroomDetails';
import UploadDocument from './pages/UploadDocument';
// @ts-ignore: No types for jsx file
import OptimizedCosmicMap from './screens/student/LevelMapScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-class" element={<CreateClass />} />
        <Route path="/levelmap" element={<OptimizedCosmicMap />} />
        <Route path="/classroom/:id" element={<ClassroomDetails />} />
        <Route path="/upload/:id" element={<UploadDocument />} />
      </Routes>
    </Router>
  );
};

export default App;