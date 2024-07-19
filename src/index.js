import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUpForm from './Pages/LoginSignUpForm';
import Dashboard from './Pages/Dashboard';
import ExamList from './Pages/ExamList';
import UserProfile from './Pages/UserProfile';
import ExamResults from './Pages/ExamResults';
import ExamDetail from './Pages/ExamDetail';
import RecentActivity from './Pages/RecentActivity';
import Student from './Pages/Student';
import UserLogin from './Auth/user-login';
import AdminLogin from './Auth/admin-login';
import UserDashboard from './Auth/user-dashboard';
import Register from './Auth/user-registration';
import Home from './Home';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<LoginSignUpForm />} />
        <Route path='/register' element={<LoginSignUpForm />} />
        <Route path='/exams' element={<ExamList />} />
        <Route path='/exam-details' element={<ExamDetail />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/exam-results' element={<ExamResults />} />


        <Route path='/student' element={<Student />} />  {/* for student */}
        <Route path='/student-course' element={<RecentActivity />} />  {/* for course */}
        <Route path='/exam-list' element={<ExamList />} /> {/* for exam */}

        {/* Authentication*/}
        <Route path="/register" element={<Register />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}

        <Route path="/admin/dashboard" element={<Home />} />


      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
