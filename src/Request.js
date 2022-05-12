const _ = require('lodash');
const fetch = require('node-fetch');

const BASE_URL = 'https://api.pdga.com/services/json';

/**
 * Request is an internal helper class for making requests
 */
const Request = {
  /**
   * The session name retrieved from logging in
   *
   * @type {string}
   */
  sessionName: null,

  /**
   * The session id retrieved from logging in
   *
   * @type {string}
   */
  sessionId: null,

  /**
   * Make a request without a session id or session name
   *
   * @param {object} options
   * @param {string} [options.route]
   * @param {string} [options.method]
   * @param {string} [options.body] JSON Stringifiied body to send
   * @param {object} [options.headers] Headers to send
   * @returns {Promise<object>}
   */
  makeUnauthenticatedRequest: async ({ route, method, body, headers }) => {
    const response = await fetch(`${BASE_URL}/${route}`, {
      method,
      body,
      headers
    });

    return response.json();
  },

  /**
   * Make a request with the session id and session name
   *
   * @param {object} options
   * @param {string} [options.route]
   * @param {string} [options.method]
   * @param {string} [options.body] JSON Stringifiied body to send
   * @returns {Promise<object>}
   */
  makeAuthenticatedRequest: async ({ route, method, body }) => {
    if (!Request.sessionName || !Request.sessionId) {
      throw new Error('You must authenticate first with login');
    }

    const response = await fetch(`${BASE_URL}/${route}`, {
      method,
      body,
      headers: {
        cookie: `${Request.sessionName}=${Request.sessionId}`
      }
    });

    return response.json();
  },

  /**
   * Performs a search at the route with an authenticated request and converts all of the options
   * into a query string
   *
   * @param {object} options
   * @param {string} [options.route]
   * @param {object} [options.options] the options to convert into a query string
   * @returns {Promise<object>}
   */
  search: async ({ route, options }) => {
    const queryStrings = _.map(options, (value, key) => `${_.snakeCase(key)}=${value}`);
    const queryString = queryStrings.join('&');
    return Request.makeAuthenticatedRequest({
      route: `${route}?${queryString}`,
      method: 'GET'
    })
  },

  /**
   * Login a user using either username/password or a session name
   *
   * @param {object} options
   * @param {string} [options.username]
   * @param {string} [options.password]
   * @param {string} [options.sessionName]
   * @param {string} [options.sessionId]
   */
  login: async ({ username, password, sessionName, sessionId }) => {
    if (sessionName && sessionId) {
      Request.sessionName = sessionName;
      Request.sessionId = sessionId;
    } else if (username && password) {
      const result = await Request.makeUnauthenticatedRequest({
        route: 'user/login',
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      Request.sessionName = result.session_name;
      Request.sessionId = result.sessid;
    } else {
      throw new Error('Must provide email/password or sessionName/sessionId');
    }
  }
};

module.exports = Request;
