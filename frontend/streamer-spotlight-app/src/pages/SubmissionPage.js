import React, {useState, useEffect} from 'react';
import StreamerForm from '../components/StreamerForm';
import StreamerList from '../components/StreamerList';
import apiService from '../services/apiService';
import {Typography} from '@mui/material';
import './SubmissionPage.css';

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
        setStreamers(response.reverse()); // Reverse because we want the newly added first
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
      setStreamers((prevStreamers) => [response, ...(prevStreamers || [])]);
      setLoading(false);
      setError('');
      setSuccessMessage('Streamer successfully added!');
    } catch (error) {
      setLoading(false);
      setSuccessMessage('');
      setError('Error adding streamer');
    }
  };

  // Handle upvote and downvote
  const handleVote = async (streamerId, voteType) => {
    try {
      const response = await apiService.submitVote(streamerId, voteType);
      setStreamers((prevStreamers) =>
        prevStreamers.map((streamer) =>
          streamer._id === streamerId ?
            {
              ...streamer,
              upvotes: response.upvotes,
              downvotes: response.downvotes,
            } :
            streamer,
        ),
      );
    } catch (error) {
      setError('Error submitting vote');
    }
  };

  const handleUpvote = (streamerId) => {
    handleVote(streamerId, 'upvote');
  };

  const handleDownvote = (streamerId) => {
    handleVote(streamerId, 'downvote');
  };

  return (
    <div>
      <h1 className="streamer-spotlight-heading">Streamer Spotlight</h1>

      <h2 className="add-streamer-heading">Add a Streamer</h2>
      <StreamerForm onSubmit={handleFormSubmit} loading={loading} error={error} />
      {successMessage && (
        <div className="message-container">
          <Typography variant="body2" color="success" className="success-message">
            {successMessage}
          </Typography>
        </div>
      )}
      {error && (
        <div className="message-container">
          <Typography variant="body2" color="error" className="error-message">
            {error}
          </Typography>
        </div>
      )}

      <hr className='horizontal-line' />

      {loading ? <p>Loading...</p> :
        <StreamerList streamers={streamers} onUpvote={handleUpvote} onDownvote={handleDownvote} />
      }
    </div>
  );
};

export default SubmissionPage;
