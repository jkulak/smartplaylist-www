#!/bin/sh

WORKING_DIR=/home/www/smartplaylist_www
IMAGE_NAME=jkulak/smartplaylist-www:latest

docker pull $IMAGE_NAME
docker tag $IMAGE_NAME www:current
docker stop www
docker rm www
docker run -d --name www -p 3001:3001 www:current
docker rmi $IMAGE_NAME
