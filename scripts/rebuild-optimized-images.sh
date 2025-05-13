#!/bin/bash
# Rebuild omtimized image list.
# See https://github.com/dcycle/thumbor-example

set -e

git clone https://github.com/dcycle/thumbor-example.git
mv docs/media thumbor-example/my-media
cd thumbor-example
# Generate image mapping for media folder
./scripts/generate-image-map.sh ./app/my-media beta.terredesjeunes.org/media 800x,x200,x160,x200,75x75,600x680,x680 ./app/mapping-beta-tdj-comm.json
# Generate image mapping for images folder
./scripts/generate-image-map.sh ./app/my-images beta.terredesjeunes.org/images 800x,x200,x160,x200,75x75,600x680,x680 ./app/mapping-images-beta-tdj-comm.json
