import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem
} from '@mui/material';
import axios from 'axios';
import Home from '../Home';

const ExamList = () => {
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ examName: '', examCode: '', studentId: '', courseId: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    useEffect(() => {
        fetchExams();
        fetchStudents();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/list-exams');
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/student/get-student');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ examName: '', examCode: '', studentId: '', courseId: '' });
        setIsEdit(false);
        setSelectedExam(null);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (isEdit) {
            try {
                await axios.put(`http://localhost:8080/api/v1/exam/${selectedExam.examId}`, formData);
                fetchExams();
                handleClose();
            } catch (error) {
                console.error('Error updating exam', error);
            }
        } else {
            try {
                await axios.post('http://localhost:8080/api/v1/exam', formData);
                fetchExams();
                handleClose();
            } catch (error) {
                console.error('Error creating exam', error);
            }
        }
    };

    const handleEdit = (exam) => {
        setFormData({
            examName: exam.examName,
            examCode: exam.examCode,
            studentId: exam.student ? exam.student.studentId : '',
            courseId: exam.student && exam.student.courses.length > 0 ? exam.student.courses[0].courseId : ''
        });
        setIsEdit(true);
        setSelectedExam(exam);
        setOpen(true);
    };

    const handleDelete = async (examId) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/delete-exams/${examId}`);
            fetchExams();
        } catch (error) {
            console.error('Error deleting exam', error);
        }
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Home />
            <Grid container spacing={4}>
                {exams.map((exam) => (
                    <Grid item key={exam.examId} xs={12} sm={6} md={4}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {exam.examName}
                                </Typography>
                                <Typography color="textSecondary">
                                    {exam.examCode}
                                </Typography>
                                {exam.student && (
                                    <>
                                        <Typography color="textSecondary">
                                            Student: {exam.student.studentName}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Registration: {exam.student.studentRegistrationNumber}
                                        </Typography>
                                        {exam.student.courses.length > 0 && (
                                            <Typography color="textSecondary">
                                                Course: {exam.student.courses[0].courseName}
                                            </Typography>
                                        )}
                                    </>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleEdit(exam)}>Edit</Button>
                                <Button size="small" color="secondary" onClick={() => handleDelete(exam.examId)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add New Exam
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
                <DialogTitle>{isEdit ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Exam Name"
                        name="examName"
                        value={formData.examName}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Exam Code"
                        name="examCode"
                        value={formData.examCode}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Student"
                        name="studentId"
                        select
                        value={formData.studentId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    >
                        {students.map((student) => (
                            <MenuItem key={student.studentId} value={student.studentId}>
                                {student.studentName} - {student.studentRegistrationNumber}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Course"
                        name="courseId"
                        select
                        value={formData.courseId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        disabled={!formData.studentId}
                    >
                        {formData.studentId && students
                            .find((student) => student.studentId === formData.studentId)
                            ?.courses.map((course) => (
                                <MenuItem key={course.courseId} value={course.courseId}>
                                    {course.courseName} - {course.courseCode}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ExamList;
