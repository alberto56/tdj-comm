#!/bin/bash
# Runs the CI pipeline for the project
set -e

pwd
ls -lah
docker compose -f docker-compose.yml up -d
# https://github.com/dcycle/docker-html-validate
docker run --rm -v "$(pwd)":/code dcycle/html-validate:3 /code/docs/_site/index.html
