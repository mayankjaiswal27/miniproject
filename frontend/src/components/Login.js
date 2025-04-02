import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container">
      <h2 className="login-title">Log in</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder=""
            name="name"
            required
          />
        </div> */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn--form" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
