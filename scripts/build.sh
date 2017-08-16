#!/usr/bin/env bash
PATH="/usr/local/bin:$PATH"

set -o errexit
echo "---- Running Production build"

npm run clean:dist
npm run build:css && npm run build:js && npm run build:html && \
npm run copy:images && npm run copy:favicon && \
npm run hash:images && npm run hash:assets
