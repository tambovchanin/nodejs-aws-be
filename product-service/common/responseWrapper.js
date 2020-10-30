import NotFoundError from './NotFoundError';



export default handler => async event => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  }
  let result;

  const answer = (message, statusCode = 200) => ({
    headers,
    statusCode,
    body: JSON.stringify({ message }),
  });

  try {
    result = await handler(event);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return answer(error.message, error.code);
    }

    return answer('Internal Service Error', 500);
  }

  return answer(result);
}
