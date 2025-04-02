import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch token from localStorage and sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Fetch user details with token if needed
      axios.get('http://localhost:5000/api/auth/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error('Failed to fetch user data', error);
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, email: userEmail, role } = response.data;

      // Store token in both localStorage and sessionStorage
      localStorage.setItem('token', token);
      sessionStorage.setItem('token', token);

      setUser({ email: userEmail, role });

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', userData);
      const { email, role, token } = response.data;

      // Store token in both localStorage and sessionStorage
      localStorage.setItem('token', token);
      sessionStorage.setItem('token', token);

      setUser({ email, role });

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const logout = () => {
    // Remove token from both localStorage and sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
