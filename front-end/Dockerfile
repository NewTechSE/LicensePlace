FROM node:16.14.0

WORKDIR /app

COPY package.json .

RUN npm install -g npm@8.18.0

RUN npm i -f

COPY . .