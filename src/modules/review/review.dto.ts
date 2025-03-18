import { IsEmail } from 'class-validator';
import { Expose, Transform } from 'class-transformer';


export class ReviewResponseDto {
  @Expose()
  id: string;
  @Expose()
  movieId: number;
  @Expose()
  title: string;
  @Expose({ name: 'name' })
  @Transform(t => t.obj.user.name)
  author: string;
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

export class CreateReviewDto {
  movieId: number;
  title: string;
  // @Transform(t => t.obj.user.name)
  author: string;
  @IsEmail()
  email: string;
  content: string;
  rating: number;
}

export class UpdateReviewDto {
  id: string;
  movieId: number;
  title: string;
  @Expose({ name: 'name' })
  author: string;
  @IsEmail()
  email: string;
  content: string;
  rating: number;
}