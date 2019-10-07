import React, { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const Comment = ({ comment, onCreateReply, replies }) => {
  const [replyText, setReplyText] = useState('');

  const onReply = () => {
    onCreateReply(replyText);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <p key={comment._id} style={{ color: '#333', fontWeight: 'bold' }}>{comment.name}</p>
      {
        replies.map((reply) => (
          <p key={reply._id} style={{ marginLeft: 10 }}>{reply.name}</p>
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
