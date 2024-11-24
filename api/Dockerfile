FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS development

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 5000

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS production

WORKDIR /app

RUN npm i -g @nestjs/cli && apk add --no-cache netcat-openbsd

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env

EXPOSE 5000

CMD sh -c "until nc -z postgres 5432; do echo 'Waiting for PostgreSQL to be ready...'; sleep 2; done && echo 'PostgreSQL is ready!' && npm run prisma:deploy && node dist/main"
