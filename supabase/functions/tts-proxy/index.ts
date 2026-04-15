// AlfaTranslate — TTS Proxy Edge Function
// Chiama ElevenLabs server-side: la chiave API non è mai esposta al browser.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  const apiKey = Deno.env.get('ELEVENLABS_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ELEVENLABS_API_KEY secret not set' }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  const { text, voiceId } = await req.json();

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method:  'POST',
      headers: {
        'xi-api-key':   apiKey,
        'Content-Type': 'application/json',
        'Accept':       'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.45, similarity_boost: 0.80, style: 0.25 }
      })
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    return new Response(JSON.stringify({ error: errText }), {
      status: res.status,
      headers: { ...CORS, 'Content-Type': 'application/json' }
    });
  }

  const audio = await res.arrayBuffer();
  return new Response(audio, {
    headers: { ...CORS, 'Content-Type': 'audio/mpeg' }
  });
});
