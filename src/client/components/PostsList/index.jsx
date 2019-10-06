import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';
import * as photoActions from '../../redux/actions/photoActions';

const Container = styled.div`
  text-align: center;
  display: flex;
  background:#d6e4ff;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  min-height: 100vh;
`;

const PostsList = ({ getAllPosts, allPosts }) => {
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Container>
      {
        allPosts.map((post) => (
          <Post post={post} key={post._id} />
        ))
      }
    </Container>
  );
};

PostsList.propTypes = {
  getAllPosts: PropTypes.func,
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),

};

PostsList.defaultProps = {
  getAllPosts: () => {},
  allPosts: [],
};

const mapStateToProps = (state) => ({
  allPosts: state.photo.allPosts,
});

const mapDispatchToProps = {
  getAllPosts: photoActions.getAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
