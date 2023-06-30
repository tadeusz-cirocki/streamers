import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Container} from '@mui/material';
import apiService from '../services/apiService';

const StreamerDetails = () => {
  const {streamerId} = useParams();
  const [streamer, setStreamer] = useState(null);

  useEffect(() => {
    // Make an API call to fetch the streamer details based on streamerId
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
    <Container maxWidth="sm">
      <Typography variant="h3">{streamer.name}</Typography>
      <Typography variant="body1">Description: {streamer.description}</Typography>
      <Typography variant="body1">Platform: {streamer.platform}</Typography>
      <Typography variant="body1">
        Image:
        <img
          src={'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png'}
          alt="Streamer" />
      </Typography>
    </Container>
  );
};

export default StreamerDetails;
