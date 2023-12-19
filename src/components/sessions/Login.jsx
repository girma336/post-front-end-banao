import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import close from './../../assets/close.png'
import leftImage from './../../assets/lef-image.png';
import {Image} from 'react-bootstrap';
import faceBook from './../../assets/facebook.png'
import google from './../../assets/google.png';
import './Login.css';
import eye from './../../assets/eye.png';
import { clearError, clearSuccessMessage, login } from '../../redux/session/sessionSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = ({setCurrentUser}) => {
  const [modal, setModal] = useState(false);
  const [eyeClick, setEyeClick] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.successMessage);
  const navigate = useNavigate();
 
  
  useEffect(() => {
    return () => {
      dispatch(clearSuccessMessage());
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage); 
      setUsername('');
      setPassword('');
      
      setTimeout(() => {
        navigate('/dashboard'); 
        navigate('/dashboard');
        const curser = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(curser)
      }, 3000);
      
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, navigate, setCurrentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

    const handleClick = (e) => {
      e.preventDefault();
      setModal(!modal);
      navigate('/');
    };

    
  return (
    <div className='sign-up'>
        <div className="sign-in-modal">
            <div role="button" tabIndex={0} onClick={(e) => handleClick(e)} onKeyDown={(e) => handleClick(e)}>
               <img
                src={close}
                alt="close bar"
                className="modal__close"
              />
            </div>
            <div className='header-modal'>
                <p className='header-modal-title'>Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼</p>
            </div>

            <div className="grid-modla">
                <div className="create-accounts">
                   <h1 className='create-account-title'>Sign In</h1>
                   <ToastContainer position="top-right" autoClose={3000} />
                   <div className="form-modal">
                    <form onSubmit={handleLogin} className="form__modal">
                        <div className="form__input-group">
                            <div className="form__input-div">
                                <input
                                type="text"
                                placeholder="username"
                                className="form__control"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                />
                            </div>
                            <div className="form__input-div">
                                <input
                                type={eyeClick ? 'text' : 'password'}
                                placeholder="Password"
                                className="form__control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                                <Image onClick={() => setEyeClick(!eyeClick)} src={eye} className='pass-show' />
                            </div>                             
                        </div>
                        <button type="submit" disabled={loading} className="button-create">
                          Sign In
                        </button>
                    </form>
                   </div>
                  <div>
                   <div className="face-google">
                     <p className="facebook"><Image src={faceBook} style={{marginRight: '10px'}} />{'  '}Sign up with Facebook</p>
                   </div>
                   <div className="face-google">
                     <p className="facebook"><Image src={google} style={{marginRight: '10px'}} /> {'  '}Sign up with Google</p>
                   </div>
                  </div>
                  <div className="forget">
                    <p onClick={() => navigate('/forgot-password')} className="forget-text">Forgot Password?</p>
                  </div>
                </div>
                <div className='image-modal'>
                   <p className='image-header-modal'>Don’t have an account yet? <span onClick={() => navigate('/signup')}>Create new for free!</span></p>
                   <div className="image__contener-div">
                     <Image src={leftImage} />
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login