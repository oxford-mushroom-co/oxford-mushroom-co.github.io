#!/usr/bin/env bash

STYLESHEETS=( ./dist/assets/stylesheets/*.css )
IMAGES=( ./dist/assets/images/**/*.jpg ./dist/assets/images/*.png ) # TODO improve this glob
HTML=( ./dist/*.html )

function replaceAssets {
  search=${1}
  replace=${2}
  assets=( "${@:3}" )

  # this is a OSX and unix compatible script
  shopt -s nullglob
  for asset in "${assets[@]}"; do
    sed -i.bak "s/${search}/${replace}/g" ${asset}
    rm ${asset}.bak
  done
}

function hashImages {
  images=( "$@" )

  shopt -s nullglob
  for image in "${images[@]}"; do

    name=$(basename ${image})
    filename=${name%.*}
    extension=${image##*.}
    path=${image%/*}
    hash=$(createHash ${image})
    filenameWithHash=${filename}-${hash}.${extension}

    replaceAssets ${name} ${filenameWithHash} "${HTML[@]}"
    replaceAssets ${name} ${filenameWithHash} "${STYLESHEETS[@]}"

    mv ${image} ${path}/${filenameWithHash}
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
echo "---- Hashing Images and updating HTML, CSS and JavaScript"
hashImages "${IMAGES[@]}"
