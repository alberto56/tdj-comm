#!/bin/bash
# Runs the CI pipeline for the project
set -e

docker-compose up -d
# https://github.com/dcycle/docker-html-validate
find docs/_site -name "index.html" | xargs \
  docker run --rm -v "$(pwd)":/code dcycle/html-validate:3
