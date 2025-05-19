import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';


export class MovieImageDto implements Prisma.MovieGetPayload<{}> {
  @Expose()
  id: number;
  @Expose()
  movieId: number;
  @Expose()
  fileUrl: string;
  @Expose()
  fileId: string;
  @Expose()
  userId: number;
  @Expose()
  uploadedAt: Date;
}