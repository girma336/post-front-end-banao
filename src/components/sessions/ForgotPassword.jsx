import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './../posts/CreatePost.css';
import close from './../../assets/close.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { clearError, clearSuccessMessage, forgot } from '../../redux/session/sessionSlice';

const ForgotPassword = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, error, successMessage, } = useSelector((state) => state.auth );
   
    const navigate = useNavigate();

    useEffect(() => {
      return () => {
        dispatch(clearSuccessMessage()); 
        dispatch(clearError())
      };
    }, [dispatch]);
  
    useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        setEmail('')
        setTimeout(() => {
            navigate('/reset-password')
        }, 3000);
      }
      if (error) {
        toast.error(error);
      }
    }, [successMessage, error, navigate]);
    const handleContentChange = (e) => {
        setEmail(e.target.value); 
      };
    const handleSignup = (e) => {
      e.preventDefault();
  
      dispatch(forgot({email}));
    };

    const handleClick = (e) => {
      e.preventDefault();
      navigate('/reset-password')
      setModal(!modal);
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
                   <h1 className='create-account-title'>Forget Password</h1>
                   <ToastContainer position="top-right" autoClose={3000} />
                   <div className="form-modal">
                    <form className="form__modal" onSubmit={handleSignup}>
                        <div className="form__input-group">
                            <div className="form__input-div">
                                <input
                                style={{marginLeft: '20px'}}
                                type='email'
                                placeholder="Email"
                                className="form__control"
                                value={email}
                                onChange={handleContentChange}
                                required
                                />
                            </div>                          
                        </div>
                        <button type="submit"  disabled={loading} className="button-create-post">
                        forgot password
                        </button>
                    </form>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword