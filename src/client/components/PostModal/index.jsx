import React, { useState } from 'react';
import {
  Modal, Select,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as photoActions from '../../redux/actions/photoActions';

const { Option } = Select;

const PostModal = ({
  visible, allTags, closeModal, createPost, getAllPosts,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [chosenTags, setChosenTags] = useState([]);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    if (!selectedFile) {
      return;
    }

    const callback = () => {
      getAllPosts();
      setSelectedFile(null);
      setChosenTags([]);
    };
    const chosenTagIDs = chosenTags.map((tag) => allTags.find((t) => t.name === tag)._id);
    createPost(selectedFile, chosenTagIDs, callback);
    closeModal();
  };

  const noTagsFoundContent = (
    <h4>
      You haven&#39;t added any tags yet
      {' '}
      <span role="img" aria-label="grin">😅</span>
    </h4>
  );

  return (
    <Modal
      title="Post a photo"
      visible={visible}
      closable={false}
      onOk={fileUploadHandler}
      onCancel={closeModal}
    >
      <input type="file" onChange={fileSelectedHandler} />
      <Select
        mode="multiple"
        style={{ width: '100%', marginTop: 10 }}
        placeholder="Select tags"
        onChange={((tags) => setChosenTags(tags))}
        value={chosenTags}
        notFoundContent={noTagsFoundContent}
      >
        {
          allTags.map((tag) => (
            <Option key={tag.name}>{tag.name}</Option>
          ))
        }
      </Select>
    </Modal>
  );
};

PostModal.propTypes = {
  visible: PropTypes.bool,
  allTags: PropTypes.arrayOf(PropTypes.shape({})),
  closeModal: PropTypes.func,
  createPost: PropTypes.func,
  getAllPosts: PropTypes.func,
};

PostModal.defaultProps = {
  visible: false,
  allTags: [],
  closeModal: () => {},
  createPost: () => {},
  getAllPosts: () => {},
};

const mapStateToProps = (state) => ({
  allTags: state.tag.allTags,
});

const mapDispatchToProps = {
  createPost: photoActions.createPost,
  getAllPosts: photoActions.getAllPosts,
};


export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
