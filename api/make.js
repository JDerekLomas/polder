// ⚠️ NON-SOVEREIGN: brochure/demo only. Runs on Vercel (US-jurisdiction infra), so it is
// NOT in the student data path — real student traffic uses scw-function/ (Scaleway, fr-par).
// Do not route authenticated student prompts/code through here. See issue #5.
// MakeMode web — build/edit a page by streaming from Scaleway (France, EU).
// Edge runtime, pinned to Frankfurt (fra1) so it stays in the EU and can stream
// (no 10s serverless timeout). Streams the raw HTML content back to the browser.
export const config = { runtime: 'edge', regions: ['fra1'] };

const SYSTEM =
  "You are MakeMode, building web pages for a non-coder designer. " +
  "Output ONLY the full HTML of a single self-contained index.html — a complete, " +
  "responsive, visually polished page using an inline <style> (no external files, " +
  "frameworks, CDNs, or build step). Start with <!doctype html>. Do not use markdown " +
  "code fences or any explanation.";

const ALLOWED = [
  'mistral-small-3.2-24b-instruct-2506',
  'devstral-2-123b-instruct-2512',
  'glm-5.2',
];

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });
  let payload;
  try { payload = await req.json(); } catch { return new Response('bad json', { status: 400 }); }
  const text = (payload.text || '').toString();
  if (!text.trim()) return new Response('no text', { status: 400 });
  const model = ALLOWED.includes(payload.model) ? payload.model : ALLOWED[0];
  const cur = payload.currentHtml ? String(payload.currentHtml) : '';
  const user = cur
    ? `Here is the current index.html:\n\n${cur}\n\nApply this change and output the full updated index.html:\n${text}`
    : `Build this as a single self-contained web page:\n${text}`;

  const key = process.env.SCALEWAY_SECRET_KEY;
  if (!key) return new Response('server not configured', { status: 500 });

  const upstream = await fetch('https://api.scaleway.ai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model, max_tokens: 8000, temperature: 0.4, stream: true,
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
    }),
  });
  if (!upstream.ok || !upstream.body) {
    const t = await upstream.text().catch(() => '');
    return new Response('model error: ' + t.slice(0, 200), { status: 502 });
  }

  const reader = upstream.body.getReader();
  const dec = new TextDecoder();
  const enc = new TextEncoder();
  let buf = '';
  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) { controller.close(); return; }
      buf += dec.decode(value, { stream: true });
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') continue;
        try {
          const j = JSON.parse(data);
          const c = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
          if (c) controller.enqueue(enc.encode(c));
        } catch { /* skip partial */ }
      }
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
  });
}
