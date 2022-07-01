export const validateNull = (args: any) => {
  if (!args) {
    throw new Error('cant read null!!');
  } else {
    return args;
  }
};
