// AlfaTranslate — App Logic
// Gruppo Alfano S.p.A.

// ─── State ──────────────────────────────────────────────────────────────────
const state = {
  query: '',
  category: 'all',
  activeTermId: null,
  history: []
};

// ─── Search Engine ───────────────────────────────────────────────────────────

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .trim();
}

function scoreMatch(term, q) {
  if (!q) return 1;
  const nq = normalize(q);
  let score = 0;

  // Exact EN term match
  if (normalize(term.en) === nq) score += 100;
  // Starts with
  else if (normalize(term.en).startsWith(nq)) score += 80;
  // EN contains
  else if (normalize(term.en).includes(nq)) score += 60;

  // IT term
  if (normalize(term.it) === nq) score += 90;
  else if (normalize(term.it).startsWith(nq)) score += 70;
  else if (normalize(term.it).includes(nq)) score += 50;

  // Definition
  if (normalize(term.definition).includes(nq)) score += 20;

  // Tags
  if (term.tags.some(t => normalize(t.replace(/_/g, ' ')).includes(nq))) score += 30;

  return score;
}

function search(query, category) {
  const nq = normalize(query);

  // Score every term
  const scored = GLOSSARY.map(term => ({
    term,
    score: scoreMatch(term, nq)
  })).filter(({ score, term }) => {
    if (category !== 'all' && term.category !== category) return false;
    return !nq || score > 0;
  });

  scored.sort((a, b) => b.score - a.score);

  const direct = scored.map(s => s.term);

  // Related concepts: BFS from all direct matches
  const directIds = new Set(direct.map(t => t.id));
  const relatedIds = new Set();

  direct.forEach(term => {
    term.related.forEach(rid => {
      if (!directIds.has(rid)) relatedIds.add(rid);
    });
  });

  // If category filter is active, also include related terms from other categories
  // but still prioritize the filtered ones
  const related = [];
  relatedIds.forEach(rid => {
    const t = GLOSSARY_MAP[rid];
    if (t) related.push(t);
  });

  related.sort((a, b) => a.en.localeCompare(b.en));

  return { direct, related };
}

// ─── Rendering ───────────────────────────────────────────────────────────────

const CATEGORY_BADGE = {
  finance:      { label: 'Finance',     cls: 'badge-finance' },
  realestate:   { label: 'Real Estate', cls: 'badge-realestate' },
  construction: { label: 'Edilizia',    cls: 'badge-construction' }
};

function highlight(text, query) {
  if (!query) return escHtml(text);
  const nq = normalize(query);
  const nt = normalize(text);
  const idx = nt.indexOf(nq);
  if (idx === -1) return escHtml(text);
  return escHtml(text.slice(0, idx))
    + '<mark>' + escHtml(text.slice(idx, idx + query.length)) + '</mark>'
    + escHtml(text.slice(idx + query.length));
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderCard(term, query, isRelated = false) {
  const badge = CATEGORY_BADGE[term.category];
  return `
    <article class="card ${isRelated ? 'card-related' : ''}"
             data-id="${term.id}"
             role="button"
             tabindex="0"
             aria-label="${term.en} — ${term.it}">
      <div class="card-header">
        <div class="card-terms">
          <span class="card-en">${highlight(term.en, query)}</span>
          <span class="card-it">${highlight(term.it, query)}</span>
        </div>
        <span class="badge ${badge.cls}">${badge.label}</span>
      </div>
      <p class="card-definition">${highlight(term.definition, query)}</p>
      ${isRelated ? '<span class="related-tag">concetto correlato</span>' : ''}
    </article>`;
}

function renderResults(direct, related, query) {
  const container = document.getElementById('results');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');

  if (direct.length === 0 && related.length === 0) {
    container.innerHTML = '';
    count.textContent = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  const total = direct.length + related.length;
  count.textContent = query
    ? `${direct.length} risultat${direct.length === 1 ? 'o' : 'i'} diretti${related.length > 0 ? ` · ${related.length} correlati` : ''}`
    : `${total} termini`;

  let html = '';

  if (direct.length > 0) {
    html += direct.map(t => renderCard(t, query)).join('');
  }

  if (related.length > 0 && query) {
    html += `
      <div class="section-divider">
        <span>Concetti correlati</span>
      </div>`;
    html += related.map(t => renderCard(t, query, true)).join('');
  }

  container.innerHTML = html;

  // Attach click/keyboard events
  container.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openDetail(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openDetail(card.dataset.id);
    });
  });
}

