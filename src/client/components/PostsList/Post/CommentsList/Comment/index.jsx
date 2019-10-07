import React, { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommentText = styled.div`
  color: #333;
  font-weight: bold;
  word-wrap: break-word;
`;

const ReplyText = styled.div`
  margin-left:10px;
  word-wrap: break-word;
`;

const Comment = ({ comment, onCreateReply, replies }) => {
  const [replyText, setReplyText] = useState('');

  const onReply = () => {
    onCreateReply(replyText);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <CommentText key={comment._id}>{comment.name}</CommentText>
      {
        replies.map((reply) => (
          <ReplyText key={reply._id}>{reply.name}</ReplyText>
        ))
      }
      <Input
        placeholder="Type a reply"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onReply()}
      />
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }),
  replies: PropTypes.arrayOf(PropTypes.shape({})),
  onCreateReply: PropTypes.func,
};

Comment.defaultProps = {
  comment: {},
  replies: [],
  onCreateReply: () => {},
};


export default Comment;
