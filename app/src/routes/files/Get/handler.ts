import { response } from "@libs/api-gateway";
import middy from "@middy/core";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import ApiError from "@libs/api-error";
import s3 from "@services/s3-service"

const GetFileHandler:  Handler<APIGatewayProxyEvent, APIGatewayProxyResult>  = async (event) => {
    const fileKey = event.pathParameters?.fileKey;

    if (!fileKey) {
        throw new ApiError("fileKey is required", 400);
    }

    let expiresIn: number | string | undefined = event.queryStringParameters?.expiresIn || undefined;

    if (expiresIn && typeof expiresIn === "string") {
        expiresIn = parseInt(expiresIn);
        if (isNaN(expiresIn)) {
            throw new ApiError("Invalid expiresIn value", 400);
        }
    }

    const data = await s3.generateGetPreSignedUrl(`${process.env.BUCKET_NAME}-${process.env.STAGE}`, fileKey, expiresIn as number | undefined);

    return response({ signedUrl: data }, 200);
};

export const handler = middy(GetFileHandler).use(catchFinallyHandler());