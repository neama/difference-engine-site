# Publication Contract

This repository contains the public GitHub Pages bundle for fish analytics.

## Static install surface

Installed once:

- `index.html`
- `water/index.html`
- `air/index.html`
- `analytics/index.html`
- `health/index.html`
- `evidence/index.html`
- `assets/`
- `.nojekyll`

## Hourly publication surface

Updated by the publisher on each hourly run:

- `data/CURRENT.json`
- `data/generations/<generation_id>/`

## Boundary rules

- No private `technical/` paths, usernames, tokens, or internal operator notes should appear in the public bundle.
- The workflow must deploy from GitHub Actions.
