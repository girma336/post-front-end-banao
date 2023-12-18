import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import { authenticated } from './utils/userSignin';
import Login from './components/sessions/Login';
import DashboardPage from './components/dashboard/DashboardPage';
import Signup from './components/sessions/Signup';
import CreatePost from './components/posts/CreatePost'
import DeletePost from './components/posts/DeletePost';
import Likes from './components/posts/Likes';

const App = () => {
  const isAuthenticated = useMemo(() => authenticated(), [])
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/delete/:id" element={<DeletePost />} />
              <Route path="/likes/:id" element={<Likes />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
  );
};

export default App;