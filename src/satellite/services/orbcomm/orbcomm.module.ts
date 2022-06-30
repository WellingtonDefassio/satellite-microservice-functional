import { Module } from '@nestjs/common';
import { OrbcommService } from './orbcomm.service';

@Module({
  providers: [OrbcommService]
})
export class OrbcommModule {}
