import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Container} from '@mui/material';
import SubmissionPage from './pages/SubmissionPage';
import StreamerDetails from './pages/StreamerDetails';

const App = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<SubmissionPage />} />
          <Route path="/streamer/:streamerId" element={<StreamerDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
