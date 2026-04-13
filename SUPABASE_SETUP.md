# Configurazione database condiviso (Supabase)

Questa guida ti permette di abilitare la funzione **"Aggiungi termine"** in modalità
condivisa: i termini inseriti da qualsiasi utente saranno visibili a tutti.

> **Senza questa configurazione** l'app funziona perfettamente, ma i nuovi termini
> vengono salvati solo sul dispositivo locale di chi li aggiunge.

---

## Passo 1 — Crea un account Supabase (gratuito)

1. Vai su [supabase.com](https://supabase.com) e clicca **Start your project**
2. Registrati con GitHub o email (nessuna carta di credito richiesta)
3. Clicca **New project**
4. Compila:
   - **Name**: `alfatranslate`
   - **Database Password**: scegli una password sicura (salvala)
   - **Region**: `West EU (Ireland)` — più vicina all'Italia
5. Clicca **Create new project** e aspetta ~2 minuti

---

## Passo 2 — Crea la tabella nel database

1. Nel pannello Supabase, vai su **SQL Editor** (icona terminale nel menu a sinistra)
2. Clicca **New query**
3. Incolla questo codice SQL e clicca **Run**:

```sql
-- Tabella per i termini personalizzati
CREATE TABLE IF NOT EXISTS custom_terms (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  en          TEXT    NOT NULL CHECK (char_length(en) <= 200),
  it          TEXT    NOT NULL CHECK (char_length(it) <= 200),
  definition  TEXT    NOT NULL CHECK (char_length(definition) <= 1000),
  category    TEXT    NOT NULL CHECK (category IN ('finance','realestate','construction')),
  level       TEXT    NOT NULL CHECK (level IN ('base','medio','avanzato')),
  tags        TEXT[]  DEFAULT '{}',
  related     TEXT[]  DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Sicurezza a livello di riga
ALTER TABLE custom_terms ENABLE ROW LEVEL SECURITY;

-- Chiunque può leggere tutti i termini
CREATE POLICY "lettura_pubblica" ON custom_terms
  FOR SELECT TO anon USING (true);

-- Chiunque può aggiungere nuovi termini
CREATE POLICY "inserimento_pubblico" ON custom_terms
  FOR INSERT TO anon WITH CHECK (true);
```

---

## Passo 3 — Copia le credenziali

1. Nel menu a sinistra vai su **Project Settings → API**
2. Copia:
   - **Project URL** (es. `https://abcdefgh.supabase.co`)
   - **anon / public** key (lunga stringa che inizia con `eyJ…`)

---

## Passo 4 — Aggiorna il file di configurazione

Apri il file `js/config.js` e sostituisci i placeholder con i tuoi valori:

```js
const SUPABASE_URL      = 'https://TUO_PROJECT_ID.supabase.co';   // ← incolla qui
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIs...';             // ← incolla qui
```

---

## Passo 5 — Pubblica le modifiche

```bash
git add js/config.js
git commit -m "feat: configura Supabase per termini condivisi"
git push
```

Vercel rileverà il push automaticamente e ridistribuirà l'app in ~30 secondi.

---

## Risultato

- Il pulsante **+** (rosso, in basso a destra) apre il modulo di inserimento
- I termini aggiunti appaiono subito nell'app con il badge **Nuovo**
- Sono visibili a **tutti** gli utenti che accedono all'app

---

## FAQ

**Quanto costa?**
Supabase è completamente gratuito per questo uso: piano Free include 500 MB di
database e 50.000 richieste al giorno.

**I dati sono sicuri?**
La chiave `anon` è progettata per essere pubblica. Le policy RLS garantiscono
che gli utenti possano solo leggere e inserire (non modificare né cancellare).

**Come cancello un termine errato?**
Accedi a Supabase → Table Editor → `custom_terms` e cancella manualmente la riga.
