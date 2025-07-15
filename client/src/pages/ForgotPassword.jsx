import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'If your email is registered, you’ll receive a reset code.');
    } catch (err) {
      setMessage('Error sending reset email');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your registered email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Code
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
