import React from 'react';
import {Typography} from '@mui/material';

const StreamerDetails = () => {
  return (
    <div>
      <Typography variant="h3">Streamer Name</Typography>
      <Typography variant="body1">Description: Streamer description goes here.</Typography>
      <Typography variant="body1">Platform: Streaming platform goes here.</Typography>
      <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png" alt="Streamer" />
    </div>
  );
};

export default StreamerDetails;
