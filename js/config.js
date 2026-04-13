// AlfaTranslate — Configurazione database condiviso
// ─────────────────────────────────────────────────────────────────────────────
// Per abilitare la condivisione dei termini tra tutti gli utenti:
// 1. Leggi SUPABASE_SETUP.md per creare il database gratuito
// 2. Sostituisci i valori qui sotto con le tue credenziali Supabase
// 3. Fai push su GitHub → Vercel si aggiorna automaticamente
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL     = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

// Rilevamento automatico — non modificare
const DB_CONFIGURED = !SUPABASE_URL.includes('YOUR_PROJECT_ID');
