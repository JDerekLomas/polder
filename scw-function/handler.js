// MakeMode API — single Scaleway Function (fr-par, EU) handling make + publish.
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// --- Config (env-driven; safe defaults so nothing breaks before you set them) ---
// ALLOWED_ORIGINS: comma-separated browser origins permitted to call this function.
//   Leave UNSET to skip origin enforcement (rate-limit + body caps still apply).
//   Set it (e.g. "https://makemode-app.s3-website.fr-par.scw.cloud") to lock it down.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);
// MAKEMODE_API_TOKEN: shared bearer the app sends. UNSET = no bearer check.
//   (Weak on its own for a public browser app — it lives in client JS — but lets us
//    rotate and blocks the laziest scripted abuse. Origin + rate-limit do the real work.)
const API_TOKEN = process.env.API_TOKEN || process.env.MAKEMODE_API_TOKEN || '';
// Least-privilege keys: prefer scoped per-service keys; fall back to the legacy single
// key so prod keeps working until the scoped Scaleway IAM apps exist (see #5).
const INFERENCE_KEY = process.env.SCALEWAY_INFERENCE_KEY || process.env.SCALEWAY_SECRET_KEY;
const S3_ACCESS_KEY = process.env.SCALEWAY_S3_ACCESS_KEY || process.env.SCALEWAY_ACCESS_KEY;
const S3_SECRET_KEY = process.env.SCALEWAY_S3_SECRET_KEY || process.env.SCALEWAY_SECRET_KEY;

// Abuse caps
const MAX_TEXT = 8000;        // chars of a single instruction
const MAX_HTML = 200000;      // chars of currentHtml / html in flight (~200KB)
const RL_WINDOW_MS = 60000;   // rate-limit window
const RL_MAX = { make: 15, publish: 10 }; // per-IP requests per window

const SYSTEM =
  'You are MakeMode, building web pages for a non-coder designer. ' +
  'Output ONLY the full HTML of a single self-contained index.html — a complete, ' +
  'responsive, visually polished page using an inline <style> (no external files, ' +
  'frameworks, CDNs, or build step). Start with <!doctype html>. No markdown fences, no explanation.';
const ALLOWED = ['mistral-small-3.2-24b-instruct-2506', 'devstral-2-123b-instruct-2512', 'glm-5.2'];

// --- Best-effort in-memory rate limiter ---------------------------------------
// Per warm container only (Scaleway functions are stateless across instances), so this
// is a floor, not a guarantee. Durable limiting needs a shared store (Upstash/Redis) — #5.
const hits = new Map(); // ip -> [timestamps]
function rateLimited(ip, action) {
  const cap = RL_MAX[action];
  if (!cap) return false;
  const now = Date.now();
  const key = action + ':' + (ip || 'unknown');
  const arr = (hits.get(key) || []).filter(t => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) { for (const k of hits.keys()) { hits.delete(k); if (hits.size <= 4000) break; } }
  return arr.length > cap;
}
function clientIp(event) {
  const h = event.headers || {};
  const xff = h['x-forwarded-for'] || h['X-Forwarded-For'] || '';
  if (xff) return xff.split(',')[0].trim();
  return h['x-real-ip'] || h['X-Real-IP'] || (event.requestContext && event.requestContext.identity
    && event.requestContext.identity.sourceIp) || '';
}

function slugify(s) {
  return (s || 'untitled').toString().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'untitled';
}
function stripFences(s) {
  let t = (s || '').trim();
  if (t.indexOf('```') === 0) { const i = t.indexOf('\n'); if (i >= 0) t = t.slice(i + 1); const j = t.lastIndexOf('```'); if (j >= 0) t = t.slice(0, j); }
  const lo = t.toLowerCase(); let k = lo.indexOf('<!doctype'); if (k < 0) k = lo.indexOf('<html'); if (k > 0) t = t.slice(k);
  return t.trim();
}
function corsFor(origin) {
  // If an allowlist is configured, only echo a matching origin; otherwise allow all (legacy).
  const allowed = ALLOWED_ORIGINS.length === 0
    ? '*'
    : (ALLOWED_ORIGINS.includes(origin) ? origin : '');
  const h = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
  if (allowed) h['Access-Control-Allow-Origin'] = allowed;
  return h;
}
function json(code, obj, cors) {
  return { statusCode: code, headers: Object.assign({ 'Content-Type': 'application/json' }, cors), body: JSON.stringify(obj) };
}

