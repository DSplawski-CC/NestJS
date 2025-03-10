export class ReviewResponseDto {
  id: string;
  movieId: number;
  title: string;
  author: string;
  content: string;
  rating: number;
  createdAt: Date;
}

export class CreateReviewDto {
  movieId: number;
  title: string;
  author: string;
  content: string;
  rating: number;
}

export class UpdateReviewDto {
  id: string;
  movieId: number;
  title: string;
  author: string;
  content: string;
  rating: number;
}