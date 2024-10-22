import { response } from "@libs/api-gateway";
import middy from "@middy/core";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import ApiError from "@libs/api-error";
import s3 from "@services/s3-service"
import authorizer from "@middlwares/authorizer";

const DelFileHandler:  Handler<APIGatewayProxyEvent, APIGatewayProxyResult>  = async (event) => {
    const fileKey = event.pathParameters?.fileKey;

    if (!fileKey) {
        throw new ApiError("fileKey is required", 400);
    }

    await s3.deleteObject(`${process.env.BUCKET_NAME}-${process.env.STAGE}`, fileKey);

    return response({}, 204);
};

export const handler = middy(DelFileHandler).use(authorizer()).use(catchFinallyHandler());