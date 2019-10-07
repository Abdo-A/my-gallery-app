import React, { useState, useEffect } from 'react';
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

const PostsList = ({ getAllPosts, allPosts, selectedTags }) => {
  const [shownPosts, setShownPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setShownPosts(allPosts);
    } else {
      setShownPosts(allPosts.filter((post) => post.tagIDs && post.tagIDs.split(',').some((tagID) => selectedTags.some((selectedTag) => selectedTag._id === tagID))));
    }
  }, [selectedTags, allPosts]);

  return (
    <Container>
      {
        shownPosts.length > 0 ? shownPosts.map((post) => (
          <Post initialPostData={post} key={post._id} />
        ))
          : (
            <h2>
              No Posts Found
              <span role="img" aria-label="broken-heart">💔</span>
            </h2>
          )
      }
    </Container>
  );
};

PostsList.propTypes = {
  getAllPosts: PropTypes.func,
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
  selectedTags: PropTypes.arrayOf(PropTypes.shape({})),

};

PostsList.defaultProps = {
  getAllPosts: () => {},
  allPosts: [],
  selectedTags: [],
};

const mapStateToProps = (state) => ({
  allPosts: state.photo.allPosts,
  selectedTags: state.tag.selectedTags,
});

const mapDispatchToProps = {
  getAllPosts: photoActions.getAllPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
