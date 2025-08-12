//We want them to access our S3 bucket and API.
// /Both of which we are importing from api.ts and storage.ts respectively.

import { api } from './api';
import { bucket } from './storage';

const region = aws.getRegionOutput().name;

//The CognitoUserPool component creates a Cognito User Pool for us
//We are using the usernames prop to state that we want our users to login with their email
export const userPool = new sst.aws.CognitoUserPool('UserPool', {
  usernames: ['email'],
});

// We are using addClient to create a client for our User Pool.
// We create one for each “client” that’ll connect to it.
export const userPoolClient = userPool.addClient('UserPoolClient');

//The CognitoIdentityPool component creates an Identity Pool.
export const identityPool = new sst.aws.CognitoIdentityPool('IdentityPool', {
  userPools: [
    {
      userPool: userPool.id,
      client: userPoolClient.id,
    },
  ],
  permissions: {
    authenticated: [
      {
        //Amazon API Gateway has a format it uses to define its endpoints.We are building that here.
        actions: ['s3:*'],
        resources: [
          $concat(
            bucket.arn,
            '/private/${cognito-identity.amazonaws.com:sub}/*'
          ),
        ],
      },
      //In the above policy we are granting our logged in users access to the path
      //private/${cognito-identity.amazonaws.com:sub}/ within our S3 bucket’s ARN. Where
      //cognito-identity.amazonaws.com:sub is the authenticated user’s federated identity id (their
      //user id). So a user has access to only their folder within the bucket. This allows us to separate access
      //to our user’s file uploads within the same S3 bucket.
      //We are creating an IAM policy to allow our authenticated users to access our API.
      {
        actions: ['execute-api:*'],
        resources: [
          $concat(
            'arn:aws:execute-api:',
            region,
            ':',
            aws.getCallerIdentityOutput({}).accountId,
            ':',
            api.nodes.api.id,
            '/*/*/*'
          ),
        ],
      },
    ],
  },
});
