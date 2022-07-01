import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  findByStatus,
  validateGateway,
} from 'src/satellite/functions/satellite-db-functions';
import { PrismaService } from 'src/satellite/prisma/prisma.service';

@Injectable()
export class OrbcommService {
  constructor(private prisma: PrismaService) {}
  @Cron(CronExpression.EVERY_10_SECONDS)
  uploadMessages() {
    console.log('upload message start....');

    const gateway = validateGateway('ORBCOMM_V2')(this.prisma);
    const allMessagesWithCreatedStatus = findByStatus(gateway)('CREATED')(
      this.prisma,
    );
    allMessagesWithCreatedStatus.then(console.log);
  }
}
