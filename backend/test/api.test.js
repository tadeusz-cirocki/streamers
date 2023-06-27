const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const express = require('express');
const streamersRouter = require('../routes/streamers');
const Streamer = require('../models/streamer');

const {expect} = chai;
chai.use(chaiHttp);

let mongoServer;
let app;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  app = express();
  app.use(express.json());
  app.use('/streamers', streamersRouter);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Streamer.deleteMany();
});

describe('POST /streamers', () => {
  it('should create a new streamer', async () => {
    const newStreamer = {
      name: 'Streamer 1',
      platform: 'Twitch',
      description: 'This is a test streamer.',
    };

    const response = await chai
        .request(app)
        .post('/streamers')
        .send(newStreamer);

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('_id');
    expect(response.body.name).to.equal(newStreamer.name);
    expect(response.body.platform).to.equal(newStreamer.platform);
    expect(response.body.description).to.equal(newStreamer.description);
    expect(response.body.upvotes).to.equal(0);
    expect(response.body.downvotes).to.equal(0);
  });

  it('should return 500 if there is an error creating a streamer', async () => {
    // Simulate an error by not sending the required data
    const invalidStreamer = {};

    const response = await chai
        .request(app)
        .post('/streamers')
        .send(invalidStreamer);

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('error', 'Internal Server Error');
  });
});

describe('GET /streamers', () => {
  it('should retrieve all streamers', async () => {
    await Streamer.create([
      {
        name: 'Streamer 1',
        platform: 'Twitch',
        description: 'This is streamer 1.',
        upvotes: 10,
        downvotes: 5,
      },
      {
        name: 'Streamer 2',
        platform: 'YouTube',
        description: 'This is streamer 2.',
        upvotes: 15,
        downvotes: 3,
      },
    ]);

    const response = await chai.request(app).get('/streamers');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(2);
  });
});

describe('GET /streamers/:streamerId', () => {
  it('should retrieve a specific streamer', async () => {
    const streamer = await Streamer.create({
      name: 'Streamer 1',
      platform: 'Twitch',
      description: 'This is streamer 1.',
      upvotes: 10,
      downvotes: 5,
    });

    const response = await chai
        .request(app)
        .get(`/streamers/${streamer._id}`);

    expect(response).to.have.status(200);
    expect(response.body._id).to.equal(streamer._id.toString());
    expect(response.body.name).to.equal(streamer.name);
    expect(response.body.platform).to.equal(streamer.platform);
    expect(response.body.description).to.equal(streamer.description);
    expect(response.body.upvotes).to.equal(streamer.upvotes);
    expect(response.body.downvotes).to.equal(streamer.downvotes);
  });

  it('should return 400 if the streamer ID is invalid', async () => {
    const invalidStreamerId = 'invalid-id';

    const response = await chai
        .request(app)
        .get(`/streamers/${invalidStreamerId}`);

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error', 'Invalid streamer ID');
  });

  it('should return 404 if the streamer is not found', async () => {
    const nonExistentStreamerId = '60aebc0663be1112a85b8c5c';

    const response = await chai
        .request(app)
        .get(`/streamers/${nonExistentStreamerId}`);

    expect(response).to.have.status(404);
    expect(response.body).to.have.property('error', 'Streamer not found');
  });
});

describe('PUT /streamers/:streamerId/vote', () => {
  it('should upvote a streamer', async () => {
    const streamer = await Streamer.create({
      name: 'Streamer 1',
      platform: 'Twitch',
      description: 'This is streamer 1.',
      upvotes: 10,
      downvotes: 5,
    });

    const response = await chai
        .request(app)
        .put(`/streamers/${streamer._id}/vote`)
        .send({voteType: 'upvote'});

    expect(response).to.have.status(200);
    expect(response.body.upvotes).to.equal(streamer.upvotes + 1);
    expect(response.body.downvotes).to.equal(streamer.downvotes);
  });

  it('should downvote a streamer', async () => {
    const streamer = await Streamer.create({
      name: 'Streamer 1',
      platform: 'Twitch',
      description: 'This is streamer 1.',
      upvotes: 10,
      downvotes: 5,
    });

    const response = await chai
        .request(app)
        .put(`/streamers/${streamer._id}/vote`)
        .send({voteType: 'downvote'});

    expect(response).to.have.status(200);
    expect(response.body.upvotes).to.equal(streamer.upvotes);
    expect(response.body.downvotes).to.equal(streamer.downvotes + 1);
  });

  it('should return 400 if the vote type is invalid', async () => {
    const streamer = await Streamer.create({
      name: 'Streamer 1',
      platform: 'Twitch',
      description: 'This is streamer 1.',
      upvotes: 10,
      downvotes: 5,
    });

    const response = await chai
        .request(app)
        .put(`/streamers/${streamer._id}/vote`)
        .send({voteType: 'invalid'});

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error', 'Invalid vote type');
  });

  it('should return 404 if the streamer is not found', async () => {
    const nonExistentStreamerId = '60aebc0663be1112a85b8c5c';

    const response = await chai
        .request(app)
        .put(`/streamers/${nonExistentStreamerId}/vote`)
        .send({voteType: 'upvote'});

    expect(response).to.have.status(404);
    expect(response.body).to.have.property('error', 'Streamer not found');
  });
});
