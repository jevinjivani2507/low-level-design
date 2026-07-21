# Project

Personal interview-prep website. **Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript**, package manager **bun**. All content is authored as typed data files (or markdown), not a CMS.

Three sections:

- `/` — Low-Level Design problems (from `content/<slug>/`)
- `/dsa` — DSA problems with a filterable table + detail panel + search
- `/blogs` — a docs-style site (left sidebar + right content) built from "flash card" topics

## Commands

Run before every commit — all must pass:

```bash
bun run typecheck   # tsc --noEmit
bun run lint        # eslint
bun run format      # prettier --write
```

Other: `bun run dev` (local), `bun run build` (validates routing/SSG — run it after route/layout changes).

## Conventions

- **Commit directly to `main`** (owner preference). No feature branches unless asked. Push after committing.
- End commit messages with the `Co-Authored-By` trailer.
- DSA solutions are **C++** in the `code` field.
- ESLint enforces `react-hooks/set-state-in-effect`: **never call `setState` inside a `useEffect`** — derive the value during render instead.

## Layout

- `app/` — routes. `page.tsx` (LLD home), `dsa/page.tsx`, `blogs/**`, `problems/[slug]`.
- `lib/dsa/*.ts` — one file per DSA topic; aggregated in `lib/dsa-data.ts` (data shapes: `DsaQuestion`, `TestCase`).
- `lib/topics/*.ts` — one file per blog/docs topic; aggregated in `lib/topics-data.ts` (data shapes: `FlashCard`, `FlashCardTopic`).
- `content/<slug>/{question.md,solution.md}` — LLD problems.
- `components/` — UI (`components/ui`) and feature components (`components/dsa`, `components/blogs`, `components/topics`).

---

## How to add a DSA question

1. Pick the topic file in `lib/dsa/` (e.g. `array.ts`, `graph.ts`, `dynamic-programming.ts`). If no category fits, create a new file exporting a `DsaTopic`, then register it in `lib/dsa-data.ts` (import + add to the `dsaTopics` array).
2. Append a `DsaQuestion` (shape in `lib/dsa-data.ts`):
   - `id` (kebab-case slug), `title`, `difficulty`, `leetcodeUrl`, `question`, `code` (C++), `timeComplexity`, `spaceComplexity`, `notes`.
   - `testCases?` — each has `input`/`output`/`explanation?`. For diagrams add `trees` (+ set `type: "TREE"`), `matrices`, or `graphs` (see `TestCase` doc comments).
   - `tags?` — see below.
3. **Tags / filters:** the master filter list is `export const tags` in `lib/dsa-data.ts` (`striver-a2z`, `neetcode-150`, `blind-75`). Add the tag(s) to the question's `tags` array; if introducing a new tag, also add the string to the master list. `blind-75 ⊂ neetcode-150`; "NeetCode 75" ≡ Blind 75 (no separate list).
4. **Notes + inline `// O(...)` comments:** follow the `dsa-format` skill (rewrites `notes` to bullets and annotates the C++). Invoke it for any `lib/dsa/*.ts` formatting.

## How to add a blog doc (the `/blogs` docs section)

Each blog **topic** is a `FlashCardTopic` in `lib/topics/*.ts`; each **card** is one doc page. URLs (`/blogs/<topic.slug>/<card.id>`), the sidebar, and prev/next are generated automatically — no routing work.

- **New page:** append a `card` `{ id, title, bullets: string[], code?, language? }` to a topic's `cards`. `id` becomes the URL segment.
- **New topic:** create `lib/topics/<name>.ts` exporting a `FlashCardTopic` `{ slug, title, tags, cards }`, then register it in `lib/topics-data.ts` (import + add to `flashCardTopics`).
- **Highlight keywords:** wrap them in `**double asterisks**` inside a bullet — rendered as a yellow highlighter marker (`components/blogs/highlight.tsx`). No other markdown is parsed in bullets. Use a single non-paired `**` only if you truly need a literal (e.g. `2 ** n`).

## How to add an LLD problem

Create `content/<slug>/question.md` and `content/<slug>/solution.md`. It appears on the home page automatically.
