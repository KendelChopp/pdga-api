const SearchableObject = require('./SearchableObject');

class Event extends SearchableObject {
  static DEFAULT_ROUTE = 'event';

  static RESPONSE_KEY = 'events';

  static CLASSIFICATIONS = {
    PRO: 'Pro',
    AM: 'AM',
    PRO_AM: 'Pro-Am'
  };

  /**
   * Searches for events using the SearchableObject search functionality
   *
   * @param {object} options
   * @param {string} [options.tournamentId] ID of the tournament
   * @param {string} [options.eventName] Name of the event
   * @param {string} [options.startDate] Start date of the event in the YYYY-MM-DD format
   * @param {string} [options.endDate] End date of the event in the YYYY-MM-DD format
   * @param {string} [options.country] Two letter country code
   * @param {string} [options.state] Two letter code for the area, region, state, or province code
   * @param {string} [options.province] Two letter code for the area, region, state, or province
   * code
   * @param {string} [options.tier] Comma separated list of tier codes
   * @param {Event.CLASSIFICATION} [options.classification] One of Pro, Am, or Pro-Am
   * @param {number} [options.limit] max of 200
   * @param {number} [options.offset]
   * @returns {Event[]} the events returned by the search
   */
  static async search(options) {
    return super.search(options);
  }
}

module.exports = Event;
