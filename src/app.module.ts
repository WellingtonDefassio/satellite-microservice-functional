import { Module } from '@nestjs/common';
import { SatelliteModule } from './satellite/satellite.module';

@Module({
  imports: [SatelliteModule],
})
export class AppModule {}
