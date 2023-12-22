import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../../redux/session/postSlice';
import ListPost from '../posts/ListPost';
import Comment from './Comment';
import { IoArrowBack } from "react-icons/io5";
import { authenticated } from '../../utils/userSignin';

const SinglePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isAuth = authenticated();
  const { data } = useSelector((state) => state.post);
  const datas = data?.data?.post
  useEffect(() => {
    dispatch(getPostById(id))
  }, [dispatch, id]);

  return (
    <>
      {isAuth && (
        <div style={{ position: 'relative' }} className="container">
          <div onClick={() => navigate('/')} style={{ position: 'absolute', top: '5px', left: '-40px', fontSize: '24px' }}><IoArrowBack /></div>
          <ListPost author={datas?.author?.username} key={datas?._id} title={datas?.title} content={datas?.content} comment={datas?.comments} id={datas?._id} likes={datas?.likes} />

          {datas?.comments?.map(comment => (
            <Comment key={comment?._id} author={comment?.author?.username} text={comment?.text} id={comment?._id} />
          ))}
        </div>
      )}
    </>
  )
}

export default SinglePost