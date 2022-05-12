const Course = require('./Course');
const Event = require('./Event');
const Player = require('./Player');
const Request = require('./Request');

module.exports = {
  Course,
  Event,
  Player,

  login: Request.login
};
