const SearchableObject = require('./SearchableObject');

class Player extends SearchableObject {
  static DEFAULT_ROUTE = 'players';

  static RESPONSE_KEY = 'players';

  static CLASSES = {
    AMATEUR: 'A',
    PRO: 'P'
  };

  /**
   * NOTE: Using this terminology to match that of the PDGA API.
   */
  static GENDERS = {
    FEMALE: 'F',
    MALE: 'M'
  }

  /**
   * Searches for players using the SearchableObject search functionality
   *
   * @param {object} options
   * @param {string} [options.pdgaNumber] Player's PDGA Number
   * @param {string} [options.firstName]
   * @param {string} [options.lastName]
   * @param {Player.CLASSES} [options.class] Either P or A for pro or amateur
   * @param {string} [options.city] Two letter country code
   * @param {string} [options.stateProv] The 2-3 character administrative area, region, state, or
   * province code
   * @param {number} [options.limit] max of 200
   * @param {number} [options.offset]
   * @returns {Player[]} the players returned by the search
   */
  static async search(options) {
    return super.search(options);
  }

  /**
   * Searches for player statistics using the SearchableObject search functionality
   *
   * @param {object} options
   * @param {string} [options.pdgaNumber] Player's PDGA Number
   * @param {string} [options.divisionName]
   * @param {string} [options.divisionCode]
   * @param {Player.CLASSES} [options.class] Either P or A for pro or amateur
   * @param {string} [options.continent] Two letter continent code
   * @param {string} [options.country] Two letter country code
   * @param {string} [options.stateProv] The 2-3 character administrative area, region, state, or
   * province code
   * @param {string} [options.lastModified] in the YYYY-MM-DD format
   * @param {number} [options.limit] max of 200
   * @param {number} [options.offset]
   * @returns {Player[]} the players with statistics from the search
   */
  static async searchStats(options) {
    return super.search(options, 'player-statistics');
  }

  /**
   * Grabs the stats for the player
   * NOTE: The returned Player is a new object, this does not modify in-place
   *
   * @returns {Player}
   */
  async getStats() {
    const players = await Player.searchStats({ pdgaNumber: this.pdgaNumber });
    // Right now we assume that there is a 1:1 mapping between pdga numbers and stats returned
    // by the search
    const stats = players[0];
    return stats;
  }
}

module.exports = Player;
