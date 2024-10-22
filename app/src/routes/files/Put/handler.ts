import {
    response,
    ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { CreateFile } from "./schema";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import s3 from "@services/s3-service"
import ApiError from "@libs/api-error";
import authorizer from "@middlwares/authorizer";

const CreateImageHandler: ValidatedEventAPIGatewayProxyEvent<
    typeof CreateFile
> = async (event) => {
    let expiresIn: number | string | undefined = event.queryStringParameters?.expiresIn || undefined;

    if (expiresIn && typeof expiresIn === "string") {
        expiresIn = parseInt(expiresIn);
        if (isNaN(expiresIn)) {
            throw new ApiError("Invalid expiresIn value", 400);
        }
    }

    const { fileName } = event.body;

    const data = await s3.generatePutPreSignedUrl(`${process.env.BUCKET_NAME}-${process.env.STAGE}`, fileName, expiresIn as number | undefined);

    return response({ ...data }, 200);
};

export const handler = middy(CreateImageHandler)
    .use(jsonBodyParser())
    .use(authorizer())
    .use(catchFinallyHandler());
