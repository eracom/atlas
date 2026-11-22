# Développement local uniquement.
#
# La gem github-pages impose `safe: true`, même en local. En mode safe, Jekyll
# ignore les liens symboliques qui pointent hors du site, notamment
# `_includes -> ../atlas/_includes` et `assets -> ../atlas/assets` : ce sont
# alors les includes et les assets (CSS, JS) d'Atlas sur GitHub (remote_theme)
# qui sont utilisés. Seuls les layouts locaux sont lus.
#
# Ce hook remet `safe` à false après la configuration de github-pages, pour que
# les includes et assets locaux d'Atlas soient pris en compte. Sans effet sur
# GitHub Pages.
#
# Utilisation : voir _dev/serve.sh
require "bundler/setup"
require "jekyll"

Jekyll::Hooks.register :site, :after_reset, priority: :low do |site|
  site.config["safe"] = false
  site.safe = false
end
