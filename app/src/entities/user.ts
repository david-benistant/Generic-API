import { encryptPassword } from '@libs/password';

export interface RawUser {
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export const rawUserToUser = (rawUser: RawUser): User => {
    return {
        email: rawUser.email,
        createdAt: new Date(rawUser.createdAt),
        updatedAt: new Date(rawUser.updatedAt),
    };
};

export const createRawUserData = (email: string, password: string): RawUser => {
    const now = new Date().toISOString();
    return {
        email,
        password : encryptPassword(password),
        createdAt: now,
        updatedAt: now,
    };
}