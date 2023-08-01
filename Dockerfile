# Dockerfile for demo
FROM node:18-bookworm-slim

RUN apt-get update -y && apt-get install -y python3 build-essential curl

COPY . /opt/publicaddr

RUN set -uex                       \
        && cd /opt/publicaddr/demo \
        && npm i
