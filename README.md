# React + TypeScript + Vite

## Optimized website assets

The website imports compressed `.optimized.webp` assets. Original PNG/JPEG/GIF
files are retained for future editing and are not published by Vite unless
imported. Nine animated GIFs are now animated WebP, preserving their duration.
Logos and small icons use lossless WebP; other images use quality 80, and
animations use quality 72. Oversized stills are limited to 1920 px and the logo
to 640 px, without upscaling.

To convert new PNG/JPEG/GIF imports, install Pillow in your Python environment
and run `python scripts/optimize-images.py`, then `npm run build`.
The script updates imports and writes an image size report under
`output/optimization/`. It is an authoring tool; production builds do not need
Python or Pillow. Existing optimized imports are left alone on reruns.

Secondary pages load on navigation, lower-page images use lazy loading, and
Netlify caches Vite's fingerprinted assets for one year. Rebuild and redeploy
the full project to publish these improvements. See `server/README.md` for
Netlify chat function and environment-variable configuration.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
