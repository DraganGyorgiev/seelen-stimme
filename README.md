# Seelenstimme

Marketing site for Stefana Gyorgiev (Jenseitsmedium & spirituelle Begleitung), served at
[seelen-stimme.at](https://seelen-stimme.at). Static SPA, deployed on Netlify.

Lit 3 web components + Vaadin Router + Tailwind CSS 4, bundled by Vite. German and English via
`@lit/localize`. No backend — the contact form posts to Netlify Forms.

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` / `npm run watch` | Vite dev server with HMR |
| `npm run build` | Typecheck, then production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | `tsc --noEmit` over `src` and `test` |
| `npm run lint` | ESLint (flat config in `eslint.config.js`) |
| `npm run lint:fix` | ESLint with `--fix` |
| `npm test` | Vitest, once |
| `npm run test:watch` / `npm run test:ui` | Vitest in watch / browser UI mode |
| `npm run check` | typecheck + lint + test — run this before pushing |
| `npm run localize:extract` | scan `msg()` calls and update `xliff/en.xlf` with any new strings |
| `npm run localize:build` | turn the translated XLIFF into the modules under `src/generated/` |
| `npm run images:optimize` | convert any new image in `src/assets/` to sized WebP |
| `npm run relock` | wipe `node_modules` and the lockfile, then reinstall from scratch |

## How Tailwind reaches the components

`src/tailwind/tailwind.css` is the Tailwind **entry point**, not a generated file. It is consumed twice:

- `index.html` links it, which gives the document its preflight reset.
- `src/tailwind/tailwindCss.ts` imports it with Vite's `?inline` query and wraps it in `unsafeCSS`, so
  every component can put it in `static styles`. Shadow DOM does not inherit page stylesheets, so a
  component whose template uses utility classes **must** include `tailwindCss` in its `styles` or it
  renders unstyled.

`@tailwindcss/vite` compiles it during `dev` and `build`; there is no separate Tailwind watcher or CLI
step. Class names are discovered via the `@source "../**/*.ts"` directive, so utilities only work if
they appear literally in a `.ts` file — a class assembled from string fragments at runtime will not be
generated.

## Dependencies

Netlify builds with `npm ci`, which installs strictly from `package-lock.json` — so the lockfile has to
be complete or the deploy fails.

**After adding, removing or bumping a dependency, run `npm run relock`** rather than a plain
`npm install`. Several dependencies here ship per-platform native binaries (`sharp`, `rollup`,
`esbuild`, `lightningcss`, `@tailwindcss/oxide`); installing on Windows can prune the Linux variants
from the lockfile ([npm/cli#4828](https://github.com/npm/cli/issues/4828)), which then breaks the build
on Netlify. A clean relock rewrites the full cross-platform set. Commit the resulting lockfile.

Relock deletes `node_modules`, so **stop the dev server first**, and close any editor holding a native
binary open — WebStorm's Tailwind language server keeps `@tailwindcss/oxide` locked and causes `EPERM`
partway through, leaving the tree half-deleted.

## Images

Every image under `src/assets/` is WebP, resized to the largest size the layout can actually show. Drop
a new JPEG or PNG in and run `npm run images:optimize`: it converts the file, deletes the original, and
for gallery images also writes a `-thumb` variant. Then point the import at the `.webp` name.

The script is safe to run repeatedly — a WebP that already fits its size profile is skipped rather than
re-compressed, so images do not degrade a little more on each run.

Size profiles live at the top of `scripts/optimize-images.mjs`. The gallery grid uses the `-thumb`
files and only the lightbox loads the full-size image, which is why `gallery-page.ts` imports both.

**Master copies belong outside this repo.** The script replaces originals in place, so the only copy of
a pre-WebP source is in git history.

## Languages

The site ships in German (the source language) and English. **The URL decides the language**: German is
served from the bare paths (`/services`) and English from an `/en` prefix (`/en/services`). Nothing is
persisted — a link or bookmark already carries the locale, and search engines can index both.

The globe button in the header swaps to the same page in the other language. Components address pages by
their German path (`app-link to="/about"`); `currentLocalePath()` adds the prefix at render time, so no
component needs to know about the URL layout.

Each page emits `hreflang` alternates for `de`, `en` and `x-default`, and a canonical pointing at the
locale actually being viewed. `public/sitemap.xml` lists both variants — `test/page-meta.spec.ts` fails
if a German page has no English sitemap entry.

There is deliberately **no automatic redirect** based on browser language: it hides one version from
crawlers and traps visitors who want the other.

Every user-visible string goes through `msg()` from `@lit/localize`:

```ts
import { localized, msg } from '@lit/localize'

@localized()          // re-renders this component when the language changes
@customElement('my-thing')
class MyThing extends LitElement {
  render() {
    return html`<p>${msg('Ein deutscher Satz')}</p>`
  }
}
```

Two rules make or break it:

- **`msg()` must run at render time, never at module load.** A `const` array evaluated once at import
  captures whatever language was active then and never updates. That is why the catalogues are
  functions (`getServices()`, `getPageMeta()`, `getTopics()`) rather than exported constants.
- **A component that renders `msg()` needs `@localized()`**, otherwise it keeps its old text after a
  switch.

Use ``msg(str`… ${value} …`)`` for strings with interpolation and ``msg(html`… <strong>…</strong> …`)``
for strings containing markup — plain template literals cannot be extracted.

### Updating translations

1. `npm run localize:extract` — adds any new strings to `xliff/en.xlf` as `<trans-unit>` without a
   `<target>`.
2. Fill in a `<target>` for each new unit. Keep every `<x id="…"/>` placeholder from the source; they
   are the interpolations and the markup, and the build rejects a mismatch.
3. `npm run localize:build` — regenerates `src/generated/`, which is committed.
4. `npm test` — the locale spec fails if a message is left untranslated or a placeholder was dropped.

**Do not write XML entities in a `<target>`.** lit-localize passes `&amp;` through verbatim into plain
string messages, so an `&` in a translated page title reaches the browser as literal `&amp;`. Write the
word "and" (or use the real character in a `msg(html…)` message). `test/locale.spec.ts` guards this.

`src/generated/` is generated but committed, so a fresh clone builds without running the localize
tools. Never edit those files by hand.

## Layout

```
src/
  seelenstimme-app.ts        app root, owns the router
  router/                    routes, per-route <title>/OG metadata, link-click handling
  pages/                     one component per route
  features/                  route-sized features (contact form, services list)
  components/                shared UI (header, footer, buttons, toast, cookie banner)
  data/services.ts           single source of truth for the service catalogue
  i18n/locale.ts             locale activation and the URL <-> locale mapping
  seo/structured-data.ts     JSON-LD, built from the live service catalogue
  generated/                 lit-localize output — generated, committed, never hand-edited
  assets/                    images, imported by module so Vite fingerprints them
test/                        Vitest specs for the DOM-free modules
xliff/en.xlf                 the English translations
public/                      copied verbatim: robots.txt, sitemap.xml, _redirects, favicon
```

Routes are lazy-loaded: each entry in `src/router/AppRouter.ts` dynamically imports its page module, so
a visitor downloads only the route they asked for. A catch-all route renders `page-not-found`.

### Adding a page

1. Create the component under `src/pages/`, including `tailwindCss` in its `static styles` and
   `@localized()` on the class.
2. Add an entry to the `pages` array in `src/router/AppRouter.ts` — both language routes are derived
   from it.
3. Add a title and description to `getPageMeta()` in `src/router/page-meta.ts`.
4. Add both the German and the `/en` URL to `public/sitemap.xml`.
5. Run `npm run localize:extract`, translate the new strings, then `npm run localize:build`.

### Adding or changing a service

Everything lives in `getServices()` in `src/data/services.ts`: the `/services` cards, the homepage grid,
and the contact form's dropdown all read from it. `isFullyBooked: true` greys the card out, disables its
CTA, and disables the option in the contact form. `durationOptions` adds the duration/price picker to
the form — its `value` stays in German on purpose so the enquiry emails read the same whichever language
the visitor used, while `label` is what they see.

## The contact form

The form goes to **Netlify Forms**. Submissions land in the Netlify dashboard under *Forms* and are
emailed on; nothing is lost silently if mail delivery fails. Spam is filtered by Akismet plus a honeypot,
so visitors never see a captcha.

Netlify finds forms by parsing the **deployed HTML at build time**. Our real form is rendered by Lit into
a shadow root that does not exist when Netlify looks, so `index.html` carries a hidden static copy that
declares the form name and every field name. That copy is the contract:

- **Adding a field to the contact form means adding it to the static form in `index.html` too.** Netlify
  discards any value whose name it has not seen. `test/contact-form.spec.ts` fails if the two drift.
- The honeypot is `bot-field`, nominated by `netlify-honeypot="bot-field"` on the static form. It is
  rendered hidden; a bot that fills it gets its submission dropped.
- `form-name` must be submitted explicitly and match the static form's `name`.

Submission is a `fetch` POST to `/` with `application/x-www-form-urlencoded` — Netlify intercepts it
before the SPA redirect. A success or error toast is shown in place; on failure the entered values are
kept so nothing has to be retyped.

Two fields are conveniences for the inbox rather than user input: `subject` sets the notification email's
subject line, and `sprache` records which language the visitor was using. Duration values are submitted in
German even in the English UI, so enquiries read consistently.

## Deployment

Netlify builds `npm run build` and publishes `dist/`. `public/_redirects` rewrites all paths to
`index.html` so client-side routes survive a hard refresh.
