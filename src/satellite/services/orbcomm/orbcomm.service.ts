/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  findInDBByGatewayAndStatus,
  findInDBByGatewayAndStatusOrbcomm,
  updateAndCreateMessages,
  validateGateway,
} from 'src/satellite/functions/satellite-db-functions';
import {
  mergeCredentials,
  postOrbcomm,
} from 'src/satellite/functions/satellite-http.functions';
import { adjustToOrbcommPost } from 'src/satellite/functions/satellite-transform';
import { PrismaService } from 'src/satellite/prisma/prisma.service';

@Injectable()
export class OrbcommService {
  constructor(private prisma: PrismaService, private http: HttpService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  uploadMessages() {
    console.log('upload message start....');
    const gateway = validateGateway('ORBCOMM_V2')(this.prisma);
    const postMessages = postOrbcomm('http://localhost:3001/orbcomm/post')(this.http);
    const credentialsWithBody = mergeCredentials({access_id: 'any',password: 'any_password'});

    gateway
      .then((gateway) =>
        findInDBByGatewayAndStatus(gateway)('CREATED')(this.prisma))
      .then(adjustToOrbcommPost)
      .then((bodyToSend) => credentialsWithBody(bodyToSend))
      .then(postMessages)
     .then((apiResponse) => updateAndCreateMessages(apiResponse)(this.prisma))

      .then(console.log)
      .catch(console.log);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  checkMessages() {
    console.log('check message start....')
    const gateway = validateGateway('ORBCOMM_V2')(this.prisma);

    gateway.then((gateway) => findInDBByGatewayAndStatusOrbcomm(gateway)('SUBMITTED')(this.prisma))



    .then(console.log)
  }



}
