# Dockerfile for demo
FROM node:18-alpine

COPY . /opt/publicaddr

RUN set -uex                         \
        && cd /opt/publicaddr/demo   \
        && npm i                     \
        && npm cache clean --force
