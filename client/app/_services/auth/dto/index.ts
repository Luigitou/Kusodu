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
  refreshToken: {
    id: string;
    token: string;
    userId: string;
    expiresAt: string;
    revoked: boolean;
    createdAt: string;
  };
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
  refreshToken: {
    id: string;
    token: string;
    userId: string;
    expiresAt: string;
    revoked: boolean;
    createdAt: string;
  };
};

export type RefreshDto = {
  token: string;
  refreshToken: {
    id: string;
    token: string;
    userId: string;
    expiresAt: string;
    revoked: boolean;
    createdAt: string;
  };
};
