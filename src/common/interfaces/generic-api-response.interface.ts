export interface GenericApiResponse<T> {
  readonly data: T;
  readonly message: string;
  readonly statusCode: number;
}
