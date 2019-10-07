import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentsList from './CommentsList';
import * as photoActions from '../../../redux/actions/photoActions';
import * as commentActions from '../../../redux/actions/commentActions';

const PointerContainer = styled.span`
  cursor: pointer;
`;

const Post = ({ initialPostData, likePost, createComment }) => {
  const [photo, setPhoto] = useState('');
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [currentCommentText, setCurrentCommentText] = useState('');

  const getPhotoContent = async (postId) => {
    const photoContent = await photoActions.getPhotoContent(postId);
    setPhoto(photoContent);
  };
  const getPostComments = (commentIDs) => {
    setComments([]);
    let newComments = [];
    commentIDs.forEach(async (commentID) => {
      const comment = await commentActions.getOneComment(commentID);
      newComments.push(comment);

      // To make sure all indices exist in the array
      newComments = newComments
        .filter(() => true);

      newComments = newComments
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setComments(newComments);
    });
  };

  useEffect(() => {
    setPostData(initialPostData);
    getPostComments(initialPostData.commentIDs);
    const getContent = async () => {
      await getPhotoContent(initialPostData._id);
    };
    getContent();
  }, []);

  const refreshPost = async () => {
    const post = await photoActions.getOnePost(postData._id);

    setPostData(post);
    getPostComments(post.commentIDs);
  };

  const onLikePost = () => {
    const { _id: postId, likes } = postData;
    likePost(postId, likes, refreshPost);
  };

  const onCreateComment = ({ text, parentID }) => {
    if (!text) return;
    const { _id: postId } = postData;
    const callback = () => {
      refreshPost();
      setCurrentCommentText('');
    };

    createComment({ photoID: postId, name: text, parentID: parentID || 0 }, callback);
  };

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
        <CommentsList comments={comments} onCreateComment={onCreateComment} />
      </span>
      <Input placeholder="Type a comment" value={currentCommentText} onChange={(e) => setCurrentCommentText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onCreateComment({ text: currentCommentText })} />
      <Button onClick={onCreateComment} type="primary" style={{ marginTop: 10 }}>Add</Button>
    </Card>
  );
};

Post.propTypes = {
  initialPostData: PropTypes.shape({
    _id: PropTypes.string,
    likes: PropTypes.number,
    commentIDs: PropTypes.arrayOf(PropTypes.string),
  }),
  likePost: PropTypes.func,
  createComment: PropTypes.func,
};

Post.defaultProps = {
  initialPostData: {},
  likePost: () => {},
  createComment: () => {},
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  likePost: photoActions.likePost,
  createComment: commentActions.createComment,
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
