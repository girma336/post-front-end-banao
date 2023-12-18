import React, { useEffect } from 'react'
import {Card , Button}from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './ListPost.css';
import { clearSuccessMessage} from '../../redux/session/postSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FcLike } from "react-icons/fc";

const ListPost = ({title, author, comment, content, id, likes, setSinglePost}) => {
  const dispatch = useDispatch();

  const { error, successMessage, data } = useSelector((state) => state.post);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(clearSuccessMessage()); 
    };
  }, [dispatch]);

  useEffect(() => {
    if (data?.data?.message || successMessage) {
      toast.success(data?.data?.message);
    }
    if (error) {
      toast.error(error, {
        className: 'custom-error-toast', 
      });
    }
  }, [successMessage, error, data]);
  const handleClcik = () => {
    navigate(`/delete/${id}`)
  }
  const handleClcikLikes = () => {
    navigate(`/likes/${id}`);
  }

  const handleClcikPost = () => {
    navigate(`/posts/${id}`)
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='card-post' >
        <Card>
        <Card.Header onClick={handleClcikPost}>{author}</Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {content}
          </Card.Text>
          <div style={{ marginTop: '35px'}} className="likes"><p style={{ marginTop: '15px'}} onClick={() => navigate(`/comment/${id}`)}>{comment?.length} comments {' '}</p><FcLike onClick={handleClcikLikes} style={{marginRight: '10px', marginLeft: '20px'}}/>{' '}{likes?.length}</div>
          <Button variant="danger" onClick={handleClcik}>Delete</Button>
        </Card.Body>
        </Card>
      </div>
    </>
    
  )
}

export default ListPost