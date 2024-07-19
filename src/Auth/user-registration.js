import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const Register = () => {
    const [studentName, setstudentName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/http://localhost:8080/api/v1/student/post-student', { studentName });
            if (response.data.success) {
                setSuccess('Registration successful. You can now log in.');
                navigate('/user/login');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>Register</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <TextField
                label="studentName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={studentName}
                onChange={(e) => setstudentName(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
            </Button>
        </form>
    );
};

export default Register;
