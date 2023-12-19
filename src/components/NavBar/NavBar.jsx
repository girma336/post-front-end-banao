import React, { useState } from 'react';
import './NavBar.css';
import Logo from './../../assets/logo.webp';
import { IoIosSearch } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md"
import { FaCircle, FaSortDown } from "react-icons/fa";
import { RiRectangleFill } from "react-icons/ri";
import { authenticated } from '../../utils/userSignin';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const currUser = JSON.parse(localStorage.getItem('currentUser'));
const token = localStorage.getItem('authToken');
const NavBar = ({setCurrentUser, currentUser}) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()
  const isAuthenticate = authenticated()
  const handleSinupandIn = () => {
    setToggle(!toggle);
  }
  
  const handleSessionSignup = () => {
    navigate('/signup')
    setToggle(false)
  }

  const handleSessionLogin = () => {
    navigate('/login')
  }

  const handleSessionSignout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    const curser = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(curser)
    setToggle(false)
    toast.success('Signout Successfly')
    setTimeout(() => {
      navigate('/');
      navigate('/'); // Redirect to the '/dashboard' after 3000 milliseconds (3 seconds)
    }, 3000);
    
  }
  
  return (
    <>
    <div className='fixed-position'>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="containers">
        <div>
          <img className="logo" src={Logo} alt="logo of atl" />
        </div>
        <div>
          <div className="search-bar">
            <IoIosSearch className='search-icon' />
            <input placeholder='Search your favorite group in ATG' />
          </div>

        </div>
        <div>
          <p className="create-account">
          {currentUser && token ? (
              <span className="create-account-span">{currentUser.email}</span>
            ) : (
              <>
                Create Account.
                <span className="create-account-span">It's free</span>
              </>
            )}
            <MdOutlineArrowDropDown className='down-icon' onClick={() => handleSinupandIn()}/>
          </p>

        </div>
      </div>
    </div>
    <div className='mobile-header'>
      <div className='header'>
        <div className='rectangel box'><RiRectangleFill style={{ fontSize: '16px' , color: '#868E96'}} /></div>
        <div className='circle box'><FaCircle style={{ fontSize: '14px', marginLeft: '10px', color: '#868E96'}} /></div>
        <div className='triangle box'><FaSortDown style={{ fontSize: '30px', marginLeft: '2px', marginTop: '-13px', color: '#868E96'}} /></div>
      </div>
    </div>
    {toggle && !isAuthenticate && 
      <div className='toogle-btn'>
        <div className='toggle-flex'>
        <span className="create-account-span signin-up" onClick={() => handleSessionSignup()}>Sign Up</span>
        <span className="create-account-span signin-up" onClick={() => handleSessionLogin()}>Sign In</span>
        </div>
      </div>
    }
    {toggle && isAuthenticate && (
      <div className='toogle-btn sign-out'>
      <div className='toggle-flex'>
        <span className="create-account-span signin-up" onClick={() => handleSessionSignout()}>Sign out</span>
      </div>
    </div>
    )}
    </>
  );
};

export default NavBar;