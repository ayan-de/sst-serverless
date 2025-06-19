import { bucket } from "./storage";

export const myApi = new sst.aws.ApiGatewayV2("Api");

//Here we are creating a simple API with one route, GET /. 
// When this API is invoked, the function called
//handler in packages/functions/src/api.ts will be executed.

//We are also linking an S3 Bucket to our API. This allows the functions in our API to access the bucket.
myApi.route("GET /", {
  link:[bucket],
  handler: "packages/functions/src/api.handler"
})