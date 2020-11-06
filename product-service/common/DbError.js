export default class DbError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}
