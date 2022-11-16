#!/bin/sh

NETWORK_NAME=smartplaylist_network
WWW_PORT=3001
IMAGE_NAME=jkulak/smartplaylist-www

if [ $# -eq 1 ]
  then
    docker build --no-cache -t $IMAGE_NAME .
fi

docker run \
    -d --rm \
    --network $NETWORK_NAME \
    --name www \
    --env PORT=$WWW_PORT \
    -p $WWW_PORT:$WWW_PORT \
    -v $(pwd)/app/src:/app/src \
    $IMAGE_NAME yarn start
