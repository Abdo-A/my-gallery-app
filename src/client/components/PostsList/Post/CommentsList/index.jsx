import React from 'react';
import { Popover, Button } from 'antd';

const CommentsList = () => {
  const content = (
    <div>
      <p>Comment</p>
      <p>Comment</p>
    </div>
  );

  return (
    <Popover content={content} title="Comments">
      <Button type="primary" shape="circle" icon="message" />

    </Popover>
  );
};

export default CommentsList;
