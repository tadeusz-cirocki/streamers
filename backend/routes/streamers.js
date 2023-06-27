const express = require('express');
const router = express.Router();
const Streamer = require('../models/streamer');
const {Types: {ObjectId}} = require('mongoose');
const {body, validationResult} = require('express-validator');

// POST /streamers - Handle new streamer submissions
router.post(
    '/',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('platform').notEmpty().withMessage('Platform is required'),
      body('description').notEmpty().withMessage('Description is required'),
    ],
    async (req, res) => {
      try {
      // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()});
        }

        // Extract the submitted data from the request body
        const {name, platform, description} = req.body;

        // Check if the streamer already exists
        const existingStreamer = await Streamer.findOne({name, platform});
        if (existingStreamer) {
          return res.status(400).json({error: 'Streamer already exists'});
        }

        // Create a new streamer record
        const streamer = new Streamer({
          name,
          platform,
          description,
          upvotes: 0,
          downvotes: 0,
        });

        // Save the streamer record in the database
        const savedStreamer = await streamer.save();

        res.status(201).json(savedStreamer);
      } catch (error) {
        console.error('Error creating streamer:', error);
        res.status(500).json({error: 'Internal Server Error'});
      }
    },
);

// GET /streamers - Retrieve all streamer submissions
router.get('/', async (req, res) => {
  try {
    // Retrieve all streamer records from the database
    const streamers = await Streamer.find();

    res.json(streamers);
  } catch (error) {
    console.error('Error retrieving streamers:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// GET /streamers/:streamerId - Retrieve a specific streamer record
router.get('/:streamerId', async (req, res) => {
  try {
    const {streamerId} = req.params;

    // Validate the input ID
    if (!ObjectId.isValid(streamerId)) {
      return res.status(400).json({error: 'Invalid streamer ID'});
    }

    // Retrieve the specified streamer record from the database
    const streamer = await Streamer.findById(streamerId);

    if (!streamer) {
      return res.status(404).json({error: 'Streamer not found'});
    }

    res.json(streamer);
  } catch (error) {
    console.error('Error retrieving streamer:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// PUT /streamers/:streamerId/vote - Handle upvoting/downvoting a streamer
router.put('/:streamerId/vote', async (req, res) => {
  try {
    const {streamerId} = req.params;
    const {voteType} = req.body;

    // Retrieve the specified streamer record from the database
    const streamer = await Streamer.findById(streamerId);

    if (!streamer) {
      return res.status(404).json({error: 'Streamer not found'});
    }

    // Update the vote count based on the voteType (either 'upvote' or 'downvote')
    if (voteType === 'upvote') {
      streamer.upvotes++;
    } else if (voteType === 'downvote') {
      streamer.downvotes++;
    } else {
      return res.status(400).json({error: 'Invalid vote type'});
    }

    // Save the updated streamer record in the database
    await streamer.save();

    res.json(streamer);
  } catch (error) {
    console.error('Error voting for streamer:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
