import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentsList from './CommentsList';
import * as photoActions from '../../../redux/actions/photoActions';

const PointerContainer = styled.span`
  cursor: pointer;
`;


const Post = ({ initialPostData, likePost }) => {
  const [photo, setPhoto] = useState('');
  const [postData, setPostData] = useState({});

  const getPhotoContent = async (postId) => {
    const photoContent = await photoActions.getPhotoContent(postId);
    setPhoto(photoContent);
  };

  useEffect(() => {
    setPostData(initialPostData);
    const getContent = async () => {
      await getPhotoContent(initialPostData._id);
    };
    getContent();
  }, []);

  const refreshPost = async () => {
    const post = await photoActions.getOnePost(postData._id);
    setPostData(post);
  };

  const onLikePost = () => {
    const { _id, likes } = postData;

    const callback = refreshPost;

    likePost(_id, likes, callback);
  };


  console.log(postData);
  const { likes } = postData;

  return (
    <Card
      style={{ width: '30vw', marginBottom: 50, borderRadius: 20 }}
    >
      <img src={`data:image/jpeg;base64,${photo}`} style={{ width: '100%' }} alt="post" />

      <span style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
        <span>
          <PointerContainer onClick={onLikePost}>
            <span role="img" aria-label="thumbs up">👍</span>
          </PointerContainer>
          {' '}
          {likes}
          {' '}
          likes
        </span>
        <CommentsList />
      </span>
      <Input placeholder="Write a comment" />
      <Button type="primary" style={{ marginTop: 10 }}>Add</Button>
    </Card>
  );
};
Post.propTypes = {
  initialPostData: PropTypes.shape({ _id: PropTypes.string, likes: PropTypes.number }),
  likePost: PropTypes.func,
};

Post.defaultProps = {
  initialPostData: {},
  likePost: () => {},
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  likePost: photoActions.likePost,
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
