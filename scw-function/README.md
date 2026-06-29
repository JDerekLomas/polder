# MakeMode API — Scaleway Function (fr-par, EU)

Single Node22 function handling `make` + `publish` (routed by the `action` field).
Fully EU/sovereign: hosting (Object Storage `makemode-app`), this function (fr-par),
inference (Scaleway Generative APIs), and publish storage (`makemode-publish`).

## Deploy
    cd scw-function && npm install --omit=dev @aws-sdk/client-s3
    zip -rq fn.zip handler.js package.json node_modules
    scw function deploy name=makemode-api runtime=node22 zip-file=fn.zip region=fr-par
    # set secret env on the function (then redeploy) — see Env below

Frontend: `app.html` (uploaded to the `makemode-app` bucket as index.html) calls this
function URL. The Vercel `api/*.js` files are a non-sovereign fallback (not used in prod).

## Env (security — see issue #5)
The handler is hardened with abuse caps that need **no config** (per-IP rate limit, body-size
limits) plus two protections that stay **off until you set their env var**, so a deploy can't
break prod before you've confirmed the values:

| Var | Effect | Notes |
|---|---|---|
| `ALLOWED_ORIGINS` | When set, only these browser origins may call the function (else `403`). Unset = allow all (legacy). | Comma-separated. Set to the app origin: `https://makemode-app.s3-website.fr-par.scw.cloud` |
| `API_TOKEN` | When set, requests must send `Authorization: Bearer <token>` (else `401`). Unset = no bearer check. | Also set the same value as `MM_TOKEN` in `app.html`. Weak alone (lives in client JS) — origin + rate-limit do the real work; this just adds rotation + blocks lazy scripted abuse. |

**Least-privilege keys (replace the single account key):** create two scoped Scaleway IAM
applications and set their keys; the handler prefers these and falls back to the legacy single
key so nothing breaks mid-migration.

| Var | Used for | Falls back to |
|---|---|---|
| `SCALEWAY_INFERENCE_KEY` | bearer for Generative APIs (`make`) | `SCALEWAY_SECRET_KEY` |
| `SCALEWAY_S3_ACCESS_KEY` | S3 access key (`publish`) | `SCALEWAY_ACCESS_KEY` |
| `SCALEWAY_S3_SECRET_KEY` | S3 secret key (`publish`) | `SCALEWAY_SECRET_KEY` |

> The rate limiter is **per warm container** (functions are stateless across instances), so it's
> a floor, not a guarantee. Durable limiting needs a shared store (Upstash/Redis) — tracked in #5.
