import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface Body {
  deviceId: string;
  payload: string;
}

@Injectable()
export class FetchDeviceByID implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(body: Body, metadata: ArgumentMetadata) {
    if (!body.deviceId || !body.payload) {
      throw new NotFoundException('MISSING PARAMS');
    }
    const fetchDevice = await this.prisma.devices.findUnique({
      where: { deviceId: body.deviceId },
    });
    if (!fetchDevice) {
      throw new NotFoundException('DEVICE NOT FOUND');
    }
    const device = {
      id: fetchDevice.id,
      gateway: fetchDevice.gatGateway_id,
      status: fetchDevice.status,
    };
    return { ...body, device: device };
  }
}
