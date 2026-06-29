// MakeMode API — single Scaleway Function (fr-par, EU) handling make + publish.
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const SYSTEM =
  'You are MakeMode, building web pages for a non-coder designer. ' +
  'Output ONLY the full HTML of a single self-contained index.html — a complete, ' +
  'responsive, visually polished page using an inline <style> (no external files, ' +
  'frameworks, CDNs, or build step). Start with <!doctype html>. No markdown fences, no explanation.';
const ALLOWED = ['mistral-small-3.2-24b-instruct-2506', 'devstral-2-123b-instruct-2512', 'glm-5.2'];

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
function json(code, obj) {
  return { statusCode: code, headers: Object.assign({ 'Content-Type': 'application/json' }, CORS), body: JSON.stringify(obj) };
}

exports.handle = async (event) => {
  const method = event.httpMethod || event.method || 'POST';
  if (method === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  let b = {};
  try { b = JSON.parse(event.body || '{}'); } catch (e) { return json(400, { error: 'bad json' }); }

  try {
    if (b.action === 'make') {
      const text = (b.text || '').toString();
      if (!text.trim()) return json(400, { error: 'no text' });
      const model = ALLOWED.includes(b.model) ? b.model : ALLOWED[0];
      const cur = b.currentHtml ? String(b.currentHtml) : '';
      const user = cur
        ? `Here is the current index.html:\n\n${cur}\n\nApply this change and output the full updated index.html:\n${text}`
        : `Build this as a single self-contained web page:\n${text}`;
      const r = await fetch('https://api.scaleway.ai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + process.env.SCALEWAY_SECRET_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: 8000, temperature: 0.4, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }] }),
      });
      const d = await r.json();
      const html = stripFences(d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content);
      if (!html) return json(502, { error: (d && d.error && d.error.message) || 'empty page' });
      return json(200, { html });
    }
    if (b.action === 'publish') {
      if (!b.html) return json(400, { error: 'nothing to publish' });
      const slug = slugify(b.name);
      const s3 = new S3Client({ region: 'fr-par', endpoint: 'https://s3.fr-par.scw.cloud', credentials: { accessKeyId: process.env.SCALEWAY_ACCESS_KEY, secretAccessKey: process.env.SCALEWAY_SECRET_KEY } });
      await s3.send(new PutObjectCommand({ Bucket: 'makemode-publish', Key: slug + '/index.html', Body: b.html, ContentType: 'text/html', ACL: 'public-read' }));
      return json(200, { url: 'https://makemode-publish.s3-website.fr-par.scw.cloud/' + slug + '/' });
    }
    return json(400, { error: 'unknown action' });
  } catch (e) {
    return json(500, { error: String((e && e.message) || e) });
  }
};
