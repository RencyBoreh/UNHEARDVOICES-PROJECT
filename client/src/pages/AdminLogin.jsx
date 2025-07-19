// src/pages/AdminLogin.jsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, data);
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Invalid credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-pink-100 via-purple-100 to-fuchsia-100 dark:from-purple-950 dark:via-purple-900 dark:to-fuchsia-900 text-purple-900 dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-violet-900 shadow-xl rounded-lg p-6 w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
          Admin Login
        </h2>

        <input
          {...register('username')}
          required
          placeholder="Username"
          className="input"
        />

        <div className="relative">
          <input
            {...register('password')}
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="input pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-purple-600 dark:text-fuchsia-200"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && <p className="text-sm text-pink-600 dark:text-pink-300">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
