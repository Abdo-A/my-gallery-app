import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

import Header from './components/Header';
import PostsList from './components/PostsList';
import * as generalActions from './redux/actions/generalActions';

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

const App = ({ isAppLoading, quickInfo, setQuickInfo }) => {
  useEffect(() => {
    console.log('INSODE', quickInfo);
    if (quickInfo) {
      message.info(quickInfo, 1);
      setQuickInfo('');
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
  setQuickInfo: PropTypes.func,
};

App.defaultProps = {
  isAppLoading: false,
  quickInfo: '',
  setQuickInfo: () => {},
};

const mapStateToProps = (state) => ({
  isAppLoading: state.general.isAppLoading,
  quickInfo: state.general.quickInfo,
});

const mapDispatchToProps = {
  setQuickInfo: generalActions.setQuickInfo,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
