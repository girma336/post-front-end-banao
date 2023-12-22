import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Likes.css';
import close from './../../assets/close.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { clearError, clearSuccessMessage, likesPost } from '../../redux/session/postSlice';
import { Button}from 'react-bootstrap';

const Likes = () => {
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { error, successMessage, } = useSelector((state) => state.post);
    
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
        navigate('/')
      }
      if (error) {
        toast.error(error);
      }
    }, [successMessage, error, navigate]);

    const handleClick = (e) => {
      e.preventDefault();
      setModal(!modal);
      navigate('/')
    };

    const handleClcikLike = () => {
        dispatch(likesPost(id))
    }
  return (
    <div className='like-post'>
        <div className="like-post-modal">
            <div role="button" tabIndex={0} onClick={(e) => handleClick(e)} onKeyDown={(e) => handleClick(e)}>
               <img
                src={close}
                alt="close bar"
                className="modal__close"
              />
            </div>
            <div className="grid-modal">
                <div className="create-accounts">
                   <h1 className='create-account-title'>Thanks for giving like &#x1F44C;</h1>
                   <ToastContainer position="top-right" autoClose={3000} />
                   <Button variant="primary" onClick={handleClcikLike}>&#x1F450;</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Likes