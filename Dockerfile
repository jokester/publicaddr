FROM node:18-bookworm-slim

RUN apt-get update && apt-get install -y python3

COPY . /opt/publicaddr

RUN set -uex                       \
        && cd /opt/publicaddr/demo \
        && npm i
