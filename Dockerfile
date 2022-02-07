FROM node:17
WORKDIR /usr/src/solid-mango
COPY ./package.json .
RUN yarn --prod
COPY ./dist ./dist
EXPOSE 5000
CMD yarn start