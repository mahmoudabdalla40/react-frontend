import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import Home from '../Home';

const RecentActivity = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/course/get');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddOrUpdateCourse = async () => {
    const courseData = { courseName, courseCode: parseInt(courseCode) };

    try {
      if (selectedCourse) {
        await axios.put(`http://localhost:8080/api/v1/course/${selectedCourse.courseId}`, courseData);
      } else {
        await axios.post('http://localhost:8080/api/v1/course/post', courseData);
      }
      fetchCourses();
      setOpen(false);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/course/delete-course/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setCourseName(course.courseName);
    setCourseCode(course.courseCode);
    setOpen(true);
  };

  const handleOpenForm = () => {
    setSelectedCourse(null);
    setCourseName('');
    setCourseCode('');
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Home/>
      {/* <Typography variant="h2" gutterBottom>
        Course Management
      </Typography> */}
      {/* <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Add Course
      </Button> */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.courseId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{course.courseName}</Typography>
                <Typography color="textSecondary">Code: {course.courseCode}</Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small" color="primary" onClick={() => handleEditCourse(course)}>
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDeleteCourse(course.courseId)}>
                  Delete
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleCloseForm} sx={{ minWidth: 400 }}>
        <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            type="text"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Course Code"
            type="number"
            fullWidth
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdateCourse} color="primary">
            {selectedCourse ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RecentActivity;
