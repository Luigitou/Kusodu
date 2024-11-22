export type RegisterDto = {
  user: {
    username: string;
    email: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    testError: string;
  };
  token: string;
};

export type LoginDto = {
  user: {
    username: string;
    email: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    testError: string;
  };
  token: string;
};
