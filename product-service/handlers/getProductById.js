import NotFoundError from '../common/NotFoundError';

export default db => async event => {
  const { id } = event.queryStringParameters;

  const product = await db.getProductById(id);

  if (!product) throw new NotFoundError();

  return product;
}
