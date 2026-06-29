# MakeMode API — Scaleway Function (fr-par, EU)

Single Node22 function handling `make` + `publish` (routed by the `action` field).
Fully EU/sovereign: hosting (Object Storage `makemode-app`), this function (fr-par),
inference (Scaleway Generative APIs), and publish storage (`makemode-publish`).

## Deploy
    cd scw-function && npm install --omit=dev @aws-sdk/client-s3
    zip -rq fn.zip handler.js package.json node_modules
    scw function deploy name=makemode-api runtime=node22 zip-file=fn.zip region=fr-par
    # set secret env on the function: SCALEWAY_SECRET_KEY, SCALEWAY_ACCESS_KEY (then redeploy)

Frontend: `app.html` (uploaded to the `makemode-app` bucket as index.html) calls this
function URL. The Vercel `api/*.js` files are a non-sovereign fallback (not used in prod).
