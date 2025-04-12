#!/bin/bash
# Runs the CI pipeline for the project
set -e

pwd
ls -lah
docker network ls | grep tdj_comm || docker network create tdj_comm
docker compose -f docker-compose.yml up -d
# https://github.com/dcycle/docker-html-validate
docker run --rm --network tdj_comm dcycle/html-validate:3 http://jekyll:4000 -F text
docker compose down
