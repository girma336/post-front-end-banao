import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './../posts/CreatePost.css';
import close from './../../assets/close.png'
import {Image} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import eye from './../../assets/eye.png';
import { clearError, clearSuccessMessage, reset } from '../../redux/session/sessionSlice';

const ResatePassword = () => {
    const [eyeClick, setEyeClick] = useState(false);
    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const resetId = localStorage.getItem('resetToken');
    const { loading, error, successMessage, } = useSelector((state) => state.auth );
   
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
        setPassword('')
        localStorage.removeItem('resetToken');
        // navigate('/login')
      }
      if (error) {
        toast.error(error);
      }
    }, [successMessage, error, navigate]);
   
    const handleSignup = (e) => {
      e.preventDefault();
  
      dispatch(reset({password, resetId}));
      
    };

    const handleClick = (e) => {
      e.preventDefault();
      setModal(!modal);
      navigate('/login')
    };
  return (
    <div className='create-post'>
        <div className="create-post-modal" style={{height: '250px'}}>
            <div role="button" tabIndex={0} onClick={(e) => handleClick(e)} onKeyDown={(e) => handleClick(e)}>
               <img
                src={close}
                alt="close bar"
                className="modal__close"
              />
            </div>
            <div className="grid-modal" >
                <div className="create-accounts">
                   <h1 className='create-account-title'>Reset Password</h1>
                   <ToastContainer position="top-right" autoClose={3000} />
                   <div className="form-modal">
                    <form className="form__modal" onSubmit={handleSignup}>
                        <div className="form__input-group">
                            <div className="form__input-div">
                                <input
                                style={{marginLeft: '20px'}}
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
                        <button type="submit"  disabled={loading} className="button-create-post">
                        Reset Password
                        </button>
                    </form>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResatePassword