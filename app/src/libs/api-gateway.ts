import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const response = (
    response: Record<string, unknown>,
    statusCode: number = 200,
  ): APIGatewayProxyResult => ({
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response),
  });