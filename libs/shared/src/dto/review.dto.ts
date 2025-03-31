import { IsEmail, IsInt, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Prisma } from '@prisma/client';


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

export class ReviewResponseDto implements Prisma.ReviewGetPayload<{}>{
  @Expose()
  id: number;
  @Expose()
  movieId: number;
  @Expose()
  title: string;

  @Expose()
  userId: number;

  @Expose()
  @Transform(({ obj }) => obj.author)
  @Type(() => UserInReviewDto)
  author: UserInReviewDto;

  @Expose()
  content: string;
  @Expose()
  rating: number;
  @Expose()
  createdAt: Date;
}

export class CreateReviewDto {
  @Expose()
  @MinLength(3)
  @MaxLength(30)
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
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;
}

export class UpdateReviewDto {
  @Expose()
  id: string;

  @Expose()
  @MinLength(3)
  @MaxLength(30)
  title: string;

  @Type(() => UserInReviewDto)
  author: UserInReviewDto;

  @Expose()
  @MinLength(3)
  @MaxLength(1000)
  content: string;

  @Expose()
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;
}