import React from 'react';
import { Card, Input, Button } from 'antd';
import { connect } from 'react-redux';
import CommentsList from './CommentsList';

const { Meta } = Card;

const Post = ({ isAppLoading }) => {
  console.log(isAppLoading);

  return (
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
};

const mapStateToProps = (state) => ({
  isAppLoading: state.general.isAppLoading,
});

const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
