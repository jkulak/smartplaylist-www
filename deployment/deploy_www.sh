#!/bin/sh

WORKING_DIR=/home/www/smartplaylist_www

docker pull jkulak/grabtrack-www:latest
docker tag jkulak/grabtrack-www:latest www:current
docker stop www
docker rm www
docker run -d --name www -p 80:80 -p 443:443 -v $WORKING_DIR/certbot/www:/etc/nginx/ssl/live/localhost/:ro -v $WORKING_DIR/nginx/conf/:/etc/nginx/conf.d/:ro -v $WORKING_DIR/app/public:/app/public:ro --restart always www:current
docker rmi jkulak/grabtrack-www:latest
