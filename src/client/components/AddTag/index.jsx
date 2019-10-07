import React, { useState, useEffect } from 'react';
import {
  Button, Card, Input, Tag, message,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tagActions from '../../redux/actions/tagActions';

const AddTag = ({ allTags, createTag, getAllTags }) => {
  useEffect(() => {
    getAllTags();
  }, []);
  console.log(allTags);
  const [chosenTag, setChosenTag] = useState('');
  const onAddTag = () => {
    if (!chosenTag) { return; }
    if (allTags.some((tag) => tag.name === chosenTag)) {
      message.error('This tag already exists');
      return;
    }
    const callback = () => {
      getAllTags();
      setChosenTag('');
    };
    createTag(chosenTag, callback);
  };

  return (
    <Card style={{ margin: 10, maxWidth: '50vw' }}>
      <h3>Add some of your frequently used tags:</h3>
      <Input placeholder="Type tag name" value={chosenTag} onChange={(e) => setChosenTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onAddTag()} />
      <Button onClick={onAddTag} style={{ marginTop: 10 }}>Add Tag</Button>
      <div>
        {allTags.map((tag) => (
          <Tag color="#108ee9" style={{ margin: 10 }}>{tag.name}</Tag>
        ))}
      </div>
    </Card>
  );
};

AddTag.propTypes = {
  allTags: PropTypes.arrayOf(PropTypes.shape({})),
  createTag: PropTypes.func,
  getAllTags: PropTypes.func,
};

AddTag.defaultProps = {
  allTags: [],
  createTag: () => {},
  getAllTags: () => {},
};


const mapStateToProps = (state) => ({
  allTags: state.tag.allTags,
});

const mapDispatchToProps = {
  getAllTags: tagActions.getAllTags,
  createTag: tagActions.createTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
