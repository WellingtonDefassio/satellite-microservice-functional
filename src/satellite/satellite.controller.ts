import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MessageBodyDto } from './dtos/satellite-dto';
import { FetchDeviceByID } from './pipes/satellite-transform.pipe';
import { SatelliteService } from './satellite.service';

@Controller('satellite')
export class SatelliteController {
  constructor(private satelliteService: SatelliteService) {}

  @Post('messages')
  @UsePipes(FetchDeviceByID)
  async saveMessage(@Body() body: MessageBodyDto) {
    console.log('Controller body :' + JSON.stringify(body));
    return this.satelliteService.saveMessage(body);
  }
}
