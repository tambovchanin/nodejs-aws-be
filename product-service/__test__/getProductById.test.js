import getProductById from '../handlers/getProductById';
import NotFoundError from '../common/NotFoundError';

const mockObject = {
  "count": 7,
  "description": "Short Product Description2",
  "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
  "price": 23,
  "title": "Ракета \"Полярные\" 0258",
  "image": "https://raketa.com/wp-content/uploads/2019/07/W-45-17-20-0258_5.jpg"
};

const mockProduct = {
  getProductById: async (id) => {
    if (id !== '7567ec4b-b10c-48c5-9345-fc73c48a80a2') return;

    return mockObject;
  },
};

const getProductByIdHandler = getProductById(mockProduct);

it('request product by correct ID', async () => {
  const product = await getProductByIdHandler({
    pathParameters: { id: '7567ec4b-b10c-48c5-9345-fc73c48a80a2' }
  });

  expect(product).toEqual(mockObject);
});

it('request product by wrong ID', async () => {
  try {
    const product = await getProductByIdHandler({ pathParameters: { id: 'xxx' } });
  } catch (error) {
    expect(error).toBeInstanceOf(NotFoundError);
  }
});
