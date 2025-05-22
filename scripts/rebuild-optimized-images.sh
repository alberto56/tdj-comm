#!/bin/bash
# Rebuild omtimized image list.
# See https://github.com/dcycle/thumbor-example

set -e

git clone https://github.com/dcycle/thumbor-example.git

# Copy images and media folder to thumbor-example
mv docs/media thumbor-example/my-media
mv docs/images thumbor-example/my-images

cd thumbor-example

# Generate image mapping for media folder
./scripts/generate-image-map.sh \
  ./app/my-media \
  beta.terredesjeunes.org/media \
  800x,x680,600x,604x200,x520,x451,x386,x368,x200,x160,120x120,100x100,75x75 \
  ./app/unversioned/mapping-media-beta-tdj-comm.json

# Generate image mapping for images folder
./scripts/generate-image-map.sh \
  ./app/my-images \
  beta.terredesjeunes.org/images \
  50x50,100x100,150x150,350x350,x368,600x,600x680 \
  ./app/unversioned/mapping-images-beta-tdj-comm.json

# merge images and media folders images map json files
./scripts/merge-image-map-json-files.sh \
  "./app/unversioned/mapping-media-beta-tdj-comm.json,./app/unversioned/mapping-images-beta-tdj-comm.json" \
  ./app/unversioned/mapping-beta-tdj-comm.json \
  && echo "done"
