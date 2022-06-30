import { Injectable } from '@nestjs/common';
import { MessageBodyDto } from './dtos/satellite-dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class SatelliteService {
  constructor(private prisma: PrismaService) {}
  async saveMessage(body: MessageBodyDto) {
    await this.prisma.sendMessages.create({
      data: {
        payload: body.payload,
        deviceId: body.deviceId,
      },
    });
  }
}
