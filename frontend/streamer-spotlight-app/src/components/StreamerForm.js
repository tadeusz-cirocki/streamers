import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import './StreamerForm.css';

const StreamerForm = ({onSubmit, loading}) => {
  const [streamerData, setStreamerData] = useState({
    name: '',
    platform: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setStreamerData({
      ...streamerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(streamerData);
  };

  return (
    <Box className="streamer-form-container">
      <form onSubmit={handleSubmit}>
        <Box className="streamer-form-field">
          <TextField
            name="name"
            label="Streamer's Name"
            value={streamerData.name}
            onChange={handleInputChange}
            fullWidth
            required
            disabled={loading}
          />
        </Box>

        <Box className="streamer-form-field">
          <FormControl fullWidth required disabled={loading}>
            <InputLabel>Streaming Platform</InputLabel>
            <Select
              name="platform"
              value={streamerData.platform}
              onChange={handleInputChange}
            >
              <MenuItem value="Twitch">Twitch</MenuItem>
              <MenuItem value="YouTube">YouTube</MenuItem>
              <MenuItem value="TikTok">TikTok</MenuItem>
              <MenuItem value="Kick">Kick</MenuItem>
              <MenuItem value="Rumble">Rumble</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="streamer-form-field">
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            value={streamerData.description}
            onChange={handleInputChange}
            fullWidth
            required
            disabled={loading}
          />
        </Box>

        <Box className="streamer-form-button-container">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

StreamerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default StreamerForm;
