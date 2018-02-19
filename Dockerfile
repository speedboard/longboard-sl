FROM node:alpine

RUN apk add --no-cache "su-exec>=0.2"
RUN apk add --update --no-cache openssl'