exports.handle = async (event) => {
  const headers = event.headers || {};
  const origin = headers.origin || headers.Origin || '';
  const cors = corsFor(origin);
  const method = event.httpMethod || event.method || 'POST';
  if (method === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };

  // Origin allowlist (only enforced once ALLOWED_ORIGINS is set)
  if (ALLOWED_ORIGINS.length && !ALLOWED_ORIGINS.includes(origin)) {
    return json(403, { error: 'origin not allowed' }, cors);
  }
  // Shared bearer (only enforced once API_TOKEN is set)
  if (API_TOKEN) {
    const auth = headers.authorization || headers.Authorization || '';
    if (auth !== 'Bearer ' + API_TOKEN) return json(401, { error: 'unauthorized' }, cors);
  }

  let b = {};
  try { b = JSON.parse(event.body || '{}'); } catch (e) { return json(400, { error: 'bad json' }, cors); }

  const ip = clientIp(event);
  if (rateLimited(ip, b.action)) return json(429, { error: 'rate limited — slow down' }, cors);

  try {
    if (b.action === 'make') {
      const text = (b.text || '').toString();
      if (!text.trim()) return json(400, { error: 'no text' }, cors);
      if (text.length > MAX_TEXT) return json(413, { error: 'instruction too long' }, cors);
      const model = ALLOWED.includes(b.model) ? b.model : ALLOWED[0];
      let cur = b.currentHtml ? String(b.currentHtml) : '';
      if (cur.length > MAX_HTML) return json(413, { error: 'page too large to edit' }, cors);
      const user = cur
        ? `Here is the current index.html:\n\n${cur}\n\nApply this change and output the full updated index.html:\n${text}`
        : `Build this as a single self-contained web page:\n${text}`;
      if (!INFERENCE_KEY) return json(500, { error: 'server not configured' }, cors);
      const r = await fetch('https://api.scaleway.ai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + INFERENCE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: 8000, temperature: 0.4, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }] }),
      });
      const d = await r.json();
      const html = stripFences(d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content);
      if (!html) return json(502, { error: (d && d.error && d.error.message) || 'empty page' }, cors);
      return json(200, { html }, cors);
    }
    if (b.action === 'publish') {
      if (!b.html) return json(400, { error: 'nothing to publish' }, cors);
      const html = String(b.html);
      if (html.length > MAX_HTML) return json(413, { error: 'page too large to publish' }, cors);
      if (!S3_ACCESS_KEY || !S3_SECRET_KEY) return json(500, { error: 'server not configured' }, cors);
      const slug = slugify(b.name);
      // Namespace by a per-browser owner key so re-publishing overwrites only your own page,
      // others can't overwrite it, and paths aren't enumerable. No owner = legacy flat path.
      const owner = /^[a-z0-9]{6,32}$/.test(String(b.owner || '')) ? String(b.owner) : '';
      const prefix = owner ? owner + '/' + slug : slug;
      const s3 = new S3Client({ region: 'fr-par', endpoint: 'https://s3.fr-par.scw.cloud', credentials: { accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY } });
      await s3.send(new PutObjectCommand({ Bucket: 'makemode-publish', Key: prefix + '/index.html', Body: html, ContentType: 'text/html', ACL: 'public-read' }));
      return json(200, { url: 'https://makemode-publish.s3-website.fr-par.scw.cloud/' + prefix + '/' }, cors);
    }
    return json(400, { error: 'unknown action' }, cors);
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) }, cors);
  }
};
