// AlfaTranslate — Database Layer
// Supabase REST API (condiviso) con fallback su localStorage (locale)

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
  if (!DB_CONFIGURED) {
    return getLocalTerms();
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/custom_terms?select=*&order=created_at.asc`,
      { headers: sbHeaders() }
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
    tags:       [],
    related:    []
  };

  if (!DB_CONFIGURED) {
    const term = { ...payload, id: 'local_' + Date.now(), isCustom: true };
    const existing = getLocalTerms();
    existing.push(term);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
    return term;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/custom_terms`, {
    method:  'POST',
    headers: sbHeaders({ 'Prefer': 'return=representation' }),
    body:    JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `HTTP ${res.status}`);
  }

  const [saved] = await res.json();
  // Mirror to localStorage as backup
  const locals = getLocalTerms();
  locals.push(rowToTerm(saved));
  localStorage.setItem(LOCAL_KEY, JSON.stringify(locals));
  return rowToTerm(saved);
}

// ─── Update custom term ──────────────────────────────────────────────────────

async function updateCustomTerm(id, data) {
  const payload = {
    en:         data.en.trim(),
    it:         data.it.trim(),
    definition: data.definition.trim(),
    category:   data.category,
    level:      data.level
  };

  // Local-only term (ID starts with "local_") → localStorage only
  if (!DB_CONFIGURED || String(id).startsWith('local_')) {
    return updateLocalTerm(id, payload);
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/custom_terms?id=eq.${encodeURIComponent(id)}`,
    {
      method:  'PATCH',
      headers: sbHeaders({ 'Prefer': 'return=representation' }),
      body:    JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `HTTP ${res.status}`);
  }

  const rows = await res.json();
  if (!rows.length) throw new Error('Termine non trovato nel database');
  const updated = rowToTerm(rows[0]);
  // Mirror update to localStorage
  updateLocalTerm(id, payload);
  return updated;
}

// ─── Delete custom term ──────────────────────────────────────────────────────

async function deleteCustomTerm(id) {
  // Local-only term → localStorage only
  if (!DB_CONFIGURED || String(id).startsWith('local_')) {
    deleteLocalTerm(id);
    return;
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/custom_terms?id=eq.${encodeURIComponent(id)}`,
    {
      method:  'DELETE',
      headers: sbHeaders()
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `HTTP ${res.status}`);
  }

  deleteLocalTerm(id);
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

function getLocalTerms() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  } catch {
    return [];
  }
}

function updateLocalTerm(id, payload) {
  const terms = getLocalTerms();
  const idx = terms.findIndex(t => t.id === id);
  if (idx < 0) throw new Error('Termine non trovato localmente');
  terms[idx] = { ...terms[idx], ...payload };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(terms));
  return terms[idx];
}

function deleteLocalTerm(id) {
  const terms = getLocalTerms().filter(t => t.id !== id);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(terms));
}
