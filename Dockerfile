FROM oven/bun:latest as build

WORKDIR /app

COPY package*.json .
COPY bun.lockb .
COPY prisma/* ./prisma/

RUN bun install

RUN bunx prisma generate

COPY . .

# FROM node:18 as production

# WORKDIR /app

# RUN npm install -g ts-node

# COPY --from=build /app .

EXPOSE 8083

CMD ["node", "server.ts"]
