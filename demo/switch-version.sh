#!/usr/bin/env bash

set -ue
cd $(dirname "$0")

if [[ $# -lt 2 ]]; then
  cat<<END
  A demo script to switch between 2 versions of services
  USAGE: $0 (a|b)+
END
  exit 1
fi

echo '$#='$#

while [[ $# -gt 0 ]]; do
  if [[ $1 = a ]]; then
    echo '======== switching to version a'
    VERSION_A_REPLICA=4 VERSION_B_REPLICA=4 docker-compose up -d
    VERSION_A_REPLICA=8 VERSION_B_REPLICA=0 docker-compose up -d
    docker-compose ps -a
    echo '======== done switching'
  else
    echo '======== switching to version b'
    VERSION_A_REPLICA=4 VERSION_B_REPLICA=4 docker-compose up -d
    VERSION_A_REPLICA=0 VERSION_B_REPLICA=8 docker-compose up -d
    docker-compose ps -a
    echo '======== done switching'
  fi
  shift
  echo '======== sleeping for 5s'
  sleep 5
done
