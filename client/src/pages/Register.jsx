// src/pages/Register.jsx
import { useState } from 'react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" className="w-full p-2 border" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
