import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const UserLogin = () => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', { userName });
            if (response.data.success) {
                navigate.push('/user/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>User Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </form>
    );
};

export default UserLogin;
