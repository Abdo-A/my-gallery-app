import React from 'react';
import { Card, Input, Button } from 'antd';
import CommentsList from './CommentsList';

const { Meta } = Card;

const Post = () => (
  <Card
    style={{ width: '30vw', marginBottom: 50 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" />
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

export default Post;
