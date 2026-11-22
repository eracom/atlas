# Atlas - thème Jekyll pour plan de formation

Atlas est un système basé sur Jekyll, créé pour gérer des plans de formation, dans l'enseignement professionnel.

Ce dossier contient un thème Jekyll, dérivé du [thème Cayman](https://github.com/pages-themes/cayman/).

## Comment ça fonctionne? 🤔

👉 Toute la documentation est [dans le wiki](https://github.com/eracom/atlas/wiki).

👉 Voici un [exemple de plan de formation](https://code.eracom-pedagogique.ch/formation-exemple/cursus.html) utilisant Atlas.

📺 Et il y a une vidéo explicative: [lien Youtube](https://www.youtube.com/watch?v=5RT4l1X9xG4) 

## Développement local du thème 🛠️

Les styles sont dans un seul fichier, `assets/css/style.css`, en CSS natif (variables CSS, imbrication) : aucune compilation Sass n'est nécessaire.

Les sites peuvent pointer vers ce dossier avec des liens symboliques (`_includes`, `_layouts`, `assets`). Mais la gem `github-pages` impose le mode `safe`, même en local : les liens symboliques **`_includes`** et **`assets`** (CSS, JavaScript) sont alors ignorés, et Jekyll utilise les fichiers d'Atlas sur GitHub. Seuls les layouts locaux sont lus.

Pour tester les includes et assets locaux, il faut désactiver le mode `safe` en local. Les outils pour cela sont dans un dossier `_dev/`, ignoré par Git (il n'est pas publié sur GitHub). Pour le recréer :

1. Créer `_dev/unsafe-local.rb`, un hook Jekyll qui remet `safe` à `false` après la configuration de `github-pages` :

   ```ruby
   require "bundler/setup"
   require "jekyll"

   Jekyll::Hooks.register :site, :after_reset, priority: :low do |site|
     site.config["safe"] = false
     site.safe = false
   end
   ```

2. Lancer le site en chargeant ce hook, depuis le dossier du site :

   ```sh
   RUBYOPT="-r../atlas/_dev/unsafe-local.rb" bundle exec jekyll serve
   ```

   Si le dossier `_dev/` contient aussi le script `serve.sh`, il fait la même chose : `../atlas/_dev/serve.sh` (ou `../atlas/_dev/serve.sh build`).

Cela ne change rien sur GitHub Pages : une modification d'include ou d'asset n'y sera visible qu'une fois Atlas poussé.
