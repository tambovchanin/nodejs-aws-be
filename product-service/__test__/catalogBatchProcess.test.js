import AwsSdkMock from 'aws-sdk-mock';

import catalogBatchProcess from '../handlers/catalogBatchProcess';

let incId = 1;

const databaseMock = {
  createProduct: jest.fn(async (data) => ({
    ...data,
    id: incId++,
  })),
};

const catalogBatchProcessInstance = catalogBatchProcess(databaseMock);

it('creates product for SQS record', async () => {
  const snsPublishMock = jest.fn((params, callback) => callback(null));

  AwsSdkMock.mock('SNS', 'publish', snsPublishMock);

  await catalogBatchProcessInstance({
    Records: [
      {
        body: JSON.stringify({
          stock: 5,
          description: 'Description for Watch 1',
          price: 16,
          image: 'http://example.com/image',
          title: 'Title from the SQS',
        }),
      },
      {
        body: 'Invalid JSON',
      },
      {
        body: JSON.stringify({
          title: 'Invalid Data',
        }),
      },
    ],
  });

  expect(databaseMock.createProduct).lastCalledWith({
    stock: 5,
    description: 'Description for Watch 1',
    price: 16,
    image: 'http://example.com/image',
    title: 'Title from the SQS',
  });

  expect(snsPublishMock.mock.calls[0][0]).toMatchObject({
    Message: 'Products with the following IDs were created 1',
  });
});
