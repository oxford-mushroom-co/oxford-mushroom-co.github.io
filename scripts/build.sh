#!/usr/bin/env bash
PATH="/usr/local/bin:$PATH"

set -o errexit
echo "---- Running Production build"

npm run clean:dist
npm run build:css && npm run copy:images && npm run build:html && \
npm run hash:images && npm run hash:assets
