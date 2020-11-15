import AwsSdkMock from 'aws-sdk-mock';
import fs from 'fs';
import path from 'path';

import importFileParser from '../handlers/importFileParser';


const fixturePath = path.resolve('./__fixtures__/test-import.csv');

it('Parse, copy and delete object', async () => {
  AwsSdkMock.mock('S3', 'getObject', fs.readFileSync(fixturePath));

  const copyObjectMock = jest.fn((_params, callback) => {
    callback(null);
  });
  AwsSdkMock.mock('S3', 'copyObject', copyObjectMock);

  const deleteObjectMock = jest.fn((_params, callback) => {
    callback(null);
  });
  AwsSdkMock.mock('S3', 'deleteObject', deleteObjectMock);

  const consoleSpy = jest.spyOn(console, 'log');

  const result = await importFileParser({
    Records: [
      {
        s3: {
          object: {
            key: 'uploaded/key',
          },
        },
      },
    ],
  });

  expect(result).toBeUndefined();

  expect(copyObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', CopySource: 'bucket/uploaded/key', Key: 'parsed/key' });

  expect(deleteObjectMock.mock.calls[0][0])
      .toStrictEqual({ Bucket: 'bucket', Key: 'uploaded/key' });

  expect(consoleSpy.mock.calls[1]).toEqual([
    'importFileParser data',
    'uploaded/key',
    {
      count: '1',
      description: 'Watch Description 1',
      price: '11',
      title: 'Watch 1',
      image: 'https://source.unsplash.com/daily/?watch,Description',
    },
  ]);
});
