import { Inject, Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { UploadResponse }  from 'imagekit/dist/libs/interfaces/UploadResponse';


@Injectable()
export class ImageKitService {
  private readonly imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });

  @Inject() private readonly prismaProvider: PrismaClientProviderService;

  constructor() {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  generateAuthParams() {
    const authParams = this.imageKit.getAuthenticationParameters();

    return authParams;
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<UploadResponse> {
    return await this.imageKit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: folder,
      useUniqueFileName: true,
      overwriteFile: false,
    });
  }
}
