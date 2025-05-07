import { UserFullResponseDto } from '@@shared/dto/user.dto';

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
}

export interface JwtTokenMeta {
  exp: number;
  iat: number;
}

export interface JwtToken extends JwtPayload, JwtTokenMeta {}

type UserJwtData = Pick<UserFullResponseDto, 'id' | 'name' | 'email'>;

export function createJwtPayload(userData: UserJwtData): JwtPayload {
  return {
    sub: userData.id,
    username: userData.name,
    email: userData.email
  };
}

export function getExpirationDate(jwtToken: JwtToken): Date {
  return new Date(getExpirationTime(jwtToken));
}

export function getExpirationTime(jwtToken: JwtToken): number {
  return jwtToken.exp * 1000;
}