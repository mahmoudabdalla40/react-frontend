import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, ContactMail, Book, School } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const menuItems = [

  { text: 'Profile', icon: <Home />, path: '/profile' },
  { text: 'Student', icon: <School />, path: '/student' },
  { text: 'Courses', icon: <ContactMail />, path: '/student-course' },
  { text: 'Exams', icon: <Book />, path: '/exam-list' },

  // { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  // { text: 'Exam results', icon: <ContactMail />, path: '/exam-results' },
  // { text: 'Exam details', icon: <ContactMail />, path: '/exam-details' },
  // { text: 'Exams list', icon: <ContactMail />, path: '/exam-list' },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
