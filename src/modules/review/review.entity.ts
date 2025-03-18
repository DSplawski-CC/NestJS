import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';


export class ReviewEntity {
  @Expose()
  id: number;
  @Expose()
  movieId: number;
  @Expose()
  title: string;
  @Expose()
  @IsEmail()
  email: string;
  @Expose()
  content: string;
  @Expose()
  rating: number;
  @Expose()
  createdAt: string;
}