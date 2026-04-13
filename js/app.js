// AlfaTranslate — App Logic
// Gruppo Alfano S.p.A.

// ─── State ───────────────────────────────────────────────────────────────────
const state = {
  query:    '',
  category: 'all',
  level:    'all',
  activeTermId: null,
  history:  []
};

let customTerms = [];
let customTermsMap = {};

// ─── Search Engine ────────────────────────────────────────────────────────────

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function scoreMatch(term, nq) {
  if (!nq) return 1;
  let score = 0;
  const en  = normalize(term.en);
  const it  = normalize(term.it);
  const def = normalize(term.definition);
  const tags = term.tags.map(t => normalize(t.replace(/_/g, ' '))).join(' ');

  if (en === nq)              score += 100;
  else if (en.startsWith(nq)) score += 80;
  else if (en.includes(nq))   score += 60;

  if (it === nq)              score += 90;
  else if (it.startsWith(nq)) score += 70;
  else if (it.includes(nq))   score += 50;

  if (def.includes(nq))   score += 20;
  if (tags.includes(nq))  score += 30;
  return score;
}

function allTerms() {
  return [...GLOSSARY, ...customTerms];
}

function lookupTerm(id) {
  return GLOSSARY_MAP[id] || customTermsMap[id] || null;
}

function search(query, category, level) {
  const nq = normalize(query);
  const pool = allTerms();

  const direct = pool
    .filter(term => {
      if (category !== 'all' && term.category !== category) return false;
      if (level    !== 'all' && term.level    !== level)    return false;
      return !nq || scoreMatch(term, nq) > 0;
    })
    .sort((a, b) => a.en.localeCompare(b.en, 'en', { sensitivity: 'base' }));

  // Related concepts BFS (always alphabetical)
  if (!nq) return { direct, related: [] };

  const directIds = new Set(direct.map(t => t.id));
  const relatedIds = new Set();

  direct.forEach(term => {
    (term.related || []).forEach(rid => {
      if (!directIds.has(rid)) relatedIds.add(rid);
    });
  });

  const related = [];
  relatedIds.forEach(rid => {
    const t = lookupTerm(rid);
    if (!t) return;
    // Apply active filters to related too
    if (category !== 'all' && t.category !== category) return;
    if (level    !== 'all' && t.level    !== level)    return;
    related.push(t);
  });

  related.sort((a, b) => a.en.localeCompare(b.en, 'en', { sensitivity: 'base' }));
  return { direct, related };
}

// ─── Render ───────────────────────────────────────────────────────────────────

const CAT_BADGE = {
  finance:      { label: 'Finance',     cls: 'badge-finance' },
  realestate:   { label: 'Real Estate', cls: 'badge-realestate' },
  construction: { label: 'Edilizia',    cls: 'badge-construction' }
};

const LVL_BADGE = {
  base:     { label: 'Base',     cls: 'badge-base' },
  medio:    { label: 'Medio',    cls: 'badge-medio' },
  avanzato: { label: 'Avanzato', cls: 'badge-avanzato' }
};

function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function highlight(text, query) {
  if (!query) return esc(text);
  const nq = normalize(query);
  const nt = normalize(text);
  const i  = nt.indexOf(nq);
  if (i === -1) return esc(text);
  return esc(text.slice(0, i))
    + '<mark>' + esc(text.slice(i, i + query.length)) + '</mark>'
    + esc(text.slice(i + query.length));
}

function renderCard(term, query, isRelated = false) {
  const cb = CAT_BADGE[term.category] || {};
  const lb = LVL_BADGE[term.level]    || {};
  return `
    <article class="card${isRelated ? ' card-related' : ''}${term.isCustom ? ' card-custom' : ''}"
             data-id="${esc(term.id)}"
             role="button" tabindex="0"
             aria-label="${esc(term.en)} — ${esc(term.it)}">
      <div class="card-header">
        <div class="card-terms">
          <span class="card-en">${highlight(term.en, query)}</span>
          <span class="card-it">${highlight(term.it, query)}</span>
        </div>
        <div class="card-badges">
          <span class="badge ${lb.cls}">${lb.label}</span>
          <span class="badge ${cb.cls}">${cb.label}</span>
          ${term.isCustom ? '<span class="badge badge-custom">Nuovo</span>' : ''}
        </div>
      </div>
      <p class="card-definition">${highlight(term.definition, query)}</p>
      ${isRelated ? '<span class="related-tag">concetto correlato</span>' : ''}
    </article>`;
}

