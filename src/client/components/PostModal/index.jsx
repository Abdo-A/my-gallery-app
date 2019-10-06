import React, { useState } from 'react';
import {
  Modal,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as photoActions from '../../redux/actions/photoActions';

const PostModal = ({ visible, closeModal, createPost }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('profile', selectedFile, selectedFile.name);
    createPost(selectedFile);
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
};

PostModal.defaultProps = {
  visible: false,
  closeModal: () => {},
  createPost: () => {},
};

const mapDispatchToProps = {
  createPost: photoActions.createPost,
};


export default connect(null, mapDispatchToProps)(PostModal);
