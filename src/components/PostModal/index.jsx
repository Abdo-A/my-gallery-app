import React from 'react';
import {
  Modal, Upload, Button, Icon,
} from 'antd';

const PostModal = ({ visible, closeModal }) => {
  const handleFileUpload = (info) => {
    console.log(info.file);
  };

  return (
    <Modal
      title="Post a photo"
      visible={visible}
      closable={false}
      onOk={closeModal}
      onCancel={closeModal}
    >
      <Upload beforeUpload={() => false} onChange={handleFileUpload} showUploadList={false}>
        <Button>
          <Icon type="upload" />
          {' '}
          Click to Upload
        </Button>
      </Upload>
    </Modal>
  );
};
export default PostModal;
