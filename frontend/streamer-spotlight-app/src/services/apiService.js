import axios from 'axios';

export const submitStreamer = async (streamerData) => {
  try {
    const response = await axios.post('/streamers', streamerData);
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
};
