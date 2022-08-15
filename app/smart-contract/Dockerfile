FROM node:16-alpine3.15

WORKDIR /app/smart-contract

COPY package*.json .

RUN npm i -g truffle

RUN npm i

COPY . .

EXPOSE 8545

