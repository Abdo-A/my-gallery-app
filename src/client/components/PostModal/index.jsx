import React, { useState } from 'react';
import {
  Modal,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as photoActions from '../../redux/actions/photoActions';

const PostModal = ({
  visible, closeModal, createPost, getAllPosts,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('profile', selectedFile, selectedFile.name);
    createPost(selectedFile, getAllPosts);
    closeModal();
  };

  return (
    <Modal
      title="Post a photo"
      visible={visible}
      closable={false}
      onOk={fileUploadHandler}
      onCancel={closeModal}
    >
      <input type="file" onChange={fileSelectedHandler} />
    </Modal>
  );
};

PostModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  createPost: PropTypes.func,
  getAllPosts: PropTypes.func,
};

PostModal.defaultProps = {
  visible: false,
  closeModal: () => {},
  createPost: () => {},
  getAllPosts: () => {},
};

const mapDispatchToProps = {
  createPost: photoActions.createPost,
  getAllPosts: photoActions.getAllPosts,
};


export default connect(null, mapDispatchToProps)(PostModal);
