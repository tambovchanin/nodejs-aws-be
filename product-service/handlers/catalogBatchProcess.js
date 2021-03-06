import AwsSdk from 'aws-sdk';

const { SNS_TOPIC_ARN: snsTopicArn } = process.env;

export default db => async (event) => {
  console.log('catalogBatchProcess', event);

  const sns = new AwsSdk.SNS();

  const productsCreated = await Promise.all(event.Records.map(async ({ body }) => {
    let title, price, image, description, product;

    console.log('catalogBatchProcess add product', body);

    try {
      ({ title, price, image, description, stock } = JSON.parse(body));
    } catch {
      return console.error('catalogBatchProcess receive invalid JSON entity:', body);
    }

    if (!(title && price && image && description)) {
      return console.error('catalogBatchProcess found invalid data record', body);
    }

    try {
      product = await db.addProduct(body);
    } catch (err) {
      return console.error('catalogBatchProcess failed to create product', err);
    }

    return product;
  }));

  const products = productsCreated.filter(value => value);

  console.log('catalogBatchProcess created products', products);

  const result = await sns.publish({
    Message: `Products with the following IDs were created ${products.map(product => product.id).join(', ')}`,
    MessageAttributes: {
      numOfProducts: {
        DataType: 'Number',
        StringValue: products.length.toString(),
      },
    },
    TopicArn: snsTopicArn,
  }).promise();

  console.log('catalogBatchProcess finished', result);
}
