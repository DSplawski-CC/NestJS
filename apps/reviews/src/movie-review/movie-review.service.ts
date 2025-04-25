import { Injectable } from '@nestjs/common';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';


@Injectable()
export class MovieReviewService {
  constructor(private readonly prismaProvider: PrismaClientProviderService) {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  public async  getTopMoviesIdsByRating(count?: number) {
    const result = await this.prisma.review.groupBy({
      by: 'movieId',
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: 'desc',
        }
      },
      take: count,
    });

    return result.map(item => ({
        [item.movieId]: item._avg.rating,
      })
    );
  }
}
