const _ = require('lodash');

const Request = require('./Request');

class SearchableObject {
  /**
   * This is the default route to search on. This should be overridden by subclasses.
   *
   * @type {string}
   */
  static DEFAULT_ROUTE = '';

  /**
   * This is the key at which the objects are returned in the response. This should be overridden
   * by subclasses.
   *
   * @type {string}
   */
  static RESPONSE_KEY = '';

  /**
   * This is the key at which the objects unique id is. This should be overridden by subclasses.
   *
   * @type {string}
   */
  static ID_KEY = '';

  constructor(eventOptions) {
    _.forEach(eventOptions, (value, key) => {
      this[_.camelCase(key)] = value;
    });
  }

  /**
   * Performs a search using a request. By default, it will use the DEFAULT_ROUTE unless specified
   *
   * @param {object} options
   * @param {string} route
   * @returns {SearchableObject[]}
   */
  static async search(options, route) {
    const routeToUse = route || this.DEFAULT_ROUTE;
    const response = await Request.search({ route: routeToUse, options });
    return _.map(response[this.RESPONSE_KEY], (tournament) => new this(tournament));
  }
}

module.exports = SearchableObject;
