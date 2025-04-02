import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Adjust the path if needed

const AdminDashboard = () => {
  const { user } = useAuth(); // Get the user object from context
  const [pendingForms, setPendingForms] = useState([]);
  const [approvedForms, setApprovedForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const token = localStorage.getItem('token'); // Retrieve token directly from localStorage
      console.log('Token:', token); // Debug token value

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const pendingResponse = await axios.get('http://localhost:5000/api/admin/pending-forms', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Pending Forms:', pendingResponse.data); // Debug data

        const approvedResponse = await axios.get('http://localhost:5000/api/admin/approved-forms', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Approved Forms:', approvedResponse.data); // Debug data

        setPendingForms(pendingResponse.data);
        setApprovedForms(approvedResponse.data);
      } catch (error) {
        console.error('Failed to fetch forms', error);
        // Optionally handle error state here
      }
    };

    fetchForms();
  }, []); // Only run once, on mount

  const handleApprove = async (formId) => {
    const token = localStorage.getItem('token'); // Retrieve token directly from localStorage
    console.log('Token for Approve:', token); // Debug token value

    if (!token) {
      console.error('No token found');
      return;
    }

    console.log('Approving Form ID:', formId); // Debug formId

    try {
      // Approve the form
      await axios.post(`http://localhost:5000/api/admin/approve/${formId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch updated forms
      const updatedPendingResponse = await axios.get('http://localhost:5000/api/admin/pending-forms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedApprovedResponse = await axios.get('http://localhost:5000/api/admin/approved-forms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setPendingForms(updatedPendingResponse.data);
      setApprovedForms(updatedApprovedResponse.data);

    } catch (error) {
      console.error('Failed to approve form', error);
      // Optionally handle error state here
    }
  };

  const handleReject = async (formId) => {
    const token = localStorage.getItem('token'); // Retrieve token directly from localStorage
    console.log('Token for Reject:', token); // Debug token value

    if (!token) {
      console.error('No token found');
      return;
    }

    console.log('Rejecting Form ID:', formId); // Debug formId

    try {
      await axios.post(`http://localhost:5000/api/admin/reject/${formId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch updated pending forms
      const updatedPendingResponse = await axios.get('http://localhost:5000/api/admin/pending-forms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setPendingForms(updatedPendingResponse.data);

    } catch (error) {
      console.error('Failed to reject form', error);
      // Optionally handle error state here
    }
  };

  return (
    <div>
      <h1>Pending FIR Forms</h1>
      {pendingForms.length > 0 ? (
        pendingForms.map((form) => (
          <div key={form._id}>
            <p>FIR No: {form.firNo}</p>
            <p>Submitted By: {form.result?.name || 'Unknown'}</p>
            <button onClick={() => handleApprove(form._id)}>Approve</button>
            <button onClick={() => handleReject(form._id)}>Reject</button>
          </div>
        ))
      ) : (
        <p>No pending forms</p>
      )}

      <h1>Approved Forms</h1>
      {approvedForms.length > 0 ? (
        approvedForms.map((form) => (
          <div key={form._id}>
            <p>FIR No: {form.firNo}</p>
            <p>Submitted By: {form.result?.name || 'Unknown'}</p> {/* Ensure this field is populated */}
          </div>
        ))
      ) : (
        <p>No approved forms</p>
      )}
    </div>
  );
};

export default AdminDashboard;
