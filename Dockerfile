FROM node:18-bookworm-slim

RUN apt update && apt install python3

COPY . /opt/publicaddr

RUN set -uex                       \
        && cd /opt/publicaddr/demo \
        && npm i