function renderResults(direct, related, query) {
  const container = document.getElementById('results');
  const countEl   = document.getElementById('result-count');
  const emptyEl   = document.getElementById('empty-state');

  if (direct.length === 0 && related.length === 0) {
    container.innerHTML = '';
    countEl.textContent = '';
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  countEl.textContent = query
    ? `${direct.length} risultat${direct.length === 1 ? 'o' : 'i'}${related.length ? ` · ${related.length} correlati` : ''}`
    : `${direct.length + related.length} termini`;

  let html = direct.map(t => renderCard(t, query)).join('');

  if (related.length > 0 && query) {
    html += `<div class="section-divider"><span>Concetti correlati</span></div>`;
    html += related.map(t => renderCard(t, query, true)).join('');
  }

  container.innerHTML = html;

  container.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click',   () => openDetail(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openDetail(card.dataset.id);
    });
  });
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function openDetail(id) {
  const term = lookupTerm(id);
  if (!term) return;

  state.activeTermId = id;
  state.history.push(id);

  const cb = CAT_BADGE[term.category] || {};
  const lb = LVL_BADGE[term.level]    || {};

  document.getElementById('detail-cat-badge').className   = `badge ${cb.cls}`;
  document.getElementById('detail-cat-badge').textContent = cb.label;
  document.getElementById('detail-lvl-badge').className   = `badge ${lb.cls}`;
  document.getElementById('detail-lvl-badge').textContent = lb.label;
  document.getElementById('detail-en').textContent         = term.en;
  document.getElementById('detail-it').textContent         = term.it;
  document.getElementById('detail-definition').textContent = term.definition;

  document.getElementById('detail-tags').innerHTML =
    (term.tags || []).length
      ? term.tags.map(t => `<span class="tag">${esc(t.replace(/_/g,' '))}</span>`).join('')
      : '<span class="muted">—</span>';

  const chips = (term.related || [])
    .map(rid => lookupTerm(rid))
    .filter(Boolean)
    .map(rt => `
      <button class="chip" data-id="${esc(rt.id)}">
        <span class="chip-en">${esc(rt.en)}</span>
        <span class="chip-it">${esc(rt.it)}</span>
      </button>`).join('');

  document.getElementById('detail-related').innerHTML =
    chips || '<span class="muted">Nessun termine correlato</span>';

  document.getElementById('detail-related').querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => openDetail(chip.dataset.id));
  });

  document.getElementById('detail-back-nav').style.display =
    state.history.length > 1 ? 'flex' : 'none';

  const panel = document.getElementById('detail-panel');
  document.getElementById('overlay').classList.add('show');
  panel.classList.add('open');
  panel.scrollTop = 0;
  panel.focus();
}

