import { response } from "@libs/api-gateway";
import middy from "@middy/core";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from "aws-lambda";
import ApiError from "@libs/api-error";
import { deleteGeneric } from "@repositories/generic-repository";
import authorizer from "@middlwares/authorizer";

const DelGenericHandler: Handler<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
> = async (event) => {
    const genericId = event.pathParameters?.genericId;

    if (!genericId) {
        throw new ApiError("GenericId is required", 400);
    }

    await deleteGeneric(genericId);

    return response({}, 204);
};

export const handler = middy(DelGenericHandler)
    .use(authorizer())
    .use(catchFinallyHandler());
