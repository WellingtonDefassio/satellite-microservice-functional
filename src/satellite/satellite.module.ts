import { Module } from '@nestjs/common';
import { SatelliteService } from './satellite.service';
import { SatelliteController } from './satellite.controller';
import { PrismaModule } from './prisma/prisma.module';
import { EridiumModule } from './services/eridium/eridium.module';
import { OrbcommModule } from './services/orbcomm/orbcomm.module';

@Module({
  providers: [SatelliteService],
  controllers: [SatelliteController],
  imports: [PrismaModule, EridiumModule, OrbcommModule],
})
export class SatelliteModule {}
