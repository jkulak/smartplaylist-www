#!/bin/sh

WORK_DIR=$(pwd)
NETWORK_NAME=smartplaylist_network
WWW_PORT=3001
IMAGE_NAME=jkulak/smartplaylist-www

# Build the image
docker build --no-cache -t $IMAGE_NAME .

# Run the container
docker run \
    -d --rm \
    --network $NETWORK_NAME \
    --name www \
    --env PORT=$WWW_PORT \
    -p $WWW_PORT:$WWW_PORT \
    -v $WORK_DIR/app/src:/app/src \
    $IMAGE_NAME yarn start
