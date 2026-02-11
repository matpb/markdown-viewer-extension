#!/bin/bash
# Package the Markdown Viewer extension into a zip for Chrome Web Store upload.
# Usage: ./package.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": *"\([^"]*\)".*/\1/')
OUTPUT="markdown-viewer-extension.zip"

rm -f "$OUTPUT"

zip -r "$OUTPUT" \
  manifest.json \
  background.js \
  content.js \
  viewer.html \
  viewer.js \
  icon.svg \
  icon16.png \
  icon48.png \
  icon128.png \
  LICENSE \
  lib/ \
  styles/

echo ""
echo "Packaged v${VERSION} -> ${OUTPUT}"
echo ""
unzip -l "$OUTPUT"
