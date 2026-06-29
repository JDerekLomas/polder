# MakeMode — Deploy & Infrastructure

The live student path is **100% Scaleway, fr-par (France)** — one vendor, one GDPR DPA.
Nothing that touches user data or keys runs on Vercel.

## Pieces

| Piece | What | Where |
|---|---|---|
| **Web app** | `app.html` → uploaded as `index.html` | Object Storage bucket `makemode-app` (static website) |
| **Backend** | `scw-function/handler.js` — `make` + `publish`, routed by `action` | Serverless Function `makemode-api` (node22, fr-par) |
| **Inference** | GLM 5.2 / Mistral / Devstral 2 via `api.scaleway.ai` | Scaleway Generative APIs |
| **Published pages** | student artifacts at `owner/slug/index.html` | Object Storage bucket `makemode-publish` (public-read) |

- Function id: `cef7a827-afd8-46a3-b55f-c47c1c1bd336` · namespace: `94d5c492-2771-41cb-9339-0901caa1d96c`
- App URL: https://makemode-app.s3-website.fr-par.scw.cloud
- Function URL: https://makemodeapi75i9zkz5-makemode-api.functions.fnc.fr-par.scw.cloud
- Published URL shape: `https://makemode-publish.s3-website.fr-par.scw.cloud/<owner>/<slug>/`

## Secrets & env on the function
Set in the Scaleway console (function → Settings) or via CLI. Scoped, least-privilege keys —
each comes from a dedicated IAM application, not a broad account key.

| Var | Type | From IAM app | Permission set |
|---|---|---|---|
| `SCALEWAY_INFERENCE_KEY` | secret | `makemode-inference` | `GenerativeApisFullAccess` |
| `SCALEWAY_S3_ACCESS_KEY` | secret | `makemode-storage` | `ObjectStorageFullAccess` |
| `SCALEWAY_S3_SECRET_KEY` | secret | `makemode-storage` | `ObjectStorageFullAccess` |
| `ALLOWED_ORIGINS` | plain | — | `https://makemode-app.s3-website.fr-par.scw.cloud` |
| `API_TOKEN` | secret | — | optional bearer; if set, also set `MM_TOKEN` in `app.html` |

The handler falls back to legacy `SCALEWAY_SECRET_KEY` / `SCALEWAY_ACCESS_KEY` if the scoped
vars are absent, so migrations are non-breaking. Rate limiting + body-size caps are always on
(no config); the limiter is per-warm-container only — durable limiting needs a shared store.

## Deploy the backend (code)
Scaleway does **not** run `npm install`, so bundle deps into the zip:

    cd scw-function
    npm install --omit=dev @aws-sdk/client-s3
    zip -rq fn.zip handler.js package.json node_modules
    scw function deploy \
      namespace-id=94d5c492-2771-41cb-9339-0901caa1d96c \
      name=makemode-api runtime=node22 zip-file=fn.zip region=fr-par

Changing env/secrets (console or `scw function function update …`) triggers its own redeploy.
Poll `scw function function get <id> region=fr-par` until `status=ready`.

## Deploy the web app
Upload `app.html` as the bucket's `index.html`. **Must include `--acl public-read`** or the
website endpoint returns 403:

    aws s3 cp app.html s3://makemode-app/index.html \
      --endpoint-url https://s3.fr-par.scw.cloud --region fr-par \
      --content-type "text/html" --acl public-read

(Use the `makemode-storage` scoped keys as `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`.)

## Smoke test
    API=https://makemodeapi75i9zkz5-makemode-api.functions.fnc.fr-par.scw.cloud
    # make:
    curl -s -X POST "$API" -H 'content-type: application/json' \
      -H 'Origin: https://makemode-app.s3-website.fr-par.scw.cloud' \
      -d '{"action":"make","text":"a tiny hello page","model":"mistral-small-3.2-24b-instruct-2506"}'
    # origin gate: same call with no Origin header should return 403.

## Vercel — being retired
The marketing/brochure pages historically deployed to `makemode.vercel.app`. The Vercel
`api/make.js` / `api/publish.js` functions were **deleted** (orphaned; the Scaleway function
is the only backend). Remaining Vercel cleanup, when ready:

1. Remove `SCALEWAY_ACCESS_KEY` / `SCALEWAY_SECRET_KEY` from the Vercel project env — nothing
   on Vercel needs them once the `api/*` functions are gone.
2. Decide brochure hosting (move to a Scaleway bucket for fully all-Scaleway, vs. keep Vercel
   for static pages + PR previews). Note: dropping Vercel loses the per-PR preview workflow.
3. Once no system uses the broad account key, revoke it in IAM (the scoped keys above replace it).
