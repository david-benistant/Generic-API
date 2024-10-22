import {
    ValidatedEventAPIGatewayProxyEvent,
    response,
} from "@libs/api-gateway";
import { RegisterSchema } from "./schema";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import ApiError from "@libs/api-error";
import { createRawUserData, rawUserToUser } from "@entities/user";
import { createUser } from "@repositories/auth-repository";
import { signToken } from "@libs/jwt";

const Register: ValidatedEventAPIGatewayProxyEvent<
    typeof RegisterSchema
> = async (event) => {
    const { email, password, adminToken } = event.body;

    if (adminToken !== process.env.ADMIN_TOKEN)
        throw new ApiError("Invalid admin token", 400);

    const rawUser = createRawUserData(email, password);
    await createUser(rawUser);

    const user = rawUserToUser(rawUser);
    return response({ ...user, accessToken: signToken(user) }, 201);
};

export const handler = middy(Register)
    .use(jsonBodyParser())
    .use(catchFinallyHandler());
