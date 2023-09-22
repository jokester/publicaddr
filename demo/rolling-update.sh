#!/usr/bin/env bash

set -ue
cd $(dirname "$0")


OLD_IMAGE=ghcr.io/jokester/publicaddr:sha-2ab74ce
NEW_IMAGE=ghcr.io/jokester/publicaddr:sha-12620a3

# SLOT1_IMAGE="" 
# SLOT2_IMAGE="" 

# start with old images
#
init () {
  docker-compose up -d
}

case "${1:-UNDEF}" in
  UNDEF)
    cat <<END
    USAGE: $0 reset|upgrade
END
    ;;
  reset)
    SLOT1_IMAGE=$OLD_IMAGE SLOT2_IMAGE=$OLD_IMAGE docker-compose up -d
    ;;
  upgrade)
    SLOT1_IMAGE=$OLD_IMAGE SLOT2_IMAGE=$NEW_IMAGE SLOT1_REPLICA=2 SLOT2_REPLICA=2 docker-compose up -d
    SLOT1_IMAGE=$OLD_IMAGE SLOT2_IMAGE=$NEW_IMAGE SLOT1_REPLICA=0 SLOT2_REPLICA=4 docker-compose up -d
    SLOT1_IMAGE=$NEW_IMAGE SLOT2_IMAGE=$NEW_IMAGE SLOT1_REPLICA=2 SLOT2_REPLICA=2 docker-compose up -d
    SLOT1_IMAGE=$NEW_IMAGE SLOT2_IMAGE=$NEW_IMAGE SLOT1_REPLICA=4 SLOT2_REPLICA=0 docker-compose up -d

esac

