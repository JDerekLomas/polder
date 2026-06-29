# MakeMode — Deploy & Infrastructure

The live student path is **100% Scaleway, fr-par (France)** — one vendor, one GDPR DPA.
Nothing that touches user data or keys runs on Vercel.

## Pieces

| Piece | What | Where |
|---|---|---|
| **Web app** | `app.html` → uploaded as `index.html` | Object Storage bucket `makemode-app` (static website) |
| **Brochure** | `index.html`, `plan.html`, `demo.html`, `pitch.html`, `terp.html`, `calculator.html`, `legacy-index.html` | Object Storage bucket `makemode-www` (static website) |
| **Backend** | `scw-function/handler.js` — `make` + `publish`, routed by `action` | Serverless Function `makemode-api` (node22, fr-par) |
| **Inference** | GLM 5.2 / Mistral / Devstral 2 via `api.scaleway.ai` | Scaleway Generative APIs |
| **Published pages** | student artifacts at `owner/slug/index.html` | Object Storage bucket `makemode-publish` (public-read) |

- Function id: `cef7a827-afd8-46a3-b55f-c47c1c1bd336` · namespace: `94d5c492-2771-41cb-9339-0901caa1d96c`
- App URL: https://makemode-app.s3-website.fr-par.scw.cloud
- Brochure URL: https://makemode-www.s3-website.fr-par.scw.cloud
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

## Deploy the brochure
Static pages live in the `makemode-www` website bucket. Re-upload changed pages (same
`--acl public-read` rule). Note: zsh does **not** word-split unquoted vars, so don't stuff the
endpoint flags into one variable — inline them.

    for f in index.html plan.html demo.html pitch.html terp.html calculator.html legacy-index.html; do
      aws s3 cp "$f" "s3://makemode-www/$f" \
        --endpoint-url https://s3.fr-par.scw.cloud --region fr-par \
        --content-type "text/html" --acl public-read
    done

Bucket was created once with `aws s3 mb s3://makemode-www …` + `aws s3 website s3://makemode-www
--index-document index.html --error-document index.html …`.

## Smoke test
    API=https://makemodeapi75i9zkz5-makemode-api.functions.fnc.fr-par.scw.cloud
    # make:
    curl -s -X POST "$API" -H 'content-type: application/json' \
      -H 'Origin: https://makemode-app.s3-website.fr-par.scw.cloud' \
      -d '{"action":"make","text":"a tiny hello page","model":"mistral-small-3.2-24b-instruct-2506"}'
    # origin gate: same call with no Origin header should return 403.

## Vercel — retired
MakeMode no longer uses Vercel. Done:
- ✅ `api/make.js` / `api/publish.js` deleted (orphaned; Scaleway function is the only backend).
- ✅ Brochure moved to the `makemode-www` Scaleway bucket.
- ✅ `SCALEWAY_ACCESS_KEY` / `SCALEWAY_SECRET_KEY` removed from Vercel env.

Remaining housekeeping (optional, not blocking):
1. **Delete the Vercel project** (`makemode.vercel.app`) once nothing links to that URL — check
   `outreach/`, `GRANTS.md`, and anything shared with TU Delft/Emma first. Or keep it as a
   redirect to the Scaleway brochure URL.
2. **Custom domain:** the `*.s3-website.fr-par.scw.cloud` URLs are functional but ugly for
   stakeholders — point a real domain at the `makemode-www` (and `makemode-app`) buckets when ready.
3. **Broad account key:** still live and intentionally kept for now. Once confirmed unused
   anywhere, revoke it in IAM — the scoped keys above fully replace it.
