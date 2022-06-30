import { Module } from '@nestjs/common';
import { FetchDeviceByID } from '../pipes/satellite-transform.pipe';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, FetchDeviceByID],
  exports: [PrismaService],
  imports: [PrismaModule],
})
export class PrismaModule {}
