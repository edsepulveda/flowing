export interface RegisterUserDto {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface EmailLoginUserDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
  refreshExpiresIn: number
  expiresIn: number;
  tokenType: string;
}