import RequestError from './RequestError';

export default handler => async event => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  }
  let result;

  const answer = (data, statusCode = 200) => ({
    headers,
    statusCode,
    body: JSON.stringify(data),
  });

  try {
    result = await handler(event);
  } catch (error) {
    if (error instanceof RequestError) {
      return answer({ message: error.message }, error.code);
    }

    return answer({ message: 'Internal Service Error' }, 500);
  }

  return answer(result);
}
