import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.usersTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      name: data.name,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
