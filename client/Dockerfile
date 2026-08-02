FROM node:alpine

ENV NODE_ENV development

WORKDIR /react-app

COPY ./package*.json /react-app

RUN npm install

COPY .. .

CMD ["npm","run","dev"]