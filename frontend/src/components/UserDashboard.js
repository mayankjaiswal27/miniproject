import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Adjust the path if needed
import './UserDashboard.css'; // Import the CSS file for user dashboard

const UserDashboard = () => {
  const { user } = useAuth(); // Get the user object from context
  const [forms, setForms] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/user/forms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setForms(res.data);
    }).catch(error => {
      console.error('Failed to fetch forms', error);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Your FIR Forms</h1>
      <div className="button-container">
        <Link to="/user/dashboard/file-fir">
          <button className="btn--file-fir">File a New FIR</button>
        </Link>
      </div>
      <div className="dashboard-content">
        {forms.length > 0 ? (
          forms.map((form) => (
            <div key={form.id} className="fir-list-item">
              <p>FIR No: {form.firNo}</p>
              <p>Status: {form.status}</p>
            </div>
          ))
        ) : (
          <p>No FIR forms found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
