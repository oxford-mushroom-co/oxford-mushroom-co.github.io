#!/usr/bin/env bash
PATH="/usr/local/bin:$PATH"

set -o errexit
echo "---- Running Deploy"

npm run build && \
git checkout master && \
rm -rf assets/ && rm -f index.html && \
mv dist/* . && \
git add . && git commit && git push origin master && \
git checkout -
