import DbError from './DbError';
import NotFoundError from './NotFoundError';

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
    if (error instanceof NotFoundError) {
      return answer({ message: error.message }, error.code);
    }

    if (error instanceof DbError) {
      return answer({ message: error.message }, error.code);
    }

    return answer({ message: 'Internal Service Error' }, 500);
  }

  return answer(result);
}
