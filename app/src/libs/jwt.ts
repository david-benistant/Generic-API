import jwt from 'jsonwebtoken';
import ApiError from './api-error';
import { ErrorsEnum } from '@enums/errors-enums';

export const signToken = (payload: any, expiresIn?: string) => {
    try {

        if (expiresIn) {
            return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
        }
        return jwt.sign(payload, process.env.JWT_SECRET!);
    } catch (error) {
        throw new ApiError('Error while signing token', 500, ErrorsEnum.internalServerError);
    }
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError('Token expired', 401, ErrorsEnum.expiredToken);
        }
        throw new ApiError('Invalid token', 401, ErrorsEnum.invalidToken);
    }
}