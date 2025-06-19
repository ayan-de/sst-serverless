//We are linking our DynamoDB table to our API using the link prop. This will allow our API to access our table.
import { table } from "./storage";

//We are creating an API using SST’s Api component. It creates an Amazon API Gateway HTTP API.
export const api = new sst.aws.ApiGatewayV2("Api",{
  //By using the transform prop we are telling the API that we want the given props to be applied to all the routes in our API.
  transform: {
    route:{
      handler:{
        //here our lambda function are allowed to access the DynamoDB table
        link:[table],
      }
    }
  }
});

//depending on the endpoint we request, it’ll forward that request to the appropriate Lambda function.
api.route("POST /notes", "packages/functions/src/create.main");
api.route("GET /notes/{id}", "packages/functions/src/get.main");
api.route("GET /notes", "packages/functions/src/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/delete.main");