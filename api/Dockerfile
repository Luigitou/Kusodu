FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

FROM builder AS development

RUN npm ci

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

FROM builder AS production

RUN npm i -g @nestjs/cli

RUN npm ci --omit=dev

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/main"]