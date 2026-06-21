# Freiboitar Portfolio

Static portfolio website for Freiboitar.

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

