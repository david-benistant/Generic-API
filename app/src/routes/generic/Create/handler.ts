import {
    response,
    ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { CreateGeneric } from "./schema";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import { createGeneric } from "@repositories/generic-repository";
import { createGenericData } from "@entities/generic";
import authorizer from "@middlwares/authorizer";

const CreateGenericHandler: ValidatedEventAPIGatewayProxyEvent<
    typeof CreateGeneric
> = async (event) => {
    const { title, metadata } = event.body;

    const data = createGenericData(title, metadata);
    await createGeneric(data);

    return response({ ...data }, 201);
};

export const handler = middy(CreateGenericHandler)
    .use(jsonBodyParser())
    .use(authorizer())
    .use(catchFinallyHandler());
