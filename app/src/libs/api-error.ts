import { Errors } from '@enums/errors-enums';

class ApiError extends Error {
  public statusCode: number;

  public httpCode: number;

  public statusKey: string;

  constructor(message: string, httpCode: number = 400, statusCode: number = 4000) {
    super(message);
    this.name = 'ApiError';
    this.httpCode = httpCode;
    this.statusCode = statusCode;
    this.statusKey = Errors[statusCode];
  }
}

export default ApiError;
