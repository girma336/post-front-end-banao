import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './CreatePost.css';
import close from './../../assets/close.png'
// import { clearSuccessMessage, signup } from '../../redux/session/sessionSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { clearSuccessMessage, createPost } from '../../redux/session/postSlice';

const CreatePost = () => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const { loading, error, successMessage, } = useSelector((state) => state.post);
   
    const navigate = useNavigate();

    useEffect(() => {
      return () => {
        dispatch(clearSuccessMessage()); 
      };
    }, [dispatch]);
  
    useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        setTitle('')
        setContent('')
        navigate('/dashboard')
      }
      if (error) {
        toast.error(error);
      }
    }, [successMessage, error, navigate]);
    const handleContentChange = (e) => {
        setContent(e.target.value); // Update the content state with the new value
      };
    const handleSignup = (e) => {
      e.preventDefault();
  
      dispatch(createPost({ title, content }));
    };

    const handleClick = (e) => {
      e.preventDefault();
      setModal(!modal);
      navigate('/dashboard')
    };
  return (
    <div className='create-post'>
        <div className="create-post-modal">
            <div role="button" tabIndex={0} onClick={(e) => handleClick(e)} onKeyDown={(e) => handleClick(e)}>
               <img
                src={close}
                alt="close bar"
                className="modal__close"
              />
            </div>
            <div className="grid-modal">
                <div className="create-accounts">
                   <h1 className='create-account-title'>Create Post</h1>
                   <ToastContainer position="top-right" autoClose={3000} />
                   <div className="form-modal">
                    <form className="form__modal" onSubmit={handleSignup}>
                        <div className="form__input-group">
                            <div className="form__input-div">
                                <input
                                type="text"
                                placeholder="Title of Post"
                                className="form__control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                />
                            </div>
                            <div className="form__input-div">
                                <textarea
                                placeholder="Your content"
                                className="form__control textarea"
                                value={content}
                                onChange={handleContentChange}
                                required
                                />
                            </div>                          
                        </div>
                        <button type="submit"  disabled={loading} className="button-create-post">
                        Create post
                        </button>
                    </form>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePost