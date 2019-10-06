import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentsList from './CommentsList';
import * as photoActions from '../../../redux/actions/photoActions';

const Post = ({ post }) => {
  const [photo, setPhoto] = useState('');

  const getPhotoContent = async (postId) => {
    const photoContent = await photoActions.getPhotoContent(postId);
    setPhoto(photoContent);
  };

  useEffect(() => {
    const getContent = async () => {
      await getPhotoContent(post._id);
    };
    getContent();
  }, []);


  console.log(post);

  return (
    <Card
      style={{ width: '30vw', marginBottom: 50, borderRadius: 20 }}
    >
      <img src={`data:image/jpeg;base64,${photo}`} style={{ width: '100%' }} alt="post" />

      <span style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
        <span>
          <span role="img" aria-label="thumbs up">👍</span>
        &nbsp;3 likes
        </span>
        <CommentsList />
      </span>
      <Input placeholder="Write a comment" />
      <Button type="primary" style={{ marginTop: 10 }}>Add</Button>
    </Card>
  );
};
Post.propTypes = {
  post: PropTypes.shape({ _id: '' }),
};

Post.defaultProps = {
  post: {},
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  getPhotoContent: photoActions.getPhotoContent,
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
