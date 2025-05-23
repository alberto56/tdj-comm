#!/bin/bash
# Rebuild omtimized image list.
# See https://github.com/dcycle/thumbor-example

set -e

git clone https://github.com/dcycle/thumbor-example.git

# mv media folder to thumbor-example
mv docs/media thumbor-example/my-media

cd thumbor-example

# Generate image mapping for media folder
./scripts/generate-image-map.sh \
  ./app/my-media \
  beta.terredesjeunes.org/media \
  800x,x680,600x,604x200,x520,x451,x386,x368,x200,x160,120x120,100x100,75x75 \
  ./app/unversioned/mapping-beta-tdj-comm.json
