import { handler } from "../packages/functions/src/api";
import { bucket } from "./storage";

export const myApi = new sst.aws.ApiGatewayV2("Api");

myApi.route("GET /", {
  link:[bucket],
  handler
})