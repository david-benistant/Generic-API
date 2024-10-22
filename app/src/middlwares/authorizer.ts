import { ErrorsEnum } from '@enums/errors-enums';
import ApiError from '@libs/api-error';
import { verifyToken } from '@libs/jwt';
import { MiddlewareObj } from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';

const authorizer = (): MiddlewareObj<APIGatewayProxyEvent> => {
    
    const before: MiddlewareObj<APIGatewayProxyEvent>['before'] = async (request) => {
        let token = request.event.headers?.Authorization;

        if (!token) {
            console.error('Unauthorized');
            throw new ApiError('Unauthorized', 401, ErrorsEnum.unauthorized);
        }

        const cleanedToken = token.replace('Bearer ', '').replace('bearer ', '').replace('Token ', '');
        verifyToken(cleanedToken);
    };
    return { before };
  };
  export default authorizer;