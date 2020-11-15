import AwsSdk from 'aws-sdk';
import RequestError from '../common/RequestError';

const {
  BUCKET_NAME: bucketName,
  REGION: region,
  UPLOADED_FOLDER: uploadedFolder,
}= process.env;

export default async (event) => {
  console.log('importProductsFile:', event);

  const { name: fileName } = event.queryStringParameters;

  if (!fileName) {
    throw new RequestError('Missing file name in parameter');
  }

  const key = uploadedFolder + fileName;
  const s3 = new AwsSdk.S3({ region });

  const alreadyExists = await s3.headObject({
    Bucket: bucketName,
    Key: key,
  })
      .promise()
      .then(() => true)
      .catch(error => {
        if (error.code === 'NotFound') {
          return false;
        }

        throw error;
      });

  if (alreadyExists) {
    throw new RequestError('File with given name already exists in bucket');
  }

  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Bucket: bucketName,
    ContentType: 'text/csv',
    Key: key,
    Expires: 30,
  });

  return { signedUrl };
}
