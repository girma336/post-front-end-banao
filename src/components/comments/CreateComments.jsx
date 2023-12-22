import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './../posts/CreatePost.css';
import close from './../../assets/close.png'
// import { clearSuccessMessage, signup } from '../../redux/session/sessionSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { clearError, clearSuccessMessage, commentPost } from '../../redux/session/postSlice';
import { authenticated } from '../../utils/userSignin';

const CreateComment = () => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const isAuth = authenticated()
  const { loading, error, successMessage, } = useSelector((state) => state.post);

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
      setText('')
      navigate('/')
    }
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, navigate]);
  const handleContentChange = (e) => {
    setText(e.target.value);
  };
  const handleSignup = (e) => {
    e.preventDefault();

    dispatch(commentPost({ text, id }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setModal(!modal);
    navigate('/')
  };
  return (
    <>
      {isAuth && (
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
                <h1 className='create-account-title'>Thanks for your comment &#x1FAF6;</h1>
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="form-modal">
                  <form className="form__modal" onSubmit={handleSignup}>
                    <div className="form__input-group">
                      <div className="form__input-div">
                        <textarea
                          style={{ marginLeft: '20px' }}
                          placeholder="Put your comment"
                          className="form__control textarea"
                          value={text}
                          onChange={handleContentChange}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="button-create-post">
                      Create Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateComment