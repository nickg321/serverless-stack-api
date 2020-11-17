import * as dynamoDb from './libs/dynamodb-lib';
import handler from './libs/handler-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.usersTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      name: data.name,
    },
  };

  try {
    await dynamoDb.put(params);

    return params.Item;
  } catch (e) {
    console.log(e.message);
  }
});
