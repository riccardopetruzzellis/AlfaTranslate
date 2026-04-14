// AlfaTranslate — Database Layer
// Supabase REST API (condiviso) con fallback automatico su localStorage

const LOCAL_KEY = 'alfatranslate_custom_v2';

// ─── Supabase helpers ────────────────────────────────────────────────────────

function sbHeaders(extra = {}) {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra
  };
}

// ─── Load custom terms ───────────────────────────────────────────────────────

async function loadCustomTerms() {
  if (!DB_CONFIGURED) return getLocalTerms();
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/custom_terms?select=*&order=created_at.asc`,
      { headers: sbHeaders(), signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    return rows.map(rowToTerm);
  } catch (err) {
    console.warn('Supabase non raggiungibile, uso localStorage:', err.message);
    return getLocalTerms();
  }
}

// ─── Save custom term ────────────────────────────────────────────────────────

async function saveCustomTerm(data) {
  const payload = {
    en:         data.en.trim(),
    it:         data.it.trim(),
    definition: data.definition.trim(),
    category:   data.category,
    level:      data.level,
    tags:       parseTags(data.tags || ''),
    related:    []
  };

  if (!DB_CONFIGURED) {
    return saveLocalTerm(payload);
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/custom_terms`, {
      method:  'POST',
      headers: sbHeaders({ 'Prefer': 'return=representation' }),
      body:    JSON.stringify(payload),
      signal:  AbortSignal.timeout(8000)
    });
    if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
    const [saved] = await res.json();
    const term = rowToTerm(saved);
    mirrorLocalTerm(term);
    return term;
  } catch (err) {
    console.warn('Supabase save fallback:', err.message);
    return { ...saveLocalTerm(payload), _offlineSaved: true };
  }
}

// ─── Update custom term ──────────────────────────────────────────────────────

async function updateCustomTerm(id, data) {
  const payload = {
    en:         data.en.trim(),
    it:         data.it.trim(),
    definition: data.definition.trim(),
    category:   data.category,
    level:      data.level,
    tags:       parseTags(data.tags || '')
  };

  if (!DB_CONFIGURED || String(id).startsWith('local_')) {
    return updateLocalTerm(id, payload);
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/custom_terms?id=eq.${encodeURIComponent(id)}`,
      {
        method:  'PATCH',
        headers: sbHeaders({ 'Prefer': 'return=representation' }),
        body:    JSON.stringify(payload),
        signal:  AbortSignal.timeout(8000)
      }
    );
    if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
    const rows = await res.json();
    if (!rows.length) throw new Error('Termine non trovato nel database');
    const updated = rowToTerm(rows[0]);
    updateLocalTerm(id, payload);
    return updated;
  } catch (err) {
    console.warn('Supabase update fallback:', err.message);
    return { ...updateLocalTerm(id, payload), _offlineSaved: true };
  }
}

// ─── Delete custom term ──────────────────────────────────────────────────────

async function deleteCustomTerm(id) {
  deleteLocalTerm(id);                      // rimuovi subito in locale

  if (!DB_CONFIGURED || String(id).startsWith('local_')) return;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/custom_terms?id=eq.${encodeURIComponent(id)}`,
      {
        method:  'DELETE',
        headers: sbHeaders(),
        signal:  AbortSignal.timeout(8000)
      }
    );
    if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  } catch (err) {
    console.warn('Supabase delete fallback (già rimosso in locale):', err.message);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rowToTerm(row) {
  return {
    id:         row.id,
    en:         row.en,
    it:         row.it,
    definition: row.definition,
    category:   row.category,
    level:      row.level,
    tags:       row.tags   || [],
    related:    row.related || [],
    isCustom:   true
  };
}

function parseTags(raw) {
  if (Array.isArray(raw)) return raw;
  return raw.split(',').map(t => t.trim().toLowerCase().replace(/\s+/g, '_')).filter(Boolean);
}

function getLocalTerms() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); }
  catch { return []; }
}

function saveLocalTerm(payload) {
  const term = { ...payload, id: 'local_' + Date.now(), isCustom: true };
  const list = getLocalTerms();
  list.push(term);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  return term;
}

function mirrorLocalTerm(term) {
  const list = getLocalTerms();
  if (!list.find(t => t.id === term.id)) {
    list.push(term);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  }
}

function updateLocalTerm(id, payload) {
  const list = getLocalTerms();
  const idx  = list.findIndex(t => t.id === id);
  if (idx < 0) throw new Error('Termine non trovato localmente');
  list[idx] = { ...list[idx], ...payload };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  return list[idx];
}

function deleteLocalTerm(id) {
  localStorage.setItem(LOCAL_KEY,
    JSON.stringify(getLocalTerms().filter(t => t.id !== id))
  );
}
