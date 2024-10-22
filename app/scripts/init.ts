import fs from "fs";
import 'dotenv/config'
import { config } from "dotenv";
import { createRawUserData } from "@entities/user";

const properties = JSON.parse(fs.readFileSync("../properties.json", "utf8"))
const runtimeEnv = JSON.parse(fs.readFileSync("../runtime-env.json", "utf8"))
config({path: '../../.env'})


process.env = {
    ...properties,
    ...runtimeEnv,
    STAGE: process.env.STAGE,
}

import { createUser } from "@repositories/auth-repository";

const user = {
    "email": "test@email.com",
    "password": "password"  
}

const main = async () => {
    await createUser(createRawUserData(user.email, user.password));
};

main();