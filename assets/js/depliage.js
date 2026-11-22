/*
 * Atlas – dépliage des tableaux d'objectifs
 *
 * Utilisé par le layout « objectifs ». Peut servir sur toute page qui reprend
 * le même balisage (styles dans assets/css/style.css, section « Tableau des
 * objectifs ») :
 *
 *   <div class="obj-tools" hidden>              (facultatif)
 *     <button data-action="open-all">…</button>
 *     <button data-action="close-all">…</button>
 *   </div>
 *   <table class="objectifs-table">
 *     <tr class="toggle-row" id="…">            ligne cliquable
 *       … <button class="toggle" aria-expanded="true">…</button>
 *       … <div class="desc-inline">…</div>       description dans la ligne
 *     </tr>
 *     <tr class="desc-row">…</tr>               ou description sur la ligne suivante
 *   </table>
 *
 * Sans JavaScript, tout reste visible. Le script ajoute la classe
 * .js-objectifs sur <html>, replie toutes les lignes, puis déplie celle visée
 * par l'ancre de l'adresse (#a1.2). Plusieurs tableaux par page sont possibles ;
 * les boutons « Tout déplier / Tout replier » agissent sur tous.
 *
 * Chargement : <script src="{{ '/assets/js/depliage.js' | relative_url }}"></script>
 * placé après le tableau (ou avec l'attribut defer).
 */
(function () {
  document.documentElement.classList.add('js-objectifs');

  var tools = document.querySelectorAll('.obj-tools');
  tools.forEach(function (t) { t.hidden = false; });

  var tables = document.querySelectorAll('.objectifs-table');
  if (!tables.length) { return; }

  var rows = document.querySelectorAll('.objectifs-table tr.toggle-row');

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

  tables.forEach(function (table) {
    table.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('.desc-inline')) { return; }
      var row = e.target.closest('tr.toggle-row');
      if (!row) { return; }
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
    if (el && el.classList.contains('toggle-row')) { setOpen(el, true); el.scrollIntoView(); }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();
