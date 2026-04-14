---
title: "React — Interview Questions & Mental Models"
date: "2026-04-14"
tags: ["React", "Hooks", "Lifecycle", "Performance", "Interviews"]
---

> Bullet-first notes: what interviewers often probe, how lifecycle maps to hooks, and when to reach for each API. Pair with your JS fundamentals doc.

---

## 1. Class lifecycle vs hooks (the mapping)

Interviewers still ask “lifecycle” even in function components — they mean **when effects run** and **when state updates**.

| Class concept | Hooks-era mental model |
|---------------|-------------------------|
| `constructor` | Initial state / one-time setup before paint (rarely needed; prefer `useState` initialiser or lazy init `useState(() => …)`). |
| `render` | The function body runs every time React needs to render this component. |
| `componentDidMount` | `useEffect(() => { … }, [])` — after paint, browser has committed DOM. |
| `componentDidUpdate` | `useEffect(() => { … }, [deps])` — runs after render when deps changed; or separate effects per concern. |
| `componentWillUnmount` (cleanup) | Return a function from `useEffect`: `useEffect(() => { return () => cleanup(); }, [deps])`. |
| `getDerivedStateFromProps` | Prefer **controlled props** or **key** to reset state; rarely `useEffect` syncing props → state (document why). |

**Typical follow-up:** “What runs first — layout effect or effect?” → **`useLayoutEffect`** fires **synchronously after DOM mutations** before paint; **`useEffect`** fires **after paint** (async in browser terms). Use layout effect for measuring DOM or avoiding flicker.

---

## 2. `useEffect` — what interviewers want to hear

- **Purpose:** synchronise component with **external systems** (network, subscriptions, timers, browser APIs), not to “derive” values you can compute during render.
- **Dependency array:** exhaustive deps = effect re-runs when those values change. Stale closures happen when you omit deps on purpose without `eslint-plugin-react-hooks`.
- **Cleanup:** runs before re-run of the effect (on dep change) and on unmount — ideal for abort controllers, unsubscribing, clearing intervals.
- **Strict Mode (dev):** React may **mount → unmount → mount** once to surface missing cleanup. Mention you’ve seen double `useEffect` in dev — that’s intentional.

```tsx
useEffect(() => {
  const ac = new AbortController()
  fetch(url, { signal: ac.signal }).then(/* … */)
  return () => ac.abort()
}, [url])
```

**Classic Q:** “Empty deps `[]` — when is it wrong?” → When the effect **should** react to `props`/`state` changes but you froze it — leads to bugs.

---

## 3. `useState` & batching

- Updates may be **batched** (especially in event handlers) so multiple `setState` calls → one re-render.
- **Functional updates** `setCount(c => c + 1)` when next state depends on previous — avoids stale state in async callbacks.
- **Initial state:** `useState(expensive())` runs every render — use `useState(() => expensive())` for lazy init.

---

## 4. `useMemo` / `useCallback` / `React.memo` — don’t over-apply

- **`useMemo`:** cache a **computed value**; only worth it if the computation is genuinely expensive or you need **referential stability** for deps of other hooks/memos.
- **`useCallback`:** stable **function identity** for children that are `memo`’d or for deps arrays — not a performance knob by default.
- **`React.memo`:** skip re-render of child if props are shallow-equal — useless if you pass **new object/array/function** every render unless stabilised.

**Classic Q:** “How do you avoid unnecessary re-renders?” → First: correct data flow and smaller components; then `memo` + stable props; then profiling (React DevTools Profiler).

---

## 5. Keys & lists

- **Key** tells React **identity** across reorders — must be **stable among siblings**, not array index if the list can reorder/filter (wrong identity → state bugs, animation glitches).
- Keys are **not** passed as props to your component unless you duplicate as a real prop.

---

## 6. Controlled vs uncontrolled inputs

- **Controlled:** React state is source of truth — `value` + `onChange`.
- **Uncontrolled:** DOM holds value — `defaultValue` + `ref` to read.
- **When to use:** forms that need instant validation / conditional UI → controlled; simple file inputs or integrating non-React widgets → often uncontrolled + ref.

---

## 7. Lifting state up

- Put shared state in the **nearest common ancestor** and pass callbacks down.
- Interview angle: avoids prop drilling explosion — then introduce **Context** or state libraries when **many** intermediaries** only forward props.

---

## 8. Context — caveats they want you to know

- Good for **infrequently changing** data (theme, locale, auth user id).
- **Every** context change can re-render all consumers — split contexts by update frequency or pass stable values + dispatch (e.g. `useReducer` pattern).
- Not a replacement for Redux/Zustand for **high-frequency** updates unless structured carefully.

---

## 9. Refs (`useRef`)

- **`.current` persists** across renders without causing re-renders when mutated.
- Use for: DOM nodes, timer ids, **any mutable value** that shouldn’t trigger render.
- Don’t read/write `ref.current` during render for things that affect output (that’s state territory).

---

## 10. Synthetic events & delegation

- React attaches listeners at the **root** (historically delegation) — consistent API, pooling (legacy) / normalization across browsers.
- **Stop propagation** still works; know the difference between React’s event system and native `addEventListener` if you mix them.

---

## 11. Portals

- Render children into another DOM node (`document.body`, modal container) while keeping React tree/context parent.
- Common use: modals, tooltips, escape `overflow: hidden` ancestors.

---

## 12. Error boundaries

- **Class-only** `componentDidCatch` / `getDerivedStateFromError` — no hook equivalent yet for catching **render** errors in children.
- Function components can still **throw** to a boundary above; boundaries don’t catch event handler errors (use `try/catch` there).

---

## 13. Suspense & concurrent direction (high level)

- **Suspense** for lazy components (`React.lazy`) and (with frameworks) async data — show fallback while waiting.
- **Concurrent rendering** can interrupt work — effects may run with stricter assumptions; prefer idempotent effects and good cleanup.

---

## 14. Short “round” questions they often ask

1. **Virtual DOM — why?** → Declarative UI + batched updates; diffing reduces direct DOM work; not “faster than vanilla DOM” in every case.
2. **What triggers a re-render?** → State/context change in this tree, or parent re-render (unless `memo` + stable props).
3. **Hooks rules?** → Only call at top level of React functions; same order every render — so no hooks in loops/conditions.
4. **Refs vs state?** → State triggers re-render; ref updates don’t.
5. **SSR/hydration mismatch?** → Don’t use `Date.now()` / random in initial HTML without suppressing or matching server output.
6. **How would you share logic between components?** → Extract custom hooks, composition, or render props — not inheritance.

---

## 15. One mini code-reading angle

They may show:

```tsx
useEffect(() => {
  doSomething(a, b)
}, [a])
```

Ask: **is `b` stale?** → If `b` is used inside and omitted from deps, yes — fix deps or document intentional omission with lint disable + comment.

---

> **Study order for a sprint:** hooks rules → `useEffect` deps & cleanup → batching → `memo`/`useCallback` when → Context pitfalls → error boundaries → Profiler mindset.
