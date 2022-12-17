FROM node:16
WORKDIR /usr/src/api-social
COPY ./package.json .
COPY ./dist ./dist
EXPOSE  4000
CMD npm install && npm start