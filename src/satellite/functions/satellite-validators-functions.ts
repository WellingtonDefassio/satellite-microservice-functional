import { NotFoundException } from '@nestjs/common';

export const validateNull = (elemento: any, message: string) => {
  if (!elemento) {
    throw new NotFoundException(message);
  } else return elemento;
};
