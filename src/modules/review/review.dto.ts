import { IsEmail, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';


export class UserInReviewDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  @MaxLength(10)
  name: string;

  constructor(user: Partial<UserInReviewDto>) {
    Object.assign(this, user);
  }
}

export class ReviewResponseDto {
  @Expose()
  id: string;
  @Expose()
  movieId: number;
  @Expose()
  title: string;

  @Expose({ name: 'user' })
  @Transform(({ obj }) => obj.user)
  @Type(() => UserInReviewDto)
  author: UserInReviewDto;


  @Expose()
  content: string;
  @Expose()
  rating: number;
  @Expose()
  createdAt: string;
}

export class CreateReviewDto {
  @Expose()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @ValidateNested()
  @Exclude({ toPlainOnly: true })
  @Type(() => UserInReviewDto)
  author: UserInReviewDto;

  @Expose()
  @MinLength(3)
  @MaxLength(1000)
  content: string;

  @Expose()
  @Min(1)
  @Max(10)
  rating: number;
}

export class UpdateReviewDto {
  @Expose()
  id: string;

  @Expose()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @Type(() => UserInReviewDto)
  author: UserInReviewDto;

  @Expose()
  @MinLength(3)
  @MaxLength(1000)
  content: string;

  @Expose()
  @Min(1)
  @Max(10)
  rating: number;
}