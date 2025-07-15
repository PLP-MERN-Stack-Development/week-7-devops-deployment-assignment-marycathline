// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <div>
        <Link to="/" className="font-bold text-lg">MERN Blog</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>Hello, {user.username}</span>
            <Link to="/create">New Post</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
