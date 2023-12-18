import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DashboardPage.css';
import ListPost from '../posts/ListPost';
import { getPosts } from '../../redux/session/postSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.post);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handlePostModal = () => {
    navigate('/create-post')
    dispatch(getPosts());
  };

  return (
    <div className="container">
      <h1 className="post-header">Post lists</h1>
      <div className="grid-posts">
        <div className="grid-left">
          <div onClick={handlePostModal} className="create__btn">
            Create Post
          </div>
        </div>
        <div className="grid-right">
          {data?.data?.posts?.map((data) => (
            <ListPost author={data.author.username} key={data._id} title={data.title} content={data.content} comment={data.comments} id={data._id} likes={data.likes} />
          ))}
          <div style={{ textAlign: 'center' }}>{loading && <div>Loading......</div>}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;