import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './Signup.css'; // Import the CSS file for signup

const Signup = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', role: 'user' });
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userData);
  };

  return (
    <div className="container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn--form" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
