import {
    ValidatedEventAPIGatewayProxyEvent,
    response,
} from "@libs/api-gateway";
import { LoginSchema } from "./schema";
import middy from "@middy/core";
import { getUserByEmail } from "@repositories/auth-repository";
import jsonBodyParser from "@middy/http-json-body-parser";
import { verifyPassword } from "@libs/password";
import catchFinallyHandler from "@middlwares/catch-finally-handler";
import ApiError from "@libs/api-error";
import { signToken } from "@libs/jwt";
import { rawUserToUser } from "@entities/user";

const Login: ValidatedEventAPIGatewayProxyEvent<typeof LoginSchema> = async (
    event
) => {
    const { email, password } = event.body;
    const rawUser = await getUserByEmail(email);

    if (!verifyPassword(password, rawUser.password))
        throw new ApiError("Invalid credentials", 400);

    return response({ accessToken: signToken(rawUserToUser(rawUser)) });
};

export const handler = middy(Login)
    .use(jsonBodyParser())
    .use(catchFinallyHandler());
