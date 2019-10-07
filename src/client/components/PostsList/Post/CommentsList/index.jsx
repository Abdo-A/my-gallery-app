import React from 'react';
import { Popover, Button } from 'antd';
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => {
  const content = (
    <div>
      {comments.map((comment) => (
        <p key={comment._id}>{comment.name}</p>
      ))}
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
