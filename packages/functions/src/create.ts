import * as uuid from 'uuid';
import { Resource } from 'sst';
import { Util } from '@sst-serverless/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event: APIGatewayProxyEvent) => {
  let data = {
    content: '',
    attachment: '',
  };
  if (event.body != null) {
    data = JSON.parse(event.body);
  }
  const params = {
    //Here, Notes in Resource.Notes, is the name of our Table component from the Create a
    //DynamoDB Table in SST chapter. By doing link: [table] earlier in this chapter, we are
    //allowing our API to access our table
    TableName: Resource.Notes.name,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  await dynamoDb.send(new PutCommand(params));
  return JSON.stringify(params.Item);
});
