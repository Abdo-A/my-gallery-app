import React from 'react';
import { Popover, Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Comment from './Comment';

const ContentContainer = styled.div`
  max-height:40vh;
  max-width: 40vw;
  overflow:auto;
`;

const CommentsList = ({ comments, onCreateComment }) => {
  const onCreateReply = (parentID, text) => {
    onCreateComment({ text, parentID });
  };

  const content = (
    <ContentContainer>
      {comments.length > 0 ? comments.filter((comment) => comment.parentID === 0).map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onCreateReply={(text) => onCreateReply(comment._id, text)}
          replies={comments.filter((reply) => reply.parentID === comment._id)}
        />
      )) : <p>No comments yet</p>}
    </ContentContainer>
  );

  return (
    <Popover content={content} title="Comments">
      <Button type="primary" shape="circle" icon="message" />
    </Popover>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  onCreateComment: PropTypes.func,
};

CommentsList.defaultProps = {
  comments: [],
  onCreateComment: () => {},
};


export default CommentsList;
