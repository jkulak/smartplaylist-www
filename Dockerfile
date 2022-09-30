FROM node:18.10.0-alpine3.16
WORKDIR /app
COPY ./app ./
RUN yarn && \
    yarn build && \
    yarn global add serve

CMD [ "serve", "-s", "build", "-p", "3001", "--no-clipboard" ]
