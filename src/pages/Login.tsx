import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/commonStyles.css';
import teacherImg from '../assets/teacher.png';
import iconImg from '../assets/icon.png';

const Login: React.FC = () => {
  const [role, setRole] = useState<'Teacher' | 'Student'>('Teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    if (role === 'Student') {
      navigate('/levelmap');
    } else {
      navigate('/dashboard');
    }
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
          >
            Teacher
          </button>
          <button
            type="button"
            className={`toggleButton${role === 'Student' ? ' toggleButtonSelected' : ''}`}
            onClick={() => setRole('Student')}
          >
            Student
          </button>
        </div>
        <h2 className="mainTitle">Login as {role}</h2>
        <form onSubmit={handleSubmit} className="login-form-flex">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="input"
            autoComplete="current-password"
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
