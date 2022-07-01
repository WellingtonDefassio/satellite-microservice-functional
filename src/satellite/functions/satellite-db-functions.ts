import { MessageStatus, SendMessages } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

interface Gateway {
  id: number;
  name: string;
  deviceId: number;
}

export const validateGateway = (gatewayName: string) => {
  return function (prisma: PrismaService) {
    return new Promise<Gateway>(async (resolve, reject) => {
      const gateway = await prisma.deviceGateway.findUnique({
        where: { name: gatewayName },
      });
      if (!gateway) reject(new Error('not found gateway'));

      resolve(gateway);
    });
  };
};

export const findInDBByGatewayAndStatus = (gateway: Gateway) => {
  return function (status: MessageStatus) {
    return function (prisma: PrismaService) {
      return new Promise<SendMessages[]>(async (resolve, reject) => {
        const messagesWithStatus = await prisma.sendMessages.findMany({
          where: {
            AND: [
              { device: { satelliteGateway: { id: { equals: gateway.id } } } },
              { status: { equals: status } },
            ],
          },
          take: 50,
        });
        if (!messagesWithStatus) {
          reject('no more messages available');
        }
        resolve(messagesWithStatus);
      });
    };
  };
};
