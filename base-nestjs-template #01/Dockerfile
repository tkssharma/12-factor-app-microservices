FROM node:12-buster-slim

ARG GITLAB_ACCESS_TOKEN

WORKDIR /app

COPY package.json package-lock.json /app/
COPY .npmrc /app/.npmrc  

RUN npm install && \
    rm -rf /tmp/* /var/tmp/*

COPY ./docker-utils/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

COPY . /app

RUN npm run build

EXPOSE 3000

USER node

ENV TYPEORM_MIGRATION=ENABLE
ENV NPM_INSTALL=DISABLE
ENV GITLAB_ACCESS_TOKEN="${GITLAB_ACCESS_TOKEN}"
CMD npm run start:prod