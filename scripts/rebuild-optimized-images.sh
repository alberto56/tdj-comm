#!/bin/bash
# Rebuild omtimized image list.
# See https://github.com/dcycle/thumbor-example

set -e

git clone https://github.com/dcycle/thumbor-example.git
mv docs/media thumbor-example/my-media
cd thumbor-example
# Generate image mapping for media folder
./scripts/generate-image-map.sh \
  ./app/my-media \
  beta.terredesjeunes.org/media \
  800x,x680,x520,x451,x200,x160,75x75,x20 \
  ./app/mapping-beta-tdj-comm.json \
  && echo "done"
