import {
    DeleteCommandInput,
    GetCommandInput,
    QueryCommandInput,
    ScanCommandInput,
    UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Generic, GenericToUpdate } from "@entities/generic";
import { ErrorsEnum } from "@enums/errors-enums";
import ApiError from "@libs/api-error";
import { toAttribute } from "@libs/attribute-converter";
import DynamoService from "@services/dynamo-service";
import { __String } from "typescript";

const dynamo = new DynamoService();

export const createGeneric = async (data: Generic): Promise<void> => {
    const input = {
        TableName: `${process.env.GENERIC_TABLE_NAME}_${process.env.STAGE}`,
        Item: data,
    };

    await dynamo.create(input);
};

export const getGeneric = async (id: string): Promise<any> => {
    const input: GetCommandInput = {
        TableName: `${process.env.GENERIC_TABLE_NAME}_${process.env.STAGE}`,
        Key: { type: toAttribute("generic"), id: toAttribute(id) },
    };

    const out = await dynamo.get(input);

    if (!out.Item) {
        throw new ApiError("Item not found", 404, ErrorsEnum.ressourceNotFound);
    }
    return out.Item;
};

export const listGeneric = async (
    limit: number,
    page?: string
): Promise<{ Items: Generic[]; nextPage: string | undefined }> => {
    const input: ScanCommandInput = {
        TableName: `${process.env.GENERIC_TABLE_NAME}_${process.env.STAGE}`,
        Limit: limit,
        ExclusiveStartKey: page ? JSON.parse(atob(page)) : undefined,
    };

    const out = await dynamo.scan(input);
    return {
        Items: out.Items as unknown as Generic[],
        nextPage: out.LastEvaluatedKey
            ? btoa(JSON.stringify(out.LastEvaluatedKey))
            : undefined,
    };
};

export const searchGeneric = async (
    limit: number,
    search: string,
    page?: string
): Promise<{ Items: Generic[]; nextPage: string | undefined }> => {
    const input: QueryCommandInput = {
        TableName: `${process.env.GENERIC_TABLE_NAME}_${process.env.STAGE}`,
        IndexName: "titleIndex",
        Limit: limit,
        ExclusiveStartKey: page ? JSON.parse(atob(page)) : undefined,
        ExpressionAttributeNames: {
            "#typeAttr": "type",
        },
        KeyConditionExpression:
            "#typeAttr = :typeVal and begins_with(title, :titleVal)",
        ExpressionAttributeValues: {
            ":typeVal": "generic",
            ":titleVal": search,
        },
    };

    const out = await dynamo.query(input);
    return {
        Items: out.Items as unknown as Generic[],
        nextPage: out.LastEvaluatedKey
            ? btoa(JSON.stringify(out.LastEvaluatedKey))
            : undefined,
    };
};

export const deleteGeneric = async (id: string): Promise<void> => {
    const command: DeleteCommandInput = {
        TableName: `${process.env.GENERIC_TABLE_NAME}_${process.env.STAGE}`,
        Key: { type: toAttribute("generic"), id: toAttribute(id) },
    };

    await dynamo.delete(command);
};

export const updateGeneric = async (data: GenericToUpdate): Promise<void> => {
    let updateExpression = "SET ";
    let expressionAttributeValues: { [key: string]: any } = {};

    if (!data.title && !data.metadata) {
        throw new ApiError("Nothing to update", 400);
    }

    if (data.title) {
        updateExpression += "title = :title";
        expressionAttributeValues[":title"] = toAttribute(data.title);
        if (data.metadata) {
            updateExpression += ", ";
        }
    }
    if (data.metadata) {
        updateExpression += "metadata = :metadata";
        expressionAttributeValues[":metadata"] = toAttribute(data.metadata);
    }


    const command: UpdateCommandInput = {
        TableName: `${process.env.GENERIC_TABLE_NAME}_${process.env.STAGE}`,
        Key: { type: toAttribute("generic"), id: toAttribute(data.id) },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
    };

    const out = await dynamo.update(command);

    console.log(out);

};