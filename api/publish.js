// ⚠️ NON-SOVEREIGN: brochure/demo only. Runs on Vercel (US-jurisdiction infra) — NOT the
// student data path. Real publishing uses scw-function/ (Scaleway, fr-par). See issue #5.
// MakeMode web — publish a generated page to Scaleway Object Storage (fr-par, EU).
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function slugify(s) {
  return (s || 'untitled').toString().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'untitled';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  if (!body || typeof body !== 'object') {
    // read raw stream as a fallback
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try { body = JSON.parse(raw || '{}'); } catch { body = {}; }
  }
  const html = body.html;
  if (!html) { res.status(400).json({ error: 'nothing to publish' }); return; }
  const slug = slugify(body.name);

  const access = process.env.SCALEWAY_ACCESS_KEY;
  const secret = process.env.SCALEWAY_SECRET_KEY;
  if (!access || !secret) { res.status(500).json({ error: 'server not configured' }); return; }

  const s3 = new S3Client({
    region: 'fr-par',
    endpoint: 'https://s3.fr-par.scw.cloud',
    credentials: { accessKeyId: access, secretAccessKey: secret },
  });
  try {
    await s3.send(new PutObjectCommand({
      Bucket: 'makemode-publish',
      Key: `${slug}/index.html`,
      Body: html,
      ContentType: 'text/html',
      ACL: 'public-read',
    }));
    res.status(200).json({ url: `https://makemode-publish.s3-website.fr-par.scw.cloud/${slug}/` });
  } catch (e) {
    res.status(502).json({ error: 'publish failed: ' + (e && e.message ? e.message : 'unknown') });
  }
}
