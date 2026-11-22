/*
 * Atlas – éléments dépliables
 *
 * Utilisé par les layouts « objectifs » (tableau des objectifs) et « cours »
 * (objectifs évaluateurs de la fiche de cours). Peut servir sur toute page qui
 * reprend l'un de ces balisages (styles dans assets/css/style.css, section
 * « Éléments dépliables communs ») :
 *
 *   Conteneur : <table class="objectifs-table"> ou <ul class="objectifs-cours">
 *
 *   <tr|li class="toggle-row" id="…">           ligne cliquable (id facultatif)
 *     … <button class="toggle" aria-expanded="true">…</button>
 *     … <div class="desc-inline">…</div>         description dans la ligne
 *   </tr|li>
 *   <tr class="desc-row">…</tr>                 ou description sur la ligne suivante
 *
 *   <div class="obj-tools" hidden>              boutons facultatifs
 *     <button data-action="open-all">…</button>
 *     <button data-action="close-all">…</button>
 *   </div>
 *
 * Sans JavaScript, tout reste visible. Le script ajoute la classe .js-depliage
 * sur <html>, replie toutes les lignes, puis déplie celle visée par l'ancre de
 * l'adresse (#a1.2). Plusieurs conteneurs par page sont possibles ; les boutons
 * « Tout déplier / Tout replier » agissent sur tous.
 *
 * Chargement : <script src="{{ '/assets/js/depliage.js' | relative_url }}"></script>
 * placé après les conteneurs (ou avec l'attribut defer).
 */
(function () {
  var CONTENEURS = '.objectifs-table, .objectifs-cours';

  document.documentElement.classList.add('js-depliage');

  var tools = document.querySelectorAll('.obj-tools');
  tools.forEach(function (t) { t.hidden = false; });

  var conteneurs = document.querySelectorAll(CONTENEURS);
  if (!conteneurs.length) { return; }

  var rows = [];
  conteneurs.forEach(function (c) {
    rows.push.apply(rows, c.querySelectorAll('.toggle-row'));
  });

  function setOpen(row, open) {
    var desc = row.querySelector('.desc-inline');
    if (!desc) {
      desc = row.nextElementSibling;
      if (!desc || !desc.classList.contains('desc-row')) { return; }
    }
    row.classList.toggle('open', open);
    desc.classList.toggle('open', open);
    var b = row.querySelector('.toggle');
    if (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }

  // Tout est replié au départ, sauf si l'adresse pointe sur une ligne précise.
  rows.forEach(function (r) { setOpen(r, false); });

  conteneurs.forEach(function (c) {
    c.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('.desc-inline')) { return; }
      var row = e.target.closest('.toggle-row');
      if (!row || !c.contains(row)) { return; }
      setOpen(row, !row.classList.contains('open'));
    });
  });

  tools.forEach(function (t) {
    t.addEventListener('click', function (e) {
      var a = e.target.getAttribute('data-action');
      if (!a) { return; }
      rows.forEach(function (r) { setOpen(r, a === 'open-all'); });
    });
  });

  function openFromHash() {
    if (!location.hash) { return; }
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el && el.classList.contains('toggle-row') && rows.indexOf(el) !== -1) {
      setOpen(el, true);
      el.scrollIntoView();
    }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
