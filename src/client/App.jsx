import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import PropTypes from 'prop-types';

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

const GrayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #0000007a;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = ({ isAppLoading, quickInfo }) => {
  useEffect(() => {
    if (quickInfo) {
      message.info(quickInfo);
    }
  }, [quickInfo]);

  return (
    <Container>
      {
        isAppLoading
        && (
        <GrayContainer>
          <Spin size="large" />
        </GrayContainer>
        )
      }
      <Header />
      <PostsList />
    </Container>
  );
};

App.propTypes = {
  isAppLoading: PropTypes.bool,
  quickInfo: PropTypes.string,
};

App.defaultProps = {
  isAppLoading: false,
  quickInfo: '',
};

const mapStateToProps = (state) => ({
  isAppLoading: state.general.isAppLoading,
  quickInfo: state.general.quickInfo,
});

export default connect(mapStateToProps)(App);
