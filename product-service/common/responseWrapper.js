import NotFoundError from './NotFoundError';

export default handler => async event => {
  let result;

  try {
    result = await handler(event);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        statusCode: error.code,
        body: JSON.stringify({ message: error.message }),
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Service Error' }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
