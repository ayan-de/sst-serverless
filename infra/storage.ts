// Create an S3 bucket
export const bucket = new sst.aws.Bucket('Uploads', {
  cors: {
    // We are allowing all methods to access our API.
    allowMethods: ['GET'],
  },
});

// Create the DynamoDB table
export const table = new sst.aws.Dynamo('Notes', {
  fields: {
    userId: 'string',
    noteId: 'string',
  },
  primaryIndex: { hashKey: 'userId', rangeKey: 'noteId' },
});
