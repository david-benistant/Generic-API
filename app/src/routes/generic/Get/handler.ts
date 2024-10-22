import { response } from "@libs/api-gateway";
import middy from "@middy/core";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from "aws-lambda";
import ApiError from "@libs/api-error";
import { getGeneric } from "@repositories/generic-repository";

const GetGenericHandler: Handler<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
> = async (event) => {
    const genericId = event.pathParameters?.genericId;

    if (!genericId) {
        throw new ApiError("GenericId is required", 400);
    }

    const data = await getGeneric(genericId);

    return response(data);
};

export const handler = middy(GetGenericHandler).use(catchFinallyHandler());
