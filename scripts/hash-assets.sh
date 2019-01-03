#!/usr/bin/env bash

STYLESHEETS=( ./dist/assets/stylesheets/*.css )
HTML=( ./dist/*.html )

function replaceAssetsInHtml {
  search=${1}
  replace=${2}

  # this is a OSX and unix compatible script
  shopt -s nullglob
  for html in "${HTML[@]}"; do
    sed -i.bak "s/${search}/${replace}/g" ${html}
    rm ${html}.bak
  done
}

function hashAssets {
  assets=( "$@" )

  shopt -s nullglob
  for asset in "${assets[@]}"; do

    name=$(basename ${asset})
    filename=${name%.*}
    extension=${asset##*.}
    path=${asset%/*}
    hash=$(createHash ${asset})
    filenameWithHash=${filename}-${hash}.min.${extension}

    replaceAssetsInHtml ${name} ${filenameWithHash}
    mv $asset ${path}/${filenameWithHash}
  done
}

function createHash {
  if builtin command -v md5 > /dev/null;
  then
    echo $(echo $(md5 -q ${1}) | cut -c1-10)
  elif builtin command -v md5sum > /dev/null;
  then
    echo $(echo $(md5sum ${1}) | cut -c1-10)
  fi

  return 0
}

set -o errexit
echo "---- Hashing Public assets"
hashAssets "${STYLESHEETS[@]}"
