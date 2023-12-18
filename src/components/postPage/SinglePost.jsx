import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../../redux/session/postSlice';
import ListPost from '../posts/ListPost';
import Comment from './Comment';
import { IoArrowBack } from "react-icons/io5";

const SinglePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { data } = useSelector((state) => state.post);
  const datas = data?.data?.post
  useEffect(() => {
    dispatch(getPostById(id))
  }, [dispatch, id]);

  return (
    <div style={{ position: 'relative'}} className="container">
        <div onClick={() => navigate('/dashboard')} style={{ position: 'absolute', top: '5px', left: '-40px', fontSize: '24px' }}><IoArrowBack /></div>
        <ListPost author={datas?.author?.username}  key={datas?._id} title={datas?.title} content={datas?.content} comment={datas?.comments} id={datas?._id} likes={datas?.likes} />

        {datas?.comments?.map(comment => (
            <Comment key={comment?._id} author={comment?.author?.username} text={comment?.text} id={comment?._id} />
        ))}
    </div>
  )
}

export default SinglePost