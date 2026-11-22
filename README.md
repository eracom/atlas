# Atlas - thème Jekyll pour plan de formation

Atlas est un système basé sur Jekyll, créé pour gérer des plans de formation, dans l'enseignement professionnel.

Ce dossier contient un thème Jekyll, dérivé du [thème Cayman](https://github.com/pages-themes/cayman/).

## Comment ça fonctionne? 🤔

👉 Toute la documentation est [dans le wiki](https://github.com/eracom/atlas/wiki).

👉 Voici un [exemple de plan de formation](https://code.eracom-pedagogique.ch/formation-exemple/cursus.html) utilisant Atlas.

📺 Et il y a une vidéo explicative: [lien Youtube](https://www.youtube.com/watch?v=5RT4l1X9xG4) 

## Développement local du thème 🛠️

Les styles sont dans un seul fichier, `assets/css/style.css`, en CSS natif (variables CSS, imbrication) : aucune compilation Sass n'est nécessaire.

Les sites peuvent pointer vers ce dossier avec des liens symboliques (`_includes`, `_layouts`, `assets`). Mais la gem `github-pages` impose le mode `safe`, même en local : les **includes** en lien symbolique sont alors ignorés, et Jekyll utilise ceux d'Atlas sur GitHub (les layouts, eux, sont bien lus).

Pour tester les includes locaux, lancer le site avec le script fourni, depuis le dossier du site :

```sh
../atlas/_dev/serve.sh          # jekyll serve
../atlas/_dev/serve.sh build    # jekyll build
```

Ce script ne change rien sur GitHub Pages : une modification d'include n'y sera visible qu'une fois Atlas poussé.
