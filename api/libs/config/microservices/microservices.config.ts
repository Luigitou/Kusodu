import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const microservicesConfig: ClientProviderOptions[] = [
  {
    name: 'GATEWAY_SERVICE',
    transport: Transport.TCP,
    options: {
      host: 'gateway',
      port: 5000,
    },
  },
  {
    name: 'AUTH_SERVICE',
    transport: Transport.TCP,
    options: {
      host: 'auth',
      port: 5001,
    },
  },
  {
    name: 'USER_SERVICE',
    transport: Transport.TCP,
    options: {
      host: 'user',
      port: 5002,
    },
  },
];
