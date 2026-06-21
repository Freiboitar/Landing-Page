# Freiboitar Portfolio

Static portfolio website for Freiboitar.

## Live website

Production: <https://landing-page-5c1.pages.dev>

## Local preview

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Cloudflare Pages

Recommended deployment settings:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Production branch: `main`

The site has no server-side runtime or build step. Cloudflare Pages serves the files directly from the repository root.

## Verify a deployment

Run this after pushing an update:

```sh
./scripts/check-deployment.sh
```

The script reads the production URL from `deployment.env` and compares the live
HTML, CSS, and JavaScript with the local project. It exits with an error if the
deployment is unavailable or does not match.
