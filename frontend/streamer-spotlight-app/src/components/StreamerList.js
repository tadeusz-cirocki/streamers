import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

const StreamerList = ({streamers}) => {
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
      {streamers.length === 0 && (
        <Typography variant="body2" color="textSecondary">
          No streamers found.
        </Typography>
      )}
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
  ).isRequired,
};

export default StreamerList;
