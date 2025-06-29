import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../styles/commonStyles.css';
import teacherImg from '../assets/teacher.png';
import iconImg from '../assets/icon.png';
import { useAuth } from '../contexts/AuthContext';

// Define the backend server URL
const API_URL = 'http://localhost:5001/api/auth';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'Teacher' | 'Student'>('Teacher');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. Update validation to include name for signup
    if (mode === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // --- SIGNUP LOGIC ---
        // 3. Add 'name' to the signup request payload
        const response = await axios.post(`${API_URL}/signup`, {
          name,
          email,
          password,
          role,
        });
        console.log(response.data.message);
        alert('Signup successful! Please log in to continue.');
        setMode('login');
        // Clear fields after successful signup
        setName('');
        setEmail('');
        setPassword('');

      } else {
        // --- LOGIN LOGIC (No changes here) ---
        const response = await axios.post(`${API_URL}/login`, {
          email,
          password,
          role,
        });
        console.log(response.data.message);
        
        // Save user data to AuthContext
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name || email.split('@')[0],
          role: response.data.user.role,
        };
        
        login(userData);
        
        // Navigate based on role
        if (response.data.user.role === 'Student') {
          navigate('/student-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setName(''); // 4. Clear name field when toggling
    setEmail('');
    setPassword('');
  };

  return (
    <div className="centeredContainer login-flex-bg">
      <div className="card login-card">
        <div className="login-image-wrap">
          <img
            src={role === 'Teacher' ? teacherImg : iconImg}
            alt={role}
            className="login-role-image"
          />
        </div>
        <div className="login-role-toggle">
          <button
            type="button"
            className={`toggleButton${role === 'Teacher' ? ' toggleButtonSelected' : ''}`}
            onClick={() => setRole('Teacher')}
            disabled={loading}
          >
            Teacher
          </button>
          <button
            type="button"
            className={`toggleButton${role === 'Student' ? ' toggleButtonSelected' : ''}`}
            onClick={() => setRole('Student')}
            disabled={loading}
          >
            Student
          </button>
        </div>
        <h2 className="mainTitle">
          {mode === 'login' ? 'Login' : 'Sign Up'} as {role}
        </h2>
        <form onSubmit={handleSubmit} className="login-form-flex">
          {/* 2. Conditionally render the name input field */}
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input"
              autoComplete="name"
              disabled={loading}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input"
            autoComplete={mode === 'login' ? 'username' : 'email'}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            disabled={loading}
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <div className="login-toggle-text">
          <span 
            onClick={toggleMode}
            style={{ 
              fontSize: '12px', 
              color: loading ? '#ccc' : '#666',
              cursor: loading ? 'default' : 'pointer', 
              textDecoration: 'underline',
              marginTop: '10px',
              display: 'block',
              textAlign: 'center'
            }}
          >
            {mode === 'login' ? 'New user? Sign up' : 'Already have an account? Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;