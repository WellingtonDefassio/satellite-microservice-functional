import { HttpService } from '@nestjs/axios';

export const postOrbcomm = (link: string) => {
  return function (http: HttpService) {
    return function (body) {
      return new Promise<any[]>((resolve, reject) => {
        http.axiosRef
          .post(link, {
            body,
          })
          .then((apiResponse) => {
            const correctValues = verifyPostMessages(
              body.messages,
              apiResponse.data,
            );
            resolve(correctValues);
          })
          .catch((erro) => {
            reject(erro);
          });
      });
    };
  };
};

export const mergeCredentials = (credentials: object) => {
  return function (body) {
    const bodyToPost = {
      ...credentials,
      messages: [...body],
    };
    return bodyToPost;
  };
};

export const verifyPostMessages = (sendedData, responseData) => {
  const validItems = [];
  responseData.Submission.map((apiResponse) => {
    const exists = sendedData.find(
      (data) => data.UserMessageID === apiResponse.UserMessageID,
    );
    if (exists) {
      validItems.push(apiResponse);
    }
  });
  return validItems;
};
