import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import Home from '../Home';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ studentId: '', studentName: '', studentRegistrationNumber: '', courses: [{ courseName: '', courseCode: '' }] });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/student/get-student');
            setStudents(response.data);
        } catch (error) {
            console.error("There was an error fetching the students!", error);
        }
    };

    const handleClickOpen = (student = null) => {
        if (student) {
            setForm({
                studentId: student.studentId,
                studentName: student.studentName,
                studentRegistrationNumber: student.studentRegistrationNumber,
                courses: student.courses || [{ courseName: '', courseCode: '' }]
            });
            setIsEditing(true);
        } else {
            setForm({ studentId: '', studentName: '', studentRegistrationNumber: '', courses: [{ courseName: '', courseCode: '' }] });
            setIsEditing(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCourseChange = (index, e) => {
        const newCourses = form.courses.map((course, i) => {
            if (i === index) {
                return { ...course, [e.target.name]: e.target.value };
            }
            return course;
        });
        setForm({ ...form, courses: newCourses });
    };

    const addCourse = () => {
        setForm({ ...form, courses: [...form.courses, { courseName: '', courseCode: '' }] });
    };

    const removeCourse = (index) => {
        const newCourses = form.courses.filter((_, i) => i !== index);
        setForm({ ...form, courses: newCourses });
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/v1/student/students/${form.studentId}`, form);
            } else {
                await axios.post('http://localhost:8080/api/v1/student/post-student', form);
            }
            fetchStudents();
            handleClose();
        } catch (error) {
            console.error("There was an error saving the student data!", error);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/student/delete-students/${studentId}`);
            if (response.status === 200) {
                console.log(`Student with ID ${studentId} deleted successfully.`);
                fetchStudents();
            } else {
                console.error(`Failed to delete student with ID ${studentId}. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error("There was an error deleting the student!", error);
        }
    };


    return (
        <Container>
            <Home />
            <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
                Add Student
            </Button>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
                {students.map((student) => (
                    <Grid item xs={12} sm={6} md={4} key={student.studentId}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {student.studentName}
                                </Typography>
                                <Typography color="textSecondary">
                                    {student.studentRegistrationNumber}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Courses:
                                </Typography>
                                <ul>
                                    {student.courses.map(course => (
                                        <li key={course.courseId}>
                                            {course.courseName} (Code: {course.courseCode})
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="contained" color="primary" onClick={() => handleClickOpen(student)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(student.studentId)}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? 'Edit Student' : 'Add New Student'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="studentName"
                        label="Student Name"
                        type="text"
                        fullWidth
                        value={form.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="studentRegistrationNumber"
                        label="Student Registration Number"
                        type="text"
                        fullWidth
                        value={form.studentRegistrationNumber}
                        onChange={handleChange}
                    />
                    {form.courses.map((course, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                            <TextField
                                margin="dense"
                                name="courseName"
                                label="Course Name"
                                type="text"
                                fullWidth
                                value={course.courseName}
                                onChange={(e) => handleCourseChange(index, e)}
                            />
                            <TextField
                                margin="dense"
                                name="courseCode"
                                label="Course Code"
                                type="number"
                                fullWidth
                                value={course.courseCode}
                                onChange={(e) => handleCourseChange(index, e)}
                            />
                            <IconButton onClick={() => removeCourse(index)} color="error">
                                <Remove />
                            </IconButton>
                        </div>
                    ))}
                    <Button onClick={addCourse} color="primary" startIcon={<Add />}>
                        Add Course
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Student;
