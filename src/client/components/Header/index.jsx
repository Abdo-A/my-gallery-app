import React, { useState } from 'react';
import { Button } from 'antd';
import PostModal from '../PostModal';
import AddTag from '../AddTag';

const Header = () => {
  const [postModalVisible, setPostModalVisible] = useState(false);

  const openPostModal = () => {
    setPostModalVisible(true);
  };

  const closePostModal = () => {
    setPostModalVisible(false);
  };

  return (
    <div>
      <Button icon="picture" onClick={openPostModal}>Post a photo</Button>
      <AddTag />
      <PostModal visible={postModalVisible} closeModal={closePostModal} />
    </div>
  );
};

export default Header;
