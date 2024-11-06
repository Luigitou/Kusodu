FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

FROM builder AS development

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

FROM builder AS production

RUN npm i -g @nestjs/cli

RUN npm install --omit=dev

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]