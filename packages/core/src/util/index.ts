// • We are creating a handler function that we’ll use as a wrapper around our Lambda functions.
// • It takes our Lambda function as the argument.
// • We then run the Lambda function in a try/catch block.
// • On success, we take the result and return it with a 200 status code.
// • If there is an error then we return the error message with a 500 status code.
// • Exporting the whole thing inside a Util module allows us import it as Util.handler. It also
// lets us put other util functions in this module in the future.
import { Context, APIGatewayProxyEvent } from "aws-lambda";
export module Util {
  export function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: number;
      try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        console.error(error);
        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }
      // Return HTTP response
      return {
        body,
        statusCode,
      };
    };
  }
}
