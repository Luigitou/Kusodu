FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

FROM builder AS development

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM builder AS production

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]