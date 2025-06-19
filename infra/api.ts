import { bucket } from "./storage";

export const myApi = new sst.aws.ApiGatewayV2("Api");

//Here we are creating a simple API with one route, GET /. 
// When this API is invoked, the function called
//handler in packages/functions/src/api.ts will be executed.
myApi.route("GET /", {
  link:[bucket],
  handler: "packages/functions/src/api.handler"
})