import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';

const LoginSignUpForm = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email === '' || password === '') {
        setError('All fields are required');
      } else {
        console.log('Logging in:', { email, password });
        setError('');
      }
    } else {
      if (username === '' || email === '' || password === '' || confirmPassword === '') {
        setError('All fields are required');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        console.log('Registering:', { username, email, password });
        setError('');
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        {error && <p>{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={toggleForm} className="toggle-link">
          {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default LoginSignUpForm;
