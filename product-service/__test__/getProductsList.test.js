import getProductsList from './getProductsList';

const mockObject = {
  "count": 7,
  "description": "Short Product Description2",
  "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
  "price": 23,
  "title": "Ракета \"Полярные\" 0258",
  "image": "https://raketa.com/wp-content/uploads/2019/07/W-45-17-20-0258_5.jpg"
};

const mockProductList = {
  getProductsList: async () => [mockObject, mockObject, mockObject]
};

const getProductsListHandler = getProductsList(mockProductList);

it('request products list', async () => {
  const list = await getProductsListHandler();

  expect(list).toEqual([mockObject, mockObject, mockObject]);
});
