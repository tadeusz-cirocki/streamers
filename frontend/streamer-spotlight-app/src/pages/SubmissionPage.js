import React, {useState, useEffect} from 'react';
import StreamerForm from '../components/StreamerForm';
import StreamerList from '../components/StreamerList';
import apiService from '../services/apiService';
import {Typography} from '@mui/material';
import '../styles.css';

const SubmissionPage = () => {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch streamers from the backend on page load
  useEffect(() => {
    const fetchStreamers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getStreamers();
        setStreamers(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error retrieving streamers');
      }
    };

    fetchStreamers();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (streamerData) => {
    try {
      setLoading(true);
      const response = await apiService.submitStreamer(streamerData);
      setStreamers((prevStreamers) => [...(prevStreamers || []), response]);
      setLoading(false);
      setSuccessMessage('Streamer successfully added!');
    } catch (error) {
      setLoading(false);
      setError('Error adding streamer');
    }
  };

  return (
    <div>
      <h1>Streamer Spotlight</h1>

      <h2>Add a Streamer</h2>
      <StreamerForm onSubmit={handleFormSubmit} loading={loading} error={error} />
      {successMessage && (
        <div className="message-container">
          <Typography variant="body2" color="success" className="success-message">
            {successMessage}
          </Typography>
        </div>
      )}
      <h2>Streamer List</h2>
      {loading ? <p>Loading...</p> : <StreamerList streamers={streamers} />}
    </div>
  );
};

export default SubmissionPage;
