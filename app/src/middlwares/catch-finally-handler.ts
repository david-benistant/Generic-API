import { MiddlewareObj } from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { response } from '@libs/api-gateway';
import ApiError from '@libs/api-error';

const catchFinallyHandler = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult>['onError'] = async (request) => {
    const { error } = request;

    if (error instanceof ApiError) {
      console.error(error);
      request.response = response(
        {
          error: {
            message: error.message,
            httpCode: error.httpCode,
            statusCode: error.statusCode,
            statusKey: error.statusKey,
          },
        },
        error.httpCode,
      );
    } else {
      console.error(error);
      request.response = response(
        {
          error: {
            message: error?.message || 'Internal server error',
            httpCode: 500,
            statusCode: 5000,
            statusKey: 'internalServerError',
          },
        },
        500,
      );
    }
  };


  return { onError };
};

export default catchFinallyHandler;
