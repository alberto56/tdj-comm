#!/bin/bash
# Runs the CI pipeline for the project
set -e

pwd
ls -lah
rm -rf ./docs/_site/*
docker run -v ./docs:/srv/jekyll --rm jekyll/minimal:3.8 jekyll build
cat ./docs/_site/index.html
# https://github.com/dcycle/docker-html-validate
docker run --rm --network tdj_comm -v "$(pwd)":/code dcycle/html-validate:3 /code/docs/_site/index.html
echo ""
echo "Done!"
echo ""
