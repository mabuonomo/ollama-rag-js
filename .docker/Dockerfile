FROM node:22-alpine

WORKDIR /app

RUN npm -g install npm-check-updates ts-node ts-node-dev

RUN apk update && apk add bash make wget git curl zsh

USER 1000

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)"
