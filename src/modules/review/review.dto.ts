export class ReviewResponseDto {
  id: string;
  movieId: number;
  title: string;
  author: string;
  email: string;
  content: string;
  rating: number;
  createdAt: string;
}

export class CreateReviewDto {
  movieId: number;
  title: string;
  author: string;
  email: string;
  content: string;
  rating: number;
}

export class UpdateReviewDto {
  id: string;
  movieId: number;
  title: string;
  author: string;
  email: string;
  content: string;
  rating: number;
}