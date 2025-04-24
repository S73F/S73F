FROM node:22.13.1-alpine3.21
WORKDIR /app
COPY . .
RUN npm install

FROM composer:2.8.8
WORKDIR /app
COPY . .
RUN composer install