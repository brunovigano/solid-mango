FROM node:17
WORKDIR /usr/src/solid-mango
COPY ./package.json .
RUN yarn --prod