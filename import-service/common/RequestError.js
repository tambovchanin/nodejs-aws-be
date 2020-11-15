export default class RequestError extends Error {
  constructor(message = 'Request Error') {
    super(message);
    this.code = 400;
  }
}
