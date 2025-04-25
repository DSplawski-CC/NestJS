import { UserFullResponseDto } from '@@shared/dto/user.dto';

export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
}

export function createJwtPayload(userFullDto: UserFullResponseDto): JwtPayload {
  return {
    sub: userFullDto.id,
    username: userFullDto.name,
    email: userFullDto.email
  };
}