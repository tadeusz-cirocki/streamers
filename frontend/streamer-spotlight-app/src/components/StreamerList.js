import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemText, Divider} from '@mui/material';

const StreamerList = ({streamers}) => {
  if (!streamers) {
    return null; // Optional: Render null if streamers is not yet available
  }

  if (streamers.length === 0) {
    return null; // Optional: Render null if streamers array is empty
  }

  return (
    <List>
      {streamers.map((streamer) => (
        <React.Fragment key={streamer.id}>
          <ListItem>
            <ListItemText primary={streamer.name}
              secondary={streamer.platform} />
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
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        platform: PropTypes.string.isRequired,
      }),
  ),
};

export default StreamerList;
