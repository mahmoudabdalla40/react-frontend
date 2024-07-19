import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Container, Box } from '@mui/material';
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/admin/login', { email, password });
            if (response.status === 200) {
                setSuccess('Login successful! Redirecting...');
                setError('');
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/admin/dashboard'; // Redirect using window.location after delay
                }, 2000); // Wait for 2 seconds before redirecting
            } else {
                setError(response.data || 'Login failed. Please check your credentials.');
                setSuccess('');
            }
        } catch (err) {
            setError(err.response?.data || 'Login failed. Please try again.');
            setSuccess('');
            console.error(err); // Log the error for debugging
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '97vh',
                backgroundImage: 'url("https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600")',
                backdropFilter: 'blur(5px)', // reduced blur for better usability
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        p: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 2,
                        boxShadow: 3,
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h4" gutterBottom>Admin Login</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }} // Add some space between the fields and the button
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default AdminLogin;
