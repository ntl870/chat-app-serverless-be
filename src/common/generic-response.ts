import { GenericApiResponse } from './interfaces/generic-api-response.interface';

export class GenericResponse {
  static getResponse<T>(
    data: T,
    message: string,
    statusCode: number,
  ): GenericApiResponse<T> {
    return {
      data,
      message,
      statusCode,
    };
  }
}
