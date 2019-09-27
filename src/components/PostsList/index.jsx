import React from 'react';
import styled from 'styled-components';
import Post from './Post';

const Container = styled.div`
  text-align: center;
  display: flex;
  background:#d6e4ff;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  min-height: 100vh;
`;

const PostsList = () => (
  <Container>
    <Post />
    <Post />
    <Post />
  </Container>
);

export default PostsList;
