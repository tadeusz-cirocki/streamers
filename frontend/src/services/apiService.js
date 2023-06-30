import axios from 'axios';

const API_BASE_URL = process.env.SERVER_URL || 'http://localhost:80';

const apiService = {
  submitStreamer: async (streamerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/streamers`, streamerData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a non-2xx status code
        throw new Error(error.response.data.error);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from the server');
      } else {
        // Something else happened while setting up the request
        throw new Error('Failed to submit streamer');
      }
    }
  },

  getStreamers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/streamers`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a non-2xx status code
        throw new Error(error.response.data.error);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from the server');
      } else {
        // Something else happened while setting up the request
        throw new Error('Failed to fetch streamers');
      }
    }
  },

  submitVote: async (streamerId, voteType) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/streamers/${streamerId}/vote`, {voteType});
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit vote');
    }
  },

  getStreamerById: async (streamerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/streamers/${streamerId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a non-2xx status code
        throw new Error(error.response.data.error);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response from the server');
      } else {
        // Something else happened while setting up the request
        throw new Error('Failed to fetch streamer');
      }
    }
  },
};

export default apiService;
