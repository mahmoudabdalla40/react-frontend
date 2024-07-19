import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignUpForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isLogin) {
  //     // Login logic
  //     if (email === '' || password === '') {
  //       setError('All fields are required');
  //     } else {
  //       console.log('Logging in:', { email, password });
  //       setError('');
  //     }
  //   } else {
  //     // Sign-up logic
  //     if (username === '' || email === '' || password === '' || confirmPassword === '') {
  //       setError('All fields are required');
  //     } else if (password !== confirmPassword) {
  //       setError('Passwords do not match');
  //     } else {
  //       console.log('Registering:', { username, email, password });
  //       setError('');
  //     }
  //   }
  // };

  const navigator = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const login = () => navigator("/Dashboard")

  return (
    <div className="form-container">
      <form>
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
        <button onClick={login} type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={toggleForm} className="toggle-link">
          {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default LoginSignUpForm;
