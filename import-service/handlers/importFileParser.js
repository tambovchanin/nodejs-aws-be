import AwsSdk from 'aws-sdk';
import csvParser from 'csv-parser';

const {
  BUCKET_NAME: bucketName,
  PARSED_FOLDER: parsedFilder,
  REGION: region,
  UPLOADED_FOLDER: uploadedFolder,
  SQS_QUEUE_URL: sqsQueueUrl,
} = process.env;

export default async (event) => {
  console.log('importFileParser:', event);

  const { Records: records } = event;

  const s3 = new AwsSdk.S3({ region });
  const sqs = new AwsSdk.SQS();

  const moveFilePromises = records.map(async (record) => {
    const source = record.s3.object.key;
    const destination = parsedFilder + source.slice(uploadedFolder.length);

    await new Promise((resolve, reject) => {
      s3.getObject({
        Bucket: bucketName,
        Key: source,
      })
          .createReadStream()
          .on('error', reject)
          .pipe(csvParser())
          .on('error', reject)
          .on('data', async (data) => {
            console.log('importFileParser data', source, data);

            try {
              await sqs.sendMessage({
                MessageBody: JSON.stringify(data),
                QueueUrl: sqsQueueUrl,
              }).promise();

              console.log('importFileParser SQS data:', source, data);
            } catch (err) {
              console.error('importFileParser SQS error:', source, err);
            }
          })
          .on('end', () => {
            console.log('importFileParser stream finished', source);
            resolve();
          });
    });

    await s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${source}`,
      Key: destination,
    }).promise();

    await s3.deleteObject({
      Bucket: bucketName,
      Key: source,
    }).promise();

    console.log(`importFileParser moved file from ${source} to ${destination}`);
  });

  await Promise.all(moveFilePromises);

  console.log('importFileParser finished');
}
