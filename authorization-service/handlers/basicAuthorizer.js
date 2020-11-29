export default (event, _context, callback) => {
  console.log('basicAuthorizer:', event);

  let isAllowed = true;
  let message = 'Success';

  const {
    type,
    methodArn,
    authorizationToken,
  } = event;

  if (type !== 'TOKEN') return callback('Unauthorized');

  try {
    const authString = Buffer.from(authorizationToken, 'base64').toString('utf-8');
    const [isBasic, token] = authString.split(' ');

    console.log('basicAuthorizer, auth sting', authString);

    if (isBasic !== 'Basic') return callback('Unauthorized');

    const [login, password] = token.split(':');
    const validPassword = process.env[login];

    if (!validPassword || validPassword !== password) {
      isAllowed = false;
      message = 'Provided credentials is incorrect. Access denied';
    }

    const result = {
      principalId: token,
      context: {
        message,
      },
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: isAllowed ? 'Allow' : 'Deny',
            Resource: methodArn,
          },
        ],
      },
    };

    console.log('basicAuthorizer result', JSON.stringify(result));

    return callback(null, result);
  } catch (err) {
    console.error('Error', err);
    callback('Unauthorized');
  }
};
