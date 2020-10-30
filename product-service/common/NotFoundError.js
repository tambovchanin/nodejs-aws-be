export default class NotFoundError extends Error {
  constructor() {
    super('Not Found');
    this.code = 404;
  }
}
