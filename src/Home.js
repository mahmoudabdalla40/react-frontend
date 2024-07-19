import Sidebar from "./Sidebar";
import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { teal } from '@mui/material/colors';

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleDrawerOpen = () => {
        setSidebarOpen(true);
    };

    const handleDrawerClose = () => {
        setSidebarOpen(false);
    };

    return (
        <div>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                {/* AppBar */}
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: teal[600], // Custom color for AppBar
                        boxShadow: 3, // Add some shadow for elevation
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                            sx={{ mr: 2 }} // Add margin to the right
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                            Home
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Sidebar */}
                <Sidebar open={sidebarOpen} onClose={handleDrawerClose} />

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: 8,
                        p: 3,
                        backgroundColor: '#f5f5f5', // Light background color for content area
                        minHeight: '10vh',
                    }}
                >
                    {/* You can add content or components here */}
                    <Container maxWidth="lg">
                        <Typography variant="h4" gutterBottom style={{ color: '#333' }}>
                            Welcome to Student Exams Management System
                        </Typography>
                        <Typography variant="body1" paragraph style={{ color: '#333' }}>
                            Our Student Management System provides a comprehensive solution for managing student data and academic activities. With a user-friendly interface and powerful features, you can efficiently handle student records, track academic progress, and streamline administrative tasks.
                        </Typography>
                        {/* <Typography variant="body1" paragraph>
                            Explore the various functionalities of the system, including student enrollment, course management, attendance tracking, and performance reporting. Our platform is designed to support both administrators and educators in delivering high-quality educational experiences.
                        </Typography> */}
                        {/* <Typography variant="body1" paragraph>
                            Get started by navigating through the different sections of the application to discover tools and features that will help you manage your students effectively.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you need assistance or have any questions, please refer to our help documentation or contact support for further assistance.
                        </Typography> */}
                    </Container>
                </Box>
            </Box>
        </div>
    );
}

export default Home;
