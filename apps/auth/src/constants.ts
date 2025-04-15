import { SetMetadata } from '@nestjs/common';


export const JWT_SECRET = 'Tjm"TWjVrVYe[zA23*GJ`YCtYkYK/}Im';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);