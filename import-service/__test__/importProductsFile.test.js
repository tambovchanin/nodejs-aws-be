import AwsSdkMock from 'aws-sdk-mock';
import importProductsFile from '../handlers/importProductsFile';

it('Sign URL for uploaded file', async () => {
  const headObjectMock = jest.fn((_p_arams, callback) => {
    callback({ code: 'NotFound' });
  });

  const getSignedUrlMock = jest.fn((operation, params, callback) => {
    callback(null, 'https://s3.aws.com/signed');
  });

  AwsSdkMock.mock('S3', 'headObject', headObjectMock);
  AwsSdkMock.mock('S3', 'getSignedUrl', getSignedUrlMock);

  const result = await importProductsFile({
    queryStringParameters: {
      name: 'test-import.csv',
    },
  });

  expect(result).toStrictEqual({ signedUrl: 'https://s3.aws.com/signed' });
  expect(headObjectMock.mock.calls[0][0]).toStrictEqual({
    Bucket: 'bucket',
    Key: 'uploaded/test-import.csv'
  });
  expect(getSignedUrlMock.mock.calls[0][0]).toBe('putObject');
  expect(getSignedUrlMock.mock.calls[0][1])
      .toStrictEqual({
        Bucket: 'bucket',
        ContentType: 'text/csv',
        Expires: 30,
        Key: 'uploaded/import-import.csv' });
});