// ─── Detail Panel ────────────────────────────────────────────────────────────

function openDetail(id) {
  const term = GLOSSARY_MAP[id];
  if (!term) return;

  state.activeTermId = id;
  state.history.push(id);

  const badge = CATEGORY_BADGE[term.category];
  const relatedTerms = term.related
    .map(rid => GLOSSARY_MAP[rid])
    .filter(Boolean);

  const relatedChips = relatedTerms.map(rt => `
    <button class="chip" data-id="${rt.id}" aria-label="Vai a ${rt.en}">
      <span class="chip-en">${escHtml(rt.en)}</span>
      <span class="chip-it">${escHtml(rt.it)}</span>
    </button>`).join('');

  document.getElementById('detail-badge').className = `badge ${badge.cls}`;
  document.getElementById('detail-badge').textContent = badge.label;
  document.getElementById('detail-en').textContent = term.en;
  document.getElementById('detail-it').textContent = term.it;
  document.getElementById('detail-definition').textContent = term.definition;
  document.getElementById('detail-tags').innerHTML = term.tags.map(tag =>
    `<span class="tag">${tag.replace(/_/g, ' ')}</span>`
  ).join('');
  document.getElementById('detail-related').innerHTML = relatedChips || '<span class="muted">Nessun termine correlato</span>';

  // Chip navigation
  document.getElementById('detail-related').querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => openDetail(chip.dataset.id));
  });

  const panel = document.getElementById('detail-panel');
  const overlay = document.getElementById('overlay');
  panel.classList.add('open');
  overlay.classList.add('show');
  panel.focus();

  // Update back button visibility
  document.getElementById('detail-back-nav').style.display =
    state.history.length > 1 ? 'flex' : 'none';
}

function closeDetail() {
  state.activeTermId = null;
  state.history = [];
  document.getElementById('detail-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function navigateBack() {
  if (state.history.length <= 1) { closeDetail(); return; }
  state.history.pop(); // remove current
  const prevId = state.history[state.history.length - 1];
  state.history.pop(); // will be re-added by openDetail
  openDetail(prevId);
}

// ─── Filters ─────────────────────────────────────────────────────────────────

function setCategory(cat) {
  state.category = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  refresh();
}

function refresh() {
  const { direct, related } = search(state.query, state.category);
  renderResults(direct, related, state.query);
}

// ─── Search Input ────────────────────────────────────────────────────────────

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

function init() {
  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', onSearchInput);

  document.getElementById('clear-btn').addEventListener('click', clearSearch);

  // Category filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
  });

  // Detail panel
  document.getElementById('detail-close').addEventListener('click', closeDetail);
  document.getElementById('detail-back-nav').addEventListener('click', navigateBack);
  document.getElementById('overlay').addEventListener('click', closeDetail);

  // Keyboard close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDetail();
  });

  // Stats
  const stats = document.getElementById('stats-summary');
  const counts = { finance: 0, realestate: 0, construction: 0 };
  GLOSSARY.forEach(t => counts[t.category]++);
  stats.textContent =
    `${GLOSSARY.length} termini · ${counts.finance} Finance · ${counts.realestate} Real Estate · ${counts.construction} Edilizia`;

  // Initial render
  refresh();
}

document.addEventListener('DOMContentLoaded', init);
