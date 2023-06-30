import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Container, Box} from '@mui/material';
import apiService from '../services/apiService';
import './StreamerDetails.css';

const StreamerDetails = () => {
  const {streamerId} = useParams();
  const [streamer, setStreamer] = useState(null);

  useEffect(() => {
    const fetchStreamerDetails = async () => {
      try {
        const data = await apiService.getStreamerById(streamerId);
        setStreamer(data);
      } catch (error) {
        console.error('Error fetching streamer details:', error);
      }
    };

    fetchStreamerDetails();
  }, [streamerId]);

  if (!streamer) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" className="streamer-container">
      <Box className="streamer-header">
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
          alt="Streamer"
          className="streamer-image"
        />
        <Typography variant="h3" className="streamer-name">
          {streamer.name}
        </Typography>
      </Box>
      <Typography variant="body1" className="streamer-platform">
        <strong>Platform:</strong> {streamer.platform}
      </Typography>
      <Typography variant="body1" className="streamer-description">
        {streamer.description}
      </Typography>
    </Container>
  );
};

export default StreamerDetails;
