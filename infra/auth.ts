import { api } from "./api";
import { bucket } from "./storage";

const region = aws.getRegionOutput().name;

//The CognitoUserPool component creates a Cognito User Pool for us
//We are using the usernames prop to state that we want our users to login with their email
export const userPool = new sst.aws.CognitoUserPool("UserPool", {
  usernames: ["email"],
});

// We are using addClient to create a client for our User Pool.
// We create one for each “client” that’ll connect to it.
export const userPoolClient = userPool.addClient("UserPoolClient");

//The CognitoIdentityPool component creates an Identity Pool.
export const identityPool = new sst.aws.CognitoIdentityPool("IdentityPool", {
  userPools: [
    {
      userPool: userPool.id,
      client: userPoolClient.id,
    },
  ],
  permissions: {
    authenticated: [
      {
        actions: ["s3:*"],
        resources: [
          $concat(
            bucket.arn,
            "/private/${cognito-identity.amazonaws.com:sub}/*"
          ),
        ],
      },
      //We are creating an IAM policy to allow our authenticated users to access our API.
      {
        actions: ["execute-api:*"],
        resources: [
          $concat(
            "arn:aws:execute-api:",
            region,
            ":",
            aws.getCallerIdentityOutput({}).accountId,
            ":",
            api.nodes.api.id,
            "/*/*/*"
          ),
        ],
      },
    ],
  },
});
