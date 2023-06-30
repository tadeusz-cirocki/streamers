import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemText, Divider, Button, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './StreamerList.css';
import {Link} from 'react-router-dom';

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
            <ListItemText
              primary={
                <Typography variant="body1" component={Link}
                  to={`/streamer/${streamer._id}`} className="streamer-link">
                  {streamer.name}
                </Typography>
              }
              secondary={streamer.platform} />
            <Button size="small" onClick={() => onUpvote(streamer._id)}
              startIcon={<AddIcon />}/>
            <Button size="small" onClick={() => onDownvote(streamer._id)}
              startIcon={<RemoveIcon />}/>
            <span className="vote-count">+ {streamer.upvotes}</span>
            <span className="vote-count">- {streamer.downvotes}</span>
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
