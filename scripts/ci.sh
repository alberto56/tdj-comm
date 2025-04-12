#!/bin/bash
# Runs the CI pipeline for the project
set -e

pwd
ls -lah
rm -rf docs/_site
docker compose -f docker-compose.yml down
docker network ls | grep tdj_comm || docker network create tdj_comm
docker compose -f docker-compose.yml up -d
sleep 3
# https://github.com/dcycle/docker-html-validate
docker run --rm --network tdj_comm -v "$(pwd)":/code dcycle/html-validate:3 /code/docs/_site/index.html
docker compose -f docker-compose.yml down
echo ""
echo "Done!"
echo ""
