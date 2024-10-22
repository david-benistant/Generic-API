import { GetCommandInput } from "@aws-sdk/lib-dynamodb";
import { ErrorsEnum } from "@enums/errors-enums";
import ApiError from "@libs/api-error";
import { toAttribute } from "@libs/attribute-converter";
import DynamoService from "@services/dynamo-service";
import { RawUser } from "@entities/user";

const dynamo = new DynamoService();

export const getUserByEmail = async (
    email: string
): Promise<RawUser> => {
    const input: GetCommandInput = {
        TableName: `${process.env.USER_TABLE_NAME}_${process.env.STAGE}`,
        Key: { email: toAttribute(email) },
    };

    const out = await dynamo.get(input);

    if (!out.Item) {
        throw new ApiError("User not found", 404, ErrorsEnum.ressourceNotFound);
    }
    return out.Item as RawUser;
};

export const createUser = async (
    rawUser: RawUser
): Promise<void> => {
    const input = {
        TableName: `${process.env.USER_TABLE_NAME}_${process.env.STAGE}`,
        Item: rawUser,
    };

    await dynamo.create(input);
};
