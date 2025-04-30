import { UserFullResponseDto } from '@@shared/dto/user.dto';

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
}

type UserJwtData = Pick<UserFullResponseDto, 'id' | 'name' | 'email'>;

export function createJwtPayload(userData: UserJwtData): JwtPayload {
  return {
    sub: userData.id,
    username: userData.name,
    email: userData.email
  };
}