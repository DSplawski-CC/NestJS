import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceRouteService } from './microservice-route.service';

describe('MicroserviceRouteService', () => {
  let service: MicroserviceRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroserviceRouteService],
    }).compile();

    service = module.get<MicroserviceRouteService>(MicroserviceRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
