import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './DeletePost.css';
import close from './../../assets/close.png'
// import { clearSuccessMessage, signup } from '../../redux/session/sessionSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { clearSuccessMessage, deletePost } from '../../redux/session/postSlice';
import { Button } from 'react-bootstrap';
import { authenticated } from '../../utils/userSignin';

const DeletePost = () => {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAuth = authenticated();
  const { error, successMessage, } = useSelector((state) => state.post);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearSuccessMessage());
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

  const handleClcikDelete = () => {
    dispatch(deletePost(id))
  }
  return (
    <>
      {isAuth && (
        <div className='delete-post'>
          <div className="delete-post-modal">
            <div role="button" tabIndex={0} onClick={(e) => handleClick(e)} onKeyDown={(e) => handleClick(e)}>
              <img
                src={close}
                alt="close bar"
                className="modal__close"
              />
            </div>
            <div className="grid-modal">
              <div className="create-accounts">
                <h1 className='create-account-title'>Are you sure ?</h1>
                <ToastContainer position="top-right" autoClose={3000} />
                <Button variant="danger" onClick={handleClcikDelete}>Delete</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default DeletePost