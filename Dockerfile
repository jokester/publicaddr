FROM node:18-bookworm-slim

COPY . /opt/publicaddress

RUN set -uex                          \
        && cd /opt/publicaddress/demo \
        && npm i
