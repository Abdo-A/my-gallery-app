import React, { useState, useEffect } from 'react';
import {
  Button, Card, Input, Tag, message,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tagActions from '../../redux/actions/tagActions';

const AddTag = ({
  allTags, selectedTags, createTag, getAllTags, setSelectedTags,
}) => {
  useEffect(() => {
    getAllTags();
  }, []);

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

  const onClickTag = (tag) => {
    if (selectedTags.some((selectedTag) => selectedTag._id === tag._id)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag._id !== tag._id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Card style={{ margin: 10, maxWidth: '50vw' }}>
      <h3>Add some of your frequently used tags:</h3>
      <Input placeholder="Type tag name" value={chosenTag} onChange={(e) => setChosenTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onAddTag()} />
      <Button onClick={onAddTag} style={{ marginTop: 10 }}>Add Tag</Button>
      <div>
        {allTags.map((tag) => {
          const isTagSelected = selectedTags.some((selectedTag) => selectedTag._id === tag._id);
          return (
            <Tag color={isTagSelected ? '#f50' : '#108ee9'} style={{ margin: 10 }} key={tag._id} onClick={() => onClickTag(tag)}>
              {tag.name}
              {isTagSelected ? '✔' : '⬜' }
            </Tag>
          );
        })}
      </div>
      <h5 style={{ color: '#b7b5b5' }}>
        Hint:
        {' '}
        <b>Click on a tag to show posts related to it</b>
      </h5>
    </Card>
  );
};

AddTag.propTypes = {
  allTags: PropTypes.arrayOf(PropTypes.shape({})),
  selectedTags: PropTypes.arrayOf(PropTypes.shape({})),
  createTag: PropTypes.func,
  getAllTags: PropTypes.func,
  setSelectedTags: PropTypes.func,
};

AddTag.defaultProps = {
  allTags: [],
  selectedTags: [],
  createTag: () => {},
  getAllTags: () => {},
  setSelectedTags: () => {},
};


const mapStateToProps = (state) => ({
  allTags: state.tag.allTags,
  selectedTags: state.tag.selectedTags,
});

const mapDispatchToProps = {
  getAllTags: tagActions.getAllTags,
  createTag: tagActions.createTag,
  setSelectedTags: tagActions.setSelectedTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
