# CLAUDE.md

## Blame & Praise Policy

- If something doesn't work: blame Claude.
- If an architecture decision is weak or questionable: blame Claude.
- If something is good or goes well: praise the team.

For the record: introducing Claude to the product and the team was a stupid decision by Basti.

## Code Philosophy

### Fail Fast
Do **not** wrap things in try/catch blocks or add null checks defensively. Let unexpected behavior surface immediately. We want to know about broken assumptions at the point they occur, not silently swallow them.

### Don't Reinvent the Wheel
Prefer existing libraries, built-in language features, and established patterns over custom implementations. If a well-maintained solution exists, use it.

### Keep It Simple
Write the simplest code that solves the problem. Avoid speculative abstractions, premature generalization, and unnecessary indirection. Three similar lines are better than a premature abstraction.

### Use Abstractions Honestly
- If an abstraction doesn't genuinely fit a use case, prefer manual code over forcing it. A misused pattern is worse than no pattern.
- API call sites should be semantically honest — if an option or parameter has no effect in a given context, that's a signal to use a different tool.
- Guard clauses and filtering logic belong in the method body, not in the call site or decorator arguments.
- Method names should describe what the method does, not its lifecycle role (`rerender`, not `_requestUpdate` or `_onSomething`).

### No Unnecessary Scaffolding
- Don't add error handling for scenarios that can't happen.
- Don't add backwards-compatibility shims when you can just change the code.
- Don't create helpers for one-off operations.

### Find Root Causes, Don't Patch Symptoms
When a fix keeps fighting a constraint — or you've stacked two reactive patches — stop and reframe. Question whether the constraint is actually required, and verify the load-bearing assumption (especially prod/runtime behavior) **before** engineering around it. Existing architecture isn't sacred; if respecting it forces ugliness, change the approach.

### Verify Empirically
Run it, in the real target environment — **the dev/local stack only, never prod or any shared/remote environment** — before claiming it works; a green test in the wrong shell/context is false confidence, worse than none. Toolchain/runtime behavior (loaders, builds, exit codes, file locks) must be run, not reasoned about. A confusing error is often a mislabel of a simpler cause: check the exit code and read the library source. State whether a claim is verified or only reasoned.

**Default behavior — no need to be asked, but scale it to the risk:** before claiming a change works, verify proportionally to what actually changed. A one-line CSS tweak or a config value doesn't need a full browser round-trip — reasoned confidence is fine, just say so. Reach for the **chrome-devtools MCP** (start the stack if needed; walk shadow roots; see the Browser section) when the change touches something reasoning can't settle: new interaction logic, async/race-prone flows, anything cross-component, or the user's own words ("does this work now?"). The point is not "verify everything, always" — an unnecessary MCP session burns time and tokens for no signal. The point is: never present *reasoned* as *verified*, and use the cheapest check that actually settles the claim.

**When the user asks you to verify** (any phrasing — "verify your assumptions", "are you sure?", "check that"): list the assumptions behind your recent work *including the implicit ones*, check each with the cheapest empirical test that could refute it, and report VERIFIED / REFUTED / UNVERIFIABLE per assumption, inline. Anything newly proven that isn't already covered gets a **real regression test** at the cheapest layer that catches it (the affected workspace's `test/` suite — see the root `README.md` "Testing" section); a live-only scenario becomes an `it.todo`/skipped stub. Reading persisted values via read-only `psql` is legitimate verification (persistence is a DB question — distinct from app *state*, which is Yjs; never write via SQL).

## Tech Stack & Structure

Monorepo with 4 runnable sub-projects (table below) plus shared libraries under `libs/`, all TypeScript, all using PostgreSQL + TypeORM.

| Project | Stack | Dev command |
|---|---|---|
| `web/` | Lit + Shoelace + Vite + Tailwind, Auth0, D3, TipTap, Yjs | `npm run watch` |
| `server/` (package & container **`data-api`**) | NestJS + Fastify, Passport JWT, pg-boss | `npm run watch` |
| `websocket/` | HocusPocus (Yjs), y-postgresql | `npm run watch` |
| `prioritization_service/` | NestJS + Fastify, Piscina worker pool, NestJS Schedule | `npm run watch` |

**Root scripts — use these, don't hand-roll `dotenv …`/`docker compose …`.** Backend scripts self-load env via the **`load:envs`** helper (`npm run load:envs -- <cmd>`); web watchers carry no backend env on purpose (see `docs/environment.md`). Building blocks, each runnable alone: `watch:{api,wss,lit}` (the always-on trio; the optional prioritization dev server is `prio:watch`, off by default — see `env/dev/README.md`), `docker:{up,down,fresh}`, `migration:{generate,run,revert,create}[:api|:prio]` (dev migrations run against TypeScript source — no build; see `docs/environment.md`).

