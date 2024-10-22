export default {
    UserTable: {
        //? USERS
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: "${self:provider.environment.USER_TABLE_NAME}_${self:provider.stage}",
            AttributeDefinitions: [
                {
                    AttributeName: "email",
                    AttributeType: "S",
                },
            ],
            KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
            BillingMode: "PAY_PER_REQUEST",
        },
    },

    GenericTable: {
        //? GENERIC
        Type: "AWS::DynamoDB::Table",
        Properties: {
            TableName: "${self:provider.environment.GENERIC_TABLE_NAME}_${self:provider.stage}",
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S",
                },
                {
                    AttributeName: "title",
                    AttributeType: "S",
                },
                {
                    AttributeName: "type",
                    AttributeType: "S",
                },
            ],
            KeySchema: [
                { AttributeName: "type", KeyType: "HASH" },
                {
                    AttributeName: "id",
                    KeyType: "RANGE",
                },
            ],
            BillingMode: "PAY_PER_REQUEST",
            LocalSecondaryIndexes: [
                {
                    IndexName: "titleIndex",
                    KeySchema: [
                        {
                            AttributeName: "type",
                            KeyType: "HASH",
                        },
                        {
                            AttributeName: "title",
                            KeyType: "RANGE",
                        },
                    ],
                    Projection: { ProjectionType: "ALL" },
                },
            ],
        },
    }
};
