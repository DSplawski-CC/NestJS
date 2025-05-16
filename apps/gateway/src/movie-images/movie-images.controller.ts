import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { ImageKitService } from '@@shared/services/image-kit/image-kit.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('movie-images')
export class MovieImagesController {
  constructor(
    private readonly prismaProvider: PrismaClientProviderService,
    private readonly imagekitService: ImageKitService
  ) {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  @Post(':movieId/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('movieId', ParseIntPipe) movieId: number) {
    const imageMetaData =  await this.imagekitService.uploadFile(file, `/${movieId}`);
    const image = await this.prisma.movie.create({
      data: {
        movieId: movieId,
        fileUrl: imageMetaData.url,
        fileId: imageMetaData.fileId,
        uploadedAt: Date.now(),
      }
    });

    return image;
  }
}
