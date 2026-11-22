# Instructions pour les agents IA

## Principe d'Atlas

Atlas est un thème Jekyll pour présenter des plans de formation de
l'enseignement professionnel. Ce dépôt contient le thème, pas les données
d'un plan de formation particulier. Un autre dépôt peut utiliser Atlas comme
thème distant sur GitHub Pages et fournir ses propres pages et sa configuration.

Les cours sont des pages Jekyll dont le front matter indique `layout: cours`.
Leurs métadonnées (par exemple `title`, `type`, `code`, `periodes`, `cursus` et
`competences`) servent à produire plusieurs vues à partir des mêmes données :
fiche de cours, liste de cours, vue du cursus, tableau des compétences et export
CSV. Les champs et leurs identifiants constituent donc une interface entre le
thème et les sites qui l'utilisent : préserver leur compatibilité.

La documentation de référence se trouve dans le
[wiki Atlas](https://github.com/eracom/atlas/wiki). Un
[plan de formation exemple](https://code.eracom-pedagogique.ch/formation-exemple/cursus.html)
illustre le résultat.

## Organisation

- `_layouts/` contient les gabarits de pages : notamment `cours`, `liste`,
  `cursus`, `competences` et `export-csv`.
- `_includes/` contient les fragments Liquid partagés, dont les métadonnées,
  la navigation et les lignes des tableaux.
- `assets/css/style.css` contient tous les styles, en CSS natif (variables
  CSS, imbrication, media queries) : pas de Sass ni de compilation. Les
  variables sont déclarées dans `:root` ; les points de rupture (42em, 64em)
  sont écrits en dur dans les `@media`. `assets/js/` contient le JavaScript.
- `_config.yml` configure le site de ce dépôt ; `index.md` et
  `another-page.md` sont des pages de démonstration, pas un plan de formation
  complet.

## Avant de modifier le thème

- Examiner les layouts et includes concernés, ainsi que leurs dépendances :
  une modification des métadonnées ou du calcul des périodes peut toucher
  plusieurs vues.
- Dans les vues existantes, les cours sont recherchés parmi `site.pages` avec
  `layout: cours`. Les définitions de compétences sont notamment lues depuis
  le champ `comp` d'une page intitulée `Objectifs` ; les cours les référencent
  par leurs identifiants dans `competences`.
- Respecter les conventions existantes de Jekyll, Liquid, HTML, SCSS et la
  langue française des contenus. Utiliser `relative_url` pour les liens
  internes afin de préserver les sites publiés dans un sous-chemin.
- Ne pas supposer que les données d'un site utilisateur sont présentes dans
  ce dépôt. Ne pas modifier un plan de formation particulier pour corriger le
  thème, sauf demande explicite.
- En cas de changement du format attendu ou du comportement partagé, mettre à
  jour la documentation concernée et signaler les éventuelles incompatibilités.

## Vérification

Lorsque les dépendances Ruby sont disponibles, utiliser `bundle exec jekyll build`
pour vérifier la génération. Pour une modification des vues de formation,
vérifier aussi le rendu avec un site ou des données représentatives : les pages
de démonstration de ce dépôt ne couvrent pas les cours, les compétences et les
cursus. Indiquer clairement les vérifications non effectuées et leurs raisons.
