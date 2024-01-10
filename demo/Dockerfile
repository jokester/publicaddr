# Dockerfile for demo
# or, FROM node:18-alpine
FROM node:18-bookworm-slim

RUN set -uex                         \
        && npm i -g publicaddr@0.4.3 \
        && npm cache clean --force

COPY ./demo-server.mjs /opt/demo-server.mjs
