
import NotFoundError from '../common/NotFoundError';

export default db => async event => {
  const id = event.queryStringParameters.id;

  const product = db.find(product => product.id === id);

  if (!product) throw new NotFoundError();

  return product;
}