function closeDetail() {
  state.activeTermId = null;
  state.history = [];
  document.getElementById('detail-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function navigateBack() {
  if (state.history.length <= 1) { closeDetail(); return; }
  state.history.pop();
  const prevId = state.history.pop();
  openDetail(prevId);
}

// ─── Add Term Modal ───────────────────────────────────────────────────────────

function openAddModal() {
  document.getElementById('add-form').reset();
  document.getElementById('add-error').textContent = '';
  document.getElementById('add-modal').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.getElementById('add-en').focus();

  if (!DB_CONFIGURED) {
    document.getElementById('db-notice').hidden = false;
  } else {
    document.getElementById('db-notice').hidden = true;
  }
}

function closeAddModal() {
  document.getElementById('add-modal').classList.remove('open');
  if (!document.getElementById('detail-panel').classList.contains('open')) {
    document.getElementById('overlay').classList.remove('show');
  }
  document.getElementById('fab').focus();
}

async function submitNewTerm(e) {
  e.preventDefault();
  const btn     = document.getElementById('add-submit');
  const errEl   = document.getElementById('add-error');
  errEl.textContent = '';
  btn.disabled  = true;
  btn.textContent = 'Salvataggio…';

  const data = {
    en:         document.getElementById('add-en').value.trim(),
    it:         document.getElementById('add-it').value.trim(),
    definition: document.getElementById('add-definition').value.trim(),
    category:   document.getElementById('add-category').value,
    level:      document.getElementById('add-level').value
  };

  try {
    const saved = await saveCustomTerm(data);
    customTerms.push(saved);
    customTermsMap[saved.id] = saved;
    closeAddModal();
    showToast('Termine aggiunto con successo!');
    refresh();
  } catch (err) {
    errEl.textContent = 'Errore nel salvataggio: ' + err.message;
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Aggiungi termine';
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Filters ──────────────────────────────────────────────────────────────────

function setCategory(cat) {
  state.category = cat;
  document.querySelectorAll('.filter-cat').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
    b.setAttribute('aria-pressed', b.dataset.cat === cat);
  });
  refresh();
}

function setLevel(lvl) {
  state.level = lvl;
  document.querySelectorAll('.filter-lvl').forEach(b => {
    b.classList.toggle('active', b.dataset.lvl === lvl);
    b.setAttribute('aria-pressed', b.dataset.lvl === lvl);
  });
  refresh();
}

function refresh() {
  const { direct, related } = search(state.query, state.category, state.level);
  renderResults(direct, related, state.query);
}

// ─── Search Input ─────────────────────────────────────────────────────────────

let debounceTimer;
function onSearchInput(e) {
  clearTimeout(debounceTimer);
  state.query = e.target.value;
  document.getElementById('clear-btn').style.display = state.query ? 'flex' : 'none';
  debounceTimer = setTimeout(refresh, 160);
}

function clearSearch() {
  state.query = '';
  document.getElementById('search-input').value = '';
  document.getElementById('clear-btn').style.display = 'none';
  refresh();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  // Load shared custom terms
  try {
    customTerms = await loadCustomTerms();
    customTerms.forEach(t => { customTermsMap[t.id] = t; });
  } catch { /* start without custom terms */ }

  // Search
  document.getElementById('search-input').addEventListener('input', onSearchInput);
  document.getElementById('clear-btn').addEventListener('click', clearSearch);

  // Category filters
  document.querySelectorAll('.filter-cat').forEach(btn =>
    btn.addEventListener('click', () => setCategory(btn.dataset.cat))
  );

  // Level filters
  document.querySelectorAll('.filter-lvl').forEach(btn =>
    btn.addEventListener('click', () => setLevel(btn.dataset.lvl))
  );

  // Detail panel
  document.getElementById('detail-close').addEventListener('click',    closeDetail);
  document.getElementById('detail-back-nav').addEventListener('click', navigateBack);

  // Add term
  document.getElementById('fab').addEventListener('click', openAddModal);
  document.getElementById('add-close').addEventListener('click', closeAddModal);
  document.getElementById('add-form').addEventListener('submit', submitNewTerm);

  // Overlay
  document.getElementById('overlay').addEventListener('click', () => {
    if (document.getElementById('add-modal').classList.contains('open')) closeAddModal();
    else closeDetail();
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('add-modal').classList.contains('open')) closeAddModal();
      else closeDetail();
    }
  });

  // Stats
  const counts = { finance: 0, realestate: 0, construction: 0 };
  GLOSSARY.forEach(t => counts[t.category]++);
  document.getElementById('stats-summary').textContent =
    `${GLOSSARY.length + customTerms.length} termini · ${counts.finance} Finance · ${counts.realestate} Real Estate · ${counts.construction} Edilizia`;

  refresh();
}

document.addEventListener('DOMContentLoaded', init);
