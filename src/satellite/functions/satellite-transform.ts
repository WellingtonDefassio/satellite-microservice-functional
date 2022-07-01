import { SendMessages } from '@prisma/client';

interface PostOrbcomm {
  DestinationID: string;
  UserMessageID: number;
  RawPayload: number[];
}

export const adjustToOrbcommPost = (sendMessages: SendMessages[]) => {
  const orbcommPost: PostOrbcomm[] = [];

  sendMessages.forEach((messageToPost) => {
    orbcommPost.push({
      DestinationID: messageToPost.deviceId,
      UserMessageID: messageToPost.id,
      RawPayload: Buffer.from(messageToPost.payload).toJSON().data,
    });
  });

  return orbcommPost;
};
