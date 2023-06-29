import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemText, Divider, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StreamerList = ({streamers, onUpvote, onDownvote}) => {
  if (!streamers) {
    return null; // Optional: Render null if streamers is not yet available
  }

  if (streamers.length === 0) {
    return null; // Optional: Render null if streamers array is empty
  }

  return (
    <List>
      {streamers.map((streamer) => (
        <React.Fragment key={streamer._id}>
          <ListItem>
            <ListItemText primary={streamer.name} secondary={streamer.platform} />
            <Button size="small" onClick={() => onUpvote(streamer._id)}
              startIcon={<AddIcon />}/>
            <Button size="small" onClick={() => onDownvote(streamer._id)}
              startIcon={<RemoveIcon />}/>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

StreamerList.propTypes = {
  streamers: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
      }),
  ),
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default StreamerList;
