import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Avatar, Grid, Button, Divider, Link } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Home from '../Home';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock data for user profile
    const mockUser = {
      name: 'Mahmoud',
      email: 'mahmoud@gmail.com',
      jobTitle: 'Software Developer',
      bio: 'Passionate software engineer with a love for building intuitive and scalable applications.',
      linkedin: 'https://www.linkedin.com/in/mahmoudabdalla40',
      github: 'https://github.com/mahmoudabdalla40',
    };
    setUser(mockUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Home />
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80 }}>
                {user.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" component="div" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {user.bio}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={1}>
                <Grid item>
                  <Link href={user.linkedin} target="_blank" rel="noopener" underline="hover">
                    LinkedIn
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={user.github} target="_blank" rel="noopener" underline="hover">
                    GitHub
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
