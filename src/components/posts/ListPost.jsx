import React, { useEffect } from 'react'
import {Card , Button}from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './ListPost.css';
import { clearSuccessMessage} from '../../redux/session/postSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FcLike } from "react-icons/fc";

const ListPost = ({title, content, id, likes}) => {
  const dispatch = useDispatch();

  const { error, successMessage, data } = useSelector((state) => state.post);
  console.log(data?.data?.message);
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
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='card-post'>
        <Card>
        <Card.Header>Post</Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {content}
          </Card.Text>
          <div className="likes"><FcLike onClick={handleClcikLikes} style={{marginRight: '10px'}}/>{' '}{likes.length}</div>
          <Button variant="danger" onClick={handleClcik}>Delete</Button>
        </Card.Body>
        </Card>
      </div>
    </>
    
  )
}

export default ListPost