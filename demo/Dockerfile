# Dockerfile for demo
FROM node:18-bookworm-slim

COPY . /opt/publicaddr

RUN set -uex                         \
        && cd /opt/publicaddr/demo   \
        && npm i                     \
        && npm cache clean --force
