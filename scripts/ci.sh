#!/bin/bash
# Runs the CI pipeline for the project
set -e

pwd
ls -lah
rm -rf ./docs/_site
docker run --user root --rm -v ./docs:/srv/jekyll jekyll/minimal:3.8 jekyll build
cat ./docs/_site/index.html
# https://github.com/dcycle/docker-html-validate
docker run --user root --rm --network tdj_comm -v "$(pwd)":/code dcycle/html-validate:3 /code/docs/_site/index.html
echo ""
echo "Done!"
echo ""
