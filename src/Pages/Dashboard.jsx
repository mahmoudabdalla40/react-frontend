// import React from 'react';

// function Dashboard() {
//   return <h1>Welcome to Dashboard </h1>;

  
// }

// export default Dashboard;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ExamList from './ExamList';
import ExamDetail from './ExamDetail';
import UserProfile from './UserProfile';

const Dashboard = () => {
  return (

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/dashboard/exams">Exams</Link>
            </li>
            <li>
              <Link to="/dashboard/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        
        <div className="dashboard-content">
     
        </div>
      </div>
   
  );
};

export default Dashboard;















// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import ExamList from './ExamList';
// import ExamDetail from './ExamDetail';
// import UserProfile from './UserProfile';
// import RecentActivity from './RecentActivity';
// import ExamResults from './ExamResults';

// const Dashboard = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/dashboard">Dashboard</Link></li>
//             <li><Link to="/dashboard/exams">Exams</Link></li>
//             <li><Link to="/dashboard/profile">Profile</Link></li>
//             <li><Link to="/dashboard/activity">Recent Activity</Link></li>
//             <li><Link to="/dashboard/results">Results</Link></li>
//           </ul>
//         </nav>
//         <Routes>
       
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Dashboard;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import ExamList from './ExamList';
// import ExamDetail from './ExamDetail';
// import UserProfile from './UserProfile';
// import RecentActivity from './RecentActivity';
// import ExamResults from './ExamResults';

// const Dashboard = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li><Link to="/dashboard">Dashboard</Link></li>
//             <li><Link to="/dashboard/exams">Exams</Link></li>
//             <li><Link to="/dashboard/profile">Profile</Link></li>
//             <li><Link to="/dashboard/activity">Recent Activity</Link></li>
//             <li><Link to="/dashboard/results">Results</Link></li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route path="/dashboard" element={<div><h1>Welcome to the Dashboard</h1></div>} />
//           <Route path="/dashboard/exams" element={<ExamList />} />
//           <Route path="/dashboard/exams/:examId" element={<ExamDetail />} />
//           <Route path="/dashboard/profile" element={<UserProfile />} />
//           <Route path="/dashboard/activity" element={<RecentActivity />} />
//           <Route path="/dashboard/results" element={<ExamResults />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default Dashboard;