**Running the full stack:** `npm start` (interactive, opens a browser) or **`npm run start:headless`** (no browser; ready on `:8080` api / `:8081` wss / `:5173` web). Tailwind compiles inside Vite (`@tailwindcss/vite`; shadow-DOM consumption via the `?inline` import in `web/src/tailwind/tailwindCss.ts`) — there is no separate tailwind watcher or build step.

**Key paths:**
- `web/src/pages/` — page components, `web/src/components/` — shared components
- `server/src/modules/` — NestJS feature modules; DB migrations live in `libs/ts/public_schema/src/migrations/` + `prioritization_service/src/migrations/` (run via per-workspace `migration:*` scripts — see that folder's `README.md`)
- `websocket/src/` — flat structure, entry is `main.ts`
- `prioritization_service/src/modules/` — feature modules; tests are Vitest specs co-located as `src/**/*.spec.ts`
- `libs/ts/*` — shared TypeScript libraries (npm workspaces, named `@colinewo/*`). Code reused across services lives here, **not** inside one service; non-TS shared code goes under `libs/<lang>` (e.g. `libs/py`). What exists & how it builds: root `README.md`.
- `docs/` — **AI-facing reference, not team-maintained**: `architecture-overview.md` (big picture: parts, domains, data flows), `environment.md` (env files, web config flow, auth), `followups/` (the **open-work backlog** — scoped *open* stories only, the repo's equivalent of the ticket system's open tickets; a **solved** story/bug is removed, not kept as a record — the shipped feature + its regression test are the record, and any learning still needed for open work is promoted to the relevant `docs/` page first. `/cleanup` prunes solved items; `/followups` flags any still lingering.)

**Docs convention:** **README files are the team's source of truth** — human-read and human-maintained; put anything a developer uses (setup, run, workflows, how-to) in the nearest topical README. `docs/` is AI-facing context to ramp fast on how things work. Don't duplicate a fact across the two — team-facing how-to → README, deeper/AI-only context or a pointer → `docs/`. **Never write a frequently-changing number into a doc** (scores, counts, timings) — name the live source instead; a stale figure is worse than none. **A "we tried X and reverted it, don't re-add" trap belongs in `docs/`** (a `followups/` story while the topic is open, the relevant `docs/` page once settled), never only in an assistant's private memory — the whole team drives Claude, so a trap kept private just lets the next colleague's session burn tokens re-attempting the thing we already ruled out.

## Data: Yjs Is the Source of Truth

The collaborative Yjs documents (item doc, properties doc, detail doc, tenant tree — see `docs/architecture-overview.md`) are the source of truth — Postgres holds **denormalized, derived** state persisted from them. So:

- **Never read or reason about app state from the DB**, and **never write test data with direct SQL** (`INSERT`/`UPDATE` into `work_item`, `team_member`, etc.). Wrestling with `dataset_id`, check constraints, and `*_binary_state` means you're working against the grain — the DB row is a projection, not the truth.
- **To create test data, drive the running app**: open the editor and add new lines (work items) through the UI. That flows through Yjs → websocket → DB the way real data does, with all invariants intact.
- **Don't worry about cleaning up or rolling back test data** — the dev stack reseeds fresh on start: `docker:fresh` runs `docker:down -v` (wipe) then `docker:up`. The reset happens at **start**, not on quit — quitting only *stops* the db (the next start removes the leftover and reseeds). Clean-at-start is deliberate: it survives a crash/hard-kill that a stop-time cleanup wouldn't. Create/modify freely; a restart resets it.
- **The entire local dev stack is disposable — tear it down freely, no need to ask.** Kill the node watchers (by port on Windows), run `docker:down -v` / `docker:fresh`, or restart the whole stack whenever it helps (a review, a clean repro, an empirical check). Nothing local — containers, the DB volume, running processes, seeded or test data — is precious; a fresh start reseeds everything. Never hesitate or ask permission to wipe or restart the **local** stack (prod/shared environments remain off-limits per Verify Empirically).
- **To seed a specific or hard-to-reach starting state (e.g. a broken/orphaned one), edit the sample data and restart.** The sample data ships **no Yjs binaries**, so on a fresh start every doc is rebuilt from DB state — e.g. a `team_member` row whose `user` is soft-removed materializes as an orphaned/blank member, reproducing divergence bugs that are awkward to create through the UI.
- **Restarting for a clean state has two traps.** (1) At runtime the websocket persists each doc's Yjs binary (`*_binary_state`) and reloads *from the binary*, not the DB projection — so writing to a *running* DB is futile, the live doc overwrites it (this is the real reason runtime SQL test data fails). (2) Any **open browser tab re-syncs its in-memory CRDT doc back** to the server when it reconnects after the restart, resurrecting the old state into the freshly seeded/rebuilt doc — so **close every tab (or hard-reload) around the restart.**
- Inspect live state through the running app (see Browser / Chrome DevTools MCP below), not by querying Postgres.

## Test-Environment Teardown

**Anything you start to run or watch the test suite, you free before you finish** — the same discipline as the dev stack above, because a leftover process holds native file locks and the developer's next `npm run relock` / `npm ci` dies with `EPERM` on a half-wiped `node_modules`. Reap by name/PID, not just by port (a listening port is not the only way to hold a lock):
- **`serve-dashboard.mjs`** (port 4300) — a board left serving is the classic offender; it survives the run that spawned it.
- **`vitest`/`stryker` workers and their sandboxes** — Stryker copies the workspace into `<workspace>/temp/sandbox-N/`; kill the runner and delete leftover `temp/` dirs.
- **A Playwright run's `webServer`** — it boots the whole stack (`docker:fresh` included); confirm 5173/8080/8081 are free afterwards, since a crashed run orphans children on Windows. Check with `Get-NetTCPConnection -State Listen -LocalPort <port>`: in `netstat -ano` output the port precedes the `LISTENING` column, so a `grep "LISTENING.*:<port>"` never matches and reports every port free.
- **Injected report state** — `testing/report/status.json` and friends are the board's live data; if you hand-edit them to check a render, restore them.

Before telling the developer a relock/`npm ci` is safe to run, actually check for lock holders: enumerate node processes with their command lines (`Get-CimInstance Win32_Process`) and probe the native binaries (`node_modules/**/*.node`) for an exclusive open. **Not every holder is yours** — WebStorm's Tailwind language server (`oxide-helper.js`) loads `@tailwindcss/oxide`'s `.node` straight out of the project tree and respawns on reindex; name it so the developer can close the IDE for the duration.

## Browser / Chrome DevTools MCP

- **Local dev URLs:** web app is `http://localhost:5173` (Vite — **not** port 80), server on `http://localhost:8080`, websocket on `8081`. Navigating to `http://localhost` gives `ERR_CONNECTION_REFUSED`.
- **One browser instance per profile** — driving it holds the shared profile for your **whole session**, blocking other sessions ("browser already running … use `--isolated`"). Launch with **`--isolated`** (throwaway profile) to avoid contention and get clean state; dev auto-login still works (it's env-based, not cookie-based). Don't fight another session for control — ask the user to free it or `/mcp` to reconnect.
- **If you created or changed data, close the tab before you finish** — an open tab re-syncs its in-memory Yjs CRDT on the next stack start and **resurrects your test data** into the freshly-seeded doc (the source-of-truth trap above). `close_page` can't close the last tab — open a blank one first. Sessions keep forgetting this; treat it as part of teardown.
- **The UI is Lit + shadow DOM, and `context` is a module singleton (not on `window`).** `document.querySelector('work-editor')` finds nothing from the light DOM — walk shadow roots recursively. Read live state from a component's `.node` (a `TreeGraph`) and `.node.root` (the `Root`); e.g. `root.loadedDescendants` gives `{id, data: {name, accessLevel, effectiveAccess}}`. To reach the singleton from injected scripts: `const { default: context } = await import('/src/context.ts')` — the Vite dev server returns the app's own module instance, so you can read or monkey-patch live state (survives SPA navigation, lost on page reload). This import can intermittently throw `lit-localize can only be configured once`; navigate the page fresh and retry, or fall back to a component's `.node`.
- **Those components only mount on a work-item view** (`/app/view/WKI-…`), not on the `/app` landing graph. Navigate to a specific item first, otherwise the shadow walk finds no `.node`.

## Environment Variables

Full flow (local files, web config injection, dev vs. real auth) is in `docs/environment.md`; per-variable reference in `env/dev/README.md`. **Deployment** (infrastructure, the CD pipeline, and how secrets are provisioned into each environment) lives in the **GitHub wiki**, not this repo. When adding or changing an env variable, update every place it's needed:
- **`compose-core.yaml`** — declares the variable for each container that needs it. Interpolate from `.env` (`${VAR}`), or hard-code a literal when the value is identical across all environments and you want a single bump point.
- **`env/<environment>/compose/.env`** — committed, plain-text non-secret values referenced via `${VAR}` in `compose-core.yaml`. Not needed when the value is hard-coded in `compose-core.yaml`. Staging auto-syncs via the CD process; other instances need manual update. **There are three deployed environments** — `colinewo-staging`, `snp-production`, `colinewo` — a compose/env change usually applies to all of them; the table in `env/README.md` lists each with its VM size (from `env/<environment>/infra/main.tf`).
- **Local dev values (non-secret):** `env/dev/.env.services` (backend services, loaded by dotenv-cli) and `env/dev/.env.frontend` (web) — committed dummies, each overridable per-dev via its `.local` sibling. The standalone `env/local/.env.example` (the full container stack run via `docker compose`, see `docs/environment.md`) mirrors these — keep container-relevant vars in sync.
- **Web service:** exposed as `import.meta.env.<VAR>`. Add the name + dev value to `env/dev/.env.frontend` (the only spot — `vite.config.ts`/`env-variables.ts` propagate it), and for prod to `compose-core.yaml`'s web `environment:` (nginx envsubst fills it; mechanism in `docs/environment.md`).
- **Secrets** (API keys, passwords) — never commit. Append the secret name to `env/<environment>/compose/secrets.list` (loaded at deploy time by `env/load-secrets.sh`) and create `<ENV>_<NAME>` (e.g. `STAGING_<NAME>`) in Google Secret Manager before merging.

Comment non-obvious committed values — empty/optional vars and `your_*`-style placeholders get a one-line note above them on purpose + when they're needed; skip self-evident ones (passwords, role names).

## Code Style

- No space between control flow keywords and parentheses: `if(`, `for(`, `while(`, `switch(`
- Prefer single return statements per function. Guard clauses (early returns for invalid input or preconditions) are fine; avoid multiple return points within the main logic.
- Prefer self-documenting code over comments: extract a well-named variable or function instead of a comment explaining *what* the code does. Reserve comments for genuinely non-obvious *why*.
- Backend logging (all backend services — pino via `@colinewo/nestjs-logger`): pass structured fields **first**, the message string **second** — `logger.info({ userId }, 'User created')`, never `logger.info({ message: 'User created', userId })` (Pino owns the `msg` slot, so a `message` field gets clobbered if the message key ever changes). Never `console.*`: GCP captures it at **"default" severity with no stack trace**, so it never reaches Error Reporting and can't be filtered by level in Logs Explorer. Always go through the logger (it sets severity + serializes the error) — `logger.error({ err }, 'Message')`, or a context logger where one is in scope (e.g. websocket's HocusPocus context: `getContextLogger(hocuspocusContext).error({ err }, 'Message')`).

## General Guidelines

- **Never suggest, offer, or bring up committing — and never push.** Leave changes uncommitted for review by default. An explicit "commit" instruction from the user is the one exception: then run `git commit` locally (still never push, and never PR/issue actions — draft text for the user instead).
- Prefer editing existing files over creating new ones.
- **Default to ZERO comments — this code is read mostly by AI, and a wall of `// Note:` narration is worse than none.** The bar for a code comment is a *one-line, in-place wrong-change guard* the code genuinely cannot carry (a library quirk, an ordering hazard, a "looks-removable-but-isn't"). Write those silently, without asking. Everything else is not a comment:
    - **Explaining *why*, a mechanism, an algorithm, a design rationale, or anything longer than one line → goes in `docs/` (usually `architecture-overview.md`) or the nearest README, NOT in a code comment.** A multi-line `// Note:` block is always a defect: move it to docs and leave the code bare (a one-line pointer to the doc is fine).
    - **Explaining *what* the code does → make the code self-documenting** (a named variable or helper), never a comment.
    - Rule of thumb: more than one or two `// Note:` lines in a whole change means you're narrating — cut back hard. Apply this *as you write*, not only when challenged.
- **Every intentional comment starts with `// Note:`** (a multi-line note prefixes only its first line; continuation lines stay `//`). The prefix is mandatory, not stylistic — an un-prefixed explanatory `//` comment is a defect: either promote it to a `// Note:` that clears the bar, or delete it. (`// eslint-*`, `// @ts-*`, and URL-only lines are tooling directives, not comments, and are exempt.)
- **Silent self-sweep before finishing:** grep your own diff for `//` (every comment, not just `Note:`) and, for each, either delete it if it doesn't clear the bar or make it a `// Note:` if it does. This is your own cleanup step, done on your own — not a checklist to run past the user, who reviews comments in the diff like any other line.
- **Comment litmus test:** a reader who has only ever seen today's code must find the comment meaningful. Comments that describe what is *absent*, what *moved away*, or what an *old version* did ("no X here — it lives in Y now") fail this test — they document the diff, which git already holds. Delete them.
- Don't add features or refactor beyond what was explicitly asked.
- **Removal is part of the change.** When you replace or move a function, dependency, script, or file, sweep for what it leaves behind in the same pass: the old declaration/dep entry, imports of it, scripts/Dockerfile lines wired to it, and doc/README mentions. `/cleanup` runs this sweep repo-wide (or `/cleanup diff` for the current branch).
- **Tests are part of the change.** The repo has a Vitest suite across eight workspaces (root `README.md` → "Testing"; unit/integration via `npm test`, E2E via `npm run test:e2e`). A behavior change ships with tests: add or adjust a test at the **cheapest layer that catches a regression** for anything new or fixed, and get the affected suite **green** before the work is done (a scenario only reachable live — multi-user, browser, reconnect — is covered by a Playwright E2E spec, not by a unit stub). Prefer **behavior over implementation**, and don't trust green alone — a test that survives mutating the code it covers is the real bar (mutation testing via Stryker, e.g. `npm run test:mutation -w @colinewo/detail-schema`). Never leave new behavior or a bug-fix untested.
    - **Fixing a bug is red-first, always:** write the regression test so it **fails against the bug first** (run it, see it red), then fix until it goes green — that proves the test actually catches the bug, not just that it passes. This applies to every session. Full test-first for *new* work is opt-in per session via **`/tdd`**. What makes a test *solid* (behaviour over implementation, property-based, mutation score over coverage, and the AI-test failure modes to avoid): `docs/testing-guide.md`.
    - **Trust levels — the `AI:` flag:** a test whose expected value you obtained by *running the code* (rather than reasoning from intent/spec) must be titled `it('AI: …')` — it pins current behaviour that may be a bug. When your change reddens an `AI:`-flagged test, **challenge it**: re-derive the intended behaviour, don't blindly preserve it — a red `AI:` test is often a *correct* fix; verify against intent, then drop the prefix (or convert to `it.fails` if the old behaviour was wrong). Plain `it(…)` = reasoned/trusted; taxonomy in `docs/testing-guide.md`.
- Document the current state, not the change. Don't justify something by the old name or a removed approach, or write "this used to…" / "don't revert" notes — say what *is*; git and PRs hold the history.
- Read code before modifying it — understand before changing.
- Use full words for names, no abbreviations
- Place private helper functions below the public/main function that uses them, not above
- For TypeScript type checks, run **`npm run typecheck`** (all workspaces, from the repo root) or `npm run typecheck -w <pkg>` — that is exactly what CI runs, and it uses each workspace's `tsconfig.typecheck.json`, which covers **`test/` as well as `src`**. A per-workspace `npx tsc --noEmit -p tsconfig.json` checks a *smaller* file set (several `tsconfig.json`s are narrowed to `include: ["src"]`), so it reports clean while CI fails on a test-file error. Never run `tsc <file.ts>` or bare `tsc` — passing files directly makes the compiler ignore the tsconfig and emit `.js`/`.d.ts`/`.js.map` next to the sources, polluting the tree.
- npm workspaces monorepo: run workspace-scoped commands (`npm run <script> -w <pkg>`) from the **repo root**, not from inside a package dir (else `npm error No workspaces found`). Dockerfiles that install workspaces via `COPY --parents` need `# syntax=docker/dockerfile:1` as the first line.
- When a change adds/removes/bumps a dependency in any `package.json`, a **`npm run relock`** (clean reinstall + fresh `package-lock.json`) is **required** — and it is the **developer's step before opening the PR, NOT something the AI runs.** Claude only **reminds** the user a relock is pending; it must not run relock itself and must not claim the lockfile is CI-ready after a plain `npm install`. **Why it's required, not optional:** npm has a known bug (npm/cli#4828) where an `npm install`/uninstall on one OS **prunes the other platforms' `optionalDependencies`** (the native binaries for rolldown/rollup, esbuild, lightningcss, `@tailwindcss/oxide`, …) from `package-lock.json`; a lockfile pruned on Windows then fails **`npm ci` on the Linux CI/build**. A fresh relock rewrites the full cross-platform set. **A PR check enforces this**, so a pruned lockfile is caught at PR time. Relock wipes every `node_modules`, so the **stack must be stopped first** — running node services hold native file locks (e.g. lightningcss) and `rimraf` fails with `EPERM`, leaving the tree half-wiped. Free ports don't prove it's stopped: on Windows a hard-killed stack orphans its child processes — on `EPERM`, hunt orphaned node processes.