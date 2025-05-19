import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageKitService } from '@@shared/services/image-kit/image-kit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { GetUser } from '@@shared/utils/jwt.utils';
import { UserResponseDto } from '@@shared/dto/user.dto';


@Controller('movie-images')
export class MovieImagesController {
  constructor(
    private readonly prismaProvider: PrismaClientProviderService,
    private readonly imagekitService: ImageKitService,
  ) {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  @Post(':movieId/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @GetUser() user: UserResponseDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    console.log(user);
    const imageMetaData = await this.imagekitService.uploadFile(
      file,
      `/${movieId}`,
    );
    const image = await this.prisma.movie.create({
      data: {
        userId: user.id,
        movieId: movieId,
        fileUrl: imageMetaData.url,
        fileId: imageMetaData.fileId,
        uploadedAt: new Date(Date.now()),
      },
    });

    return image;
  }
}
