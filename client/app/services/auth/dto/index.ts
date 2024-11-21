export type RegisterDto = {
  cleanedUser: {
    username: string;
    email: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    testError: string;
  };
  token: string;
};
