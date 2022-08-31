FROM node:16.14.0

WORKDIR /app

COPY package.json .

RUN npm i -g react-scripts

RUN npm install -g npm@8.18.0

# RUN npm cache verify

# RUN npm i -f

COPY . .