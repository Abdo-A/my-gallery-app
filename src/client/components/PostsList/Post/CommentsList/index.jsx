import React from 'react';
import { Popover, Button } from 'antd';
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => {
  const content = (
    <div style={{ maxHeight: '40vh', overflow: 'auto' }}>
      {comments.length > 0 ? comments.map((comment) => (
        <p key={comment._id}>{comment.name}</p>
      )) : <p>No comments yet</p>}
    </div>
  );

  return (
    <Popover content={content} title="Comments">
      <Button type="primary" shape="circle" icon="message" />
    </Popover>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
};

CommentsList.defaultProps = {
  comments: [],
};


export default CommentsList;
