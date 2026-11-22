#!/bin/sh
# Lance `jekyll serve` (ou une autre commande jekyll) pour un site utilisant Atlas,
# en lisant les includes et assets locaux d'Atlas (voir unsafe-local.rb).
#
# Depuis le dossier du site :
#   ../atlas/_dev/serve.sh            -> jekyll serve
#   ../atlas/_dev/serve.sh build      -> jekyll build
DEV_DIR="$(cd "$(dirname "$0")" && pwd)"
[ $# -eq 0 ] && set -- serve
export LANG="${LANG:-en_US.UTF-8}" LC_ALL="${LC_ALL:-en_US.UTF-8}"
RUBYOPT="-r$DEV_DIR/unsafe-local.rb $RUBYOPT" exec bundle exec jekyll "$@"
