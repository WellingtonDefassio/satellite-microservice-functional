import { Module } from '@nestjs/common';
import { SatelliteService } from './satellite.service';
import { SatelliteController } from './satellite.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrbcommService } from './services/orbcomm/orbcomm.service';

@Module({
  providers: [SatelliteService, OrbcommService],
  controllers: [SatelliteController],
  imports: [PrismaModule, ScheduleModule.forRoot()],
})
export class SatelliteModule {}
