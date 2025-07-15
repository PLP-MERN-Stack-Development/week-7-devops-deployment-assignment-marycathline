// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<CreatePost editMode={true} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
