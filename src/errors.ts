/** @format */

/**
 * Error returned when the REST API returned an
 * unauthorized status code.
 */
export class AuthenticationError extends Error {
  constructor() {
    super();
  }
}
