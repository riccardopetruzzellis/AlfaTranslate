// AlfaTranslate — Configurazione database condiviso
// ─────────────────────────────────────────────────────────────────────────────
// Per abilitare la condivisione dei termini tra tutti gli utenti:
// 1. Leggi SUPABASE_SETUP.md per creare il database gratuito
// 2. Sostituisci i valori qui sotto con le tue credenziali Supabase
// 3. Fai push su GitHub → Vercel si aggiorna automaticamente
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL     = 'https://sswnxtjlyixminfvgxec.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzd254dGpseWl4bWluZnZneGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwODU1MzUsImV4cCI6MjA5MTY2MTUzNX0.VPnvSvCd66jB6DTP-Q_WmKe-k558kujtJNDTG07aO6I';

// Rilevamento automatico — non modificare
const DB_CONFIGURED = !SUPABASE_URL.includes('YOUR_PROJECT_ID');

// ─── ElevenLabs TTS (pronuncia realistica) ───────────────────────────────────
// 1. Registrati su https://elevenlabs.io (piano gratuito: 10.000 car/mese)
// 2. Copia la tua API Key da Profile → API Key
// 3. Scegli una voce da Voice Library e copia il Voice ID
//    Consigliato: "Adam" → pNInz6obpgDQGcFmaJgB  (maschile, professionale)
//                "Rachel" → 21m00Tcm4TlvDq8ikWAM (femminile, naturale)
const ELEVENLABS_API_KEY  = 'YOUR_ELEVENLABS_API_KEY';
const ELEVENLABS_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam — cambia se preferisci
