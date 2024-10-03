import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import CourseDetails from './components/course_details';
import CreateCourse from './components/create-course';
import './index.css';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  // Private Route component to restrict access to authenticated users
  const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isAuth ? children : <Navigate to="/login" />;
  };

  // Redirect to home if already logged in and accessing login or register routes
  const AuthRedirect: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isAuth ? <Navigate to="/home" /> : children;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to home if authenticated */}
        <Route path="/login" element={<AuthRedirect><Login setIsAuth={setIsAuth} /></AuthRedirect>} />
        <Route path="/register" element={<AuthRedirect><Register setIsAuth={setIsAuth} /></AuthRedirect>} />

        {/* Private route for home, details only accessible if authenticated */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/details" element={<PrivateRoute><CourseDetails /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>} />

        {/* Redirect unauthenticated users accessing root to login */}
        <Route path="/" element={<Navigate to={isAuth ? "/home" : "/login"} />} />

        {/* Redirect any invalid routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
