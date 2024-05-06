FROM node:21-alpine as build

WORKDIR /usr/src/app/client_ui

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build