#!/usr/bin/env bash

STYLESHEETS=( ./dist/assets/stylesheets/*.css )
IMAGES=( ./dist/assets/images/**/*.jpg ./dist/assets/images/*.png ./dist/assets/images/*.svg ./dist/assets/images/*.jpg) # TODO improve this glob
HTML=( ./dist/*.html )

function addIntegrityAttribute {
  assetFilename=${1}
  integritySha=${2}

  # this is a OSX and unix compatible script
  shopt -s nullglob
  for html in ${HTML[@]}; do
    # delimiter ~ used so as not to conflict with / found in integrity sha
    sed -i.bak "s~${assetFilename}\"~${assetFilename}\" integrity=\"${integritySha}\"~g" ${html}
    rm ${html}.bak
  done
}

function createAssetIntegrity {
  assets=( "$@" )

  shopt -s nullglob
  for asset in "${assets[@]}"; do

    assetIntegritySha=$(createIntegritySha ${asset})
    assetFilename=$(basename ${asset})

    addIntegrityAttribute ${assetFilename} ${assetIntegritySha}
  done
}

function createIntegritySha {
  echo $( echo "sha384-"$(cat ${1} | openssl dgst -sha384 -binary | openssl enc -base64 -A))
  return 0
}

set -o errexit
echo "---- Adding integrity to Public assets"
createAssetIntegrity "${STYLESHEETS[@]}"
