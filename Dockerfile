FROM node:18

COPY . /opt/publicaddress

RUN set -uex                          \
        && cd /opt/publicaddress/demo \
        && npm i
