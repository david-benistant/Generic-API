import type { AWS } from "@serverless/typescript";
import dynamodbTables from "@resources/dynamo-tables";
import s3Buckets from "@resources/s3-buckets";
import fs from "fs";

import Auth from "@routes/auth";
import Generic from "@routes/generic";
import Files from "@routes/files";

const properties = JSON.parse(fs.readFileSync("properties.json", "utf8"))
const runtimeEnv = JSON.parse(fs.readFileSync("runtime-env.json", "utf8"))


const serverlessConfiguration: AWS = {
    service: "generic-api",
    plugins: ["serverless-esbuild"],
    provider: {
        name: "aws",
        timeout: 30,
        runtime: "nodejs20.x",
        stage: process.env.STAGE as any | "dev",
        region: process.env.AWS_DEFAULT_REGION as any | "eu-west-3",
        apiGateway: {
            binaryMediaTypes: ["*/*"],
        },
        environment: {
            ...properties,
            ...runtimeEnv,
            AWS_KEY: process.env.AWS_ACCESS_KEY_ID ,
            AWS_SECRET: process.env.AWS_SECRET_ACCESS_KEY ,
            REGION: process.env.AWS_DEFAULT_REGION ,
            STAGE: "${self:provider.stage}",
            
        },
    },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: [],
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
    },

    package: {
        individually: true,
        patterns: ["internal/**", "shared/**", "prisma/client/**"],
    },

    functions: {
        ...Auth,
        ...Generic,
        ...Files
    },

    resources: {
        Resources: {
          ...dynamodbTables,
          ...s3Buckets,

        },
    },
};

module.exports = serverlessConfiguration;
