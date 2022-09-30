#!/bin/sh

WORKING_DIR=/home/www/smartplaylist_www
IMAGE_NAME=jkulak/grabtrack-www:latest

docker pull $IMAGE_NAME
docker tag $IMAGE_NAME www:current
docker stop www
docker rm www
docker run \
    -d --name www \
    --network my-bridge-network \
    -p 80:80 -p 443:443 \
    -v $WORKING_DIR/certbot/www:/etc/nginx/ssl/live/smartplaylist.me/:ro \
    -v $WORKING_DIR/nginx/conf/:/etc/nginx/conf.d/:ro \
    $IMAGE_NAME
docker rmi $IMAGE_NAME
