// App.js
import React from 'react';
import Home from './Home';
import Register from './Auth/user-registration';
import AdminLogin from './Auth/admin-login';

const App = () => {

  return (
    <div>
      {/* <Home /> */}
      <AdminLogin />
    </div>
  );
};

export default App;
