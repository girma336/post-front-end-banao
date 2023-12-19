import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import Login from './components/sessions/Login';
import DashboardPage from './components/dashboard/DashboardPage';
import Signup from './components/sessions/Signup';
import CreatePost from './components/posts/CreatePost'
import DeletePost from './components/posts/DeletePost';
import Likes from './components/posts/Likes';
import SinglePost from './components/postPage/SinglePost';
import CreateComment from './components/comments/CreateComments';
import ForgotPassword from './components/sessions/ForgotPassword';
import ResatePassword from './components/sessions/ResatePassword';
import Home from './components/home/Home';

const authToken = localStorage.getItem('authToken')
const currUser = JSON.parse(localStorage.getItem('currentUser'));
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(currUser)
  useEffect(() => {
    setIsAuthenticated(!!authToken)
  }, [])
  
  return (
      <BrowserRouter>
        <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResatePassword />} />
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/delete/:id" element={<DeletePost />} />
              <Route path="/likes/:id" element={<Likes />} />
              <Route path="/posts/:id" element={<SinglePost />} />
              <Route path="/comment/:id" element={<CreateComment />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
  );
};

export default App;