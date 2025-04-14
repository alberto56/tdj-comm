#!/bin/bash
# Get data from tdj content
set -e

if [ -z "$TDJ_CONTENT_REPO_DIR" ]; then
  echo "Please set the environment variable TDJ_CONTENT_REPO_DIR"
  exit 1
fi

BASE="$(pwd)"

echo ""
echo "UPDATING ALL REPOS"
echo ""

git checkout main
git pull origin main

cd "$TDJ_CONTENT_REPO_DIR"

git checkout master
git pull github master

for dir in \
jekyll_activites \
jekyll_antennes \
jekyll_bios \
jekyll_blogposts \
jekyll_carousel \
jekyll_categories \
jekyll_events \
jekyll_imageinfo \
jekyll_locations \
jekyll_pages \
jekyll_pays \
jekyll_texts \
media \
; do

  echo ""
  echo "SYNCHRONISING $dir"
  echo ""

  rsync --archive --exclude='.DS_Store' "$TDJ_CONTENT_REPO_DIR/docs/$dir" "$BASE/docs/"

done
