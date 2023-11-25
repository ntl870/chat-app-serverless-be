export interface SignInDto {
  readonly email: string;
  readonly password: string;
}

export interface AuthPayloadDto {
  readonly email: string;
  readonly password: string;
  readonly _id: string;
}

export interface AuthTokenResponseDto {
  readonly accessToken: string;
}
