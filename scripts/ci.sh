#!/bin/bash
# Runs the CI pipeline for the project
set -e

pwd
ls -lah
docker compose -f docker-compose.yml down
docker network ls | grep tdj_comm || docker network create tdj_comm
docker compose -f docker-compose.yml up -d
sleep 3
docker run --rm --network tdj_comm --entrypoint /bin/sh dcycle/html-validate:3 -c "apk add curl && curl -I http://jekyll:4000 && curl http://jekyll:4000"
# https://github.com/dcycle/docker-html-validate
docker run --rm --network tdj_comm dcycle/html-validate:3 http://jekyll:4000
docker compose -f docker-compose.yml down
echo ""
echo "Done!"
echo ""
