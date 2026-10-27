# wanderlust

Next.js 16 App Router app (`src/`). Barely scaffolded: one route, full shadcn/ui collection installed.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Verify changes

- `npm run lint` — runs bare `eslint`, flat config in `eslint.config.mjs`
- `npx next typegen && npx tsc --noEmit` — `tsc` alone skips route-type validation; generate types first
- `npm run build` — full check. No test runner is configured; don't invent test commands.

## Toolchain quirks

- **cacheComponents is enabled.** Async data access (await, DB, fetch) must opt into caching with the `use cache` directive or be wrapped in a Suspense boundary, or the build errors. Runtime-dependent data: `use cache: private`. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
- **Tailwind v4, CSS-first:** there is no `tailwind.config.js`; theme/custom properties live in `src/app/globals.css`. Tailwind is wired through a `turbopack.rules` entry in `next.config.ts`, not PostCSS.
- **React Compiler is enabled** (`reactCompiler: true`). Follow the Rules of React; no manual `memo`/`useMemo` for render purity.
- **Turbopack only.** Configure via `turbopack` in `next.config.ts`; webpack config is not supported here.

## Structure

- `@/*` maps to `src/*` (tsconfig paths).
- shadcn/ui: `src/components/ui` holds the full installed collection, style `base-nova` (see `components.json`). Add new primitives with `npx shadcn@latest add <name>`; icons come from `lucide-react`. Helpers: `@/lib/utils` (`cn`), `@/lib/highlighter`.
