import React from 'react';
import { useUser } from '../components/UserContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({ profile: { username: '', role: '' }, token: '' });
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Hello, {user.profile.username}</p>
            <p>Your role is: {user.profile.role}</p>
            
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default AdminDashboard;
