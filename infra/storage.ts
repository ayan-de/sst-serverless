// Create an S3 bucket
export const bucket = new sst.aws.Bucket('Uploads', {
  cors: {
    // Allow the local dev frontend to access objects in the bucket.
    // Include common methods and allow necessary headers so browser preflight (OPTIONS)
    // succeeds when fetching objects from the app running at http://localhost:5173.
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    allowOrigins: ['http://localhost:5173'],
    allowHeaders: ['*'],
    exposeHeaders: ['ETag'],
    maxAge: '3000 seconds',
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
