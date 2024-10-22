import { response } from "@libs/api-gateway";
import middy from "@middy/core";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import ApiError from "@libs/api-error";
import { listGeneric } from "@repositories/generic-repository";

const ListGenericHandler:  Handler<APIGatewayProxyEvent, APIGatewayProxyResult>  = async (event) => {
    let pageSize: number | string = event.queryStringParameters?.pageSize || "20";
    const page = event.queryStringParameters?.page;

    try {
        pageSize = parseInt(pageSize);
    } catch (error) {
        throw new ApiError("Invalid pageSize", 400);
    }

    if (pageSize < 1) {
        throw new ApiError("Invalid pageSize", 400);
    }

    if (pageSize > 30) {
        throw new ApiError("pageSize must be less than or equal to 30", 400);
    }

    const data = await listGeneric(pageSize, page);

    return response(data);
};

export const handler = middy(ListGenericHandler).use(catchFinallyHandler());