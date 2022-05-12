const SearchableObject = require('./SearchableObject');

class Course extends SearchableObject {
  static DEFAULT_ROUTE = 'course';

  static RESPONSE_KEY = 'courses';

  /**
   * Searches for courses using the SearchableObject search functionality
   *
   * @param {object} options
   * @param {string} [options.courseId] ID of the course
   * @param {string} [options.courseName] Name of the course
   * @param {string} [options.postalCode] Postal code of the course
   * @param {string} [options.city] City the course is in
   * @param {string} [options.country] Two letter country code
   * @param {string} [options.stateProv] The 2-3 character administrative area, region, state, or
   * province code
   * @param {string} [options.latitude] The latitude to search from
   * @param {string} [options.longitude] The longitutde to search from
   * @param {number} [options.limit] max of 200
   * @param {number} [options.offset]
   * @returns {Course[]} the courses returned by the search
   */
  static async search(options) {
    return super.search(options);
  }
}

module.exports = Course;
