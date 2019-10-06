import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Header from './components/Header';
import PostsList from './components/PostsList';

const Container = styled.div`
  text-align: center;
  display: flex;
  background:#d6e4ff;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  min-height: 100vh;
`;

const App = () => (
  <Container>
    <Header />
    <PostsList />
  </Container>
);

export default App;
