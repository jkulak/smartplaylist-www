FROM node:17-alpine3.14 AS builder
WORKDIR /app
COPY ./app ./
RUN yarn && \
    yarn build

FROM nginx:1.23-alpine
WORKDIR /app
COPY --from=builder /app/build ./
