import {
  MessageStatus,
  SendMessages,
  SendMessagesOrbcomm,
} from '@prisma/client';
import { resolve } from 'path';
import { PrismaService } from '../prisma/prisma.service';

interface Gateway {
  id: number;
  name: string;
}

export const validateGateway = (gatewayName: string) => {
  return function (prisma: PrismaService) {
    return new Promise<Gateway>((resolve, reject) => {
      const gateway = prisma.deviceGateway.findUnique({
        where: { name: gatewayName },
      });
      if (!gateway) reject(new Error('not found gateway'));
      resolve(gateway);
    }).then((resultado) => {
      return new Promise<Gateway>((resolve, reject) => {
        if (resultado === null) {
          reject('gateway not found');
        } else {
          resolve(resultado);
        }
      });
    });
  };
};

export const findInDBByGatewayAndStatus = (gateway: Gateway) => {
  return function (status: MessageStatus) {
    return function (prisma: PrismaService) {
      return new Promise<SendMessages[]>((resolve, reject) => {
        const messagesWithStatus = prisma.sendMessages.findMany({
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

export const findInDBByGatewayAndStatusOrbcomm = (gateway: Gateway) => {
  return function (status) {
    return function (prisma: PrismaService) {
      return new Promise<SendMessagesOrbcomm[]>((resolve, reject) => {
        const messagesWithStatus = prisma.sendMessagesOrbcomm.findMany({
          where: {
            AND: [
              { device: { satelliteGateway: { id: gateway.id } } },
              { statusOrbcomm: { equals: status } },
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

export const updateAndCreateMessages = (apiResponse) => {
  const listToUpdate = [];
  return function (prisma: PrismaService) {
    return new Promise((resolve, reject) => {
      apiResponse.forEach((item) => {
        const updateSatellite = prisma.sendMessages.update({
          where: { id: item.UserMessageID },
          data: {
            status: {
              set: convertMessageStatus(
                OrbcommMessageStatus[OrbcommStatusMap[item.ErrorID]],
              ),
            },
          },
        });
        const createOrbcomm = prisma.sendMessagesOrbcomm.create({
          data: {
            deviceId: item.DestinationID,
            fwrdMessageId: item.ForwardMessageID,
            sendMessageId: item.UserMessageID,
            statusOrbcomm: OrbcommMessageStatus[OrbcommStatusMap[item.ErrorID]],
          },
        });
        listToUpdate.push(updateSatellite, createOrbcomm);
      });
      resolve(prisma.$transaction(listToUpdate));
    });
  };
};

const OrbcommMessageStatus = {
  SUBMITTED: 'SUBMITTED',
  RECEIVED: 'RECEIVED',
  ERROR: 'ERROR',
  DELIVERY_FAILED: 'DELIVERY_FAILED',
  TIMEOUT: 'TIMEOUT',
  CANCELLED: 'CANCELLED',
  WAITING: 'WAITING',
  INVALID: 'INVALID',
  TRANSMITTED: 'TRANSMITTED',
};

export enum OrbcommStatusMap {
  SUBMITTED = 0,
  RECEIVED = 1,
  ERROR = 2,
  DELIVERY_FAILED = 3,
  TIMEOUT = 4,
  CANCELLED = 5,
  WAITING = 6,
  INVALID = 7,
  TRANSMITTED = 8,
}

export function convertMessageStatus(status): MessageStatus {
  switch (status) {
    case 'RECEIVED':
    case 'TRANSMITTED':
      return 'SENDED';
    case 'SUBMITTED':
    case 'WAITING':
      return 'SUBMITTED';
    case 'TIMEOUT':
      return 'TIMEOUT';
    case 'DELIVERY_FAILED':
    case 'ERROR':
      return 'FAILED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      break;
  }
}
