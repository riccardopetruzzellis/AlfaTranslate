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
// Voci diverse per inglese e italiano — modello eleven_multilingual_v2
const ELEVENLABS_API_KEY     = 'sk_e167261123bb712a5027c8db7fa1a6ac22dd992bbe9b93fe';
const ELEVENLABS_VOICE_ID_EN = 'pNInz6obpgDQGcFmaJgB'; // Adam  — maschile, professionale
const ELEVENLABS_VOICE_ID_IT = '21m00Tcm4TlvDq8ikWAM'; // Rachel — femminile, chiara
