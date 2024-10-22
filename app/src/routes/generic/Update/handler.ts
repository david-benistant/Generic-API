import { response, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { UpdateGeneric } from "./schema";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import { updateGeneric  } from "@repositories/generic-repository";
import { updateGenericData } from "@entities/generic";
import ApiError from "@libs/api-error";
import authorizer from "@middlwares/authorizer";

const CreateGenericHandler: ValidatedEventAPIGatewayProxyEvent<typeof UpdateGeneric> = async (event) => {
    const genericId = event.pathParameters?.genericId;
    const { title, metadata } = event.body;

    if (!genericId) {
        throw new ApiError("GenericId is required", 400);
    }

    const data = updateGenericData(genericId, title, metadata);

    await updateGeneric(data);

    return response({}, 204);
};

export const handler = middy(CreateGenericHandler).use(jsonBodyParser()).use(authorizer()).use(catchFinallyHandler());