import { FlashCardTopic } from "../topics-data"

export const reactInterviewQuestions: FlashCardTopic = {
  slug: "react-interview-questions",
  title: "React — Interview Questions & Mental Models",
  tags: ["React", "Hooks", "Lifecycle", "Performance", "Interviews"],
  cards: [
    {
      id: "react-1",
      title: "Class lifecycle vs hooks (the mapping)",
      bullets: [
        "Interviewers ask 'lifecycle' even in function components — they mean when effects run and when state updates.",
        "constructor → initial state / one-time setup; prefer useState initialiser or lazy init useState(() => ...).",
        "render → the function body runs every time React needs to render.",
        "componentDidMount → useEffect(() => { ... }, []) — after paint, browser has committed DOM.",
        "componentDidUpdate → useEffect(() => { ... }, [deps]) — runs after render when deps changed.",
        "componentWillUnmount (cleanup) → return a function from useEffect: useEffect(() => { return () => cleanup(); }, [deps]).",
        "getDerivedStateFromProps → prefer controlled props or key to reset state.",
        "Follow-up: useLayoutEffect fires synchronously after DOM mutations before paint; useEffect fires after paint. Use layout effect for measuring DOM or avoiding flicker.",
      ],
    },
    {
      id: "react-2",
      title: "useEffect — what interviewers want to hear",
      bullets: [
        "Purpose: synchronise component with external systems (network, subscriptions, timers, browser APIs), not to derive values you can compute during render.",
        "Dependency array: exhaustive deps = effect re-runs when those values change. Stale closures happen when you omit deps without eslint-plugin-react-hooks.",
        "Cleanup: runs before re-run of the effect (on dep change) and on unmount — ideal for abort controllers, unsubscribing, clearing intervals.",
        "Strict Mode (dev): React may mount → unmount → mount once to surface missing cleanup. Double useEffect in dev is intentional.",
        "Classic Q: empty deps [] — when is it wrong? When the effect should react to props/state changes but you froze it — leads to bugs.",
      ],
      code: `useEffect(() => {
  const ac = new AbortController()
  fetch(url, { signal: ac.signal }).then(/* ... */)
  return () => ac.abort()
}, [url])`,
      language: "tsx",
    },
    {
      id: "react-3",
      title: "useState & batching",
      bullets: [
        "Updates may be batched (especially in event handlers) so multiple setState calls → one re-render.",
        "Functional updates: setCount(c => c + 1) when next state depends on previous — avoids stale state in async callbacks.",
        "Initial state: useState(expensive()) runs every render — use useState(() => expensive()) for lazy init.",
      ],
    },
    {
      id: "react-4",
      title: "useMemo / useCallback / React.memo — don't over-apply",
      bullets: [
        "useMemo: cache a computed value; only worth it if computation is genuinely expensive or you need referential stability for deps of other hooks/memos.",
        "useCallback: stable function identity for children that are memo'd or for deps arrays — not a performance knob by default.",
        "React.memo: skip re-render of child if props are shallow-equal — useless if you pass new object/array/function every render unless stabilised.",
        "Classic Q: how do you avoid unnecessary re-renders? → First: correct data flow and smaller components; then memo + stable props; then profiling (React DevTools Profiler).",
      ],
    },
    {
      id: "react-5",
      title: "Keys & lists",
      bullets: [
        "Key tells React identity across reorders — must be stable among siblings.",
        "Don't use array index as key if the list can reorder/filter — wrong identity leads to state bugs and animation glitches.",
        "Keys are not passed as props to your component unless you duplicate them as a real prop.",
      ],
    },
    {
      id: "react-6",
      title: "Controlled vs uncontrolled inputs",
      bullets: [
        "Controlled: React state is source of truth — use value + onChange.",
        "Uncontrolled: DOM holds value — use defaultValue + ref to read.",
        "When to use: forms needing instant validation / conditional UI → controlled; simple file inputs or non-React widget integrations → often uncontrolled + ref.",
      ],
    },
    {
      id: "react-7",
      title: "Lifting state up",
      bullets: [
        "Put shared state in the nearest common ancestor and pass callbacks down.",
        "Avoids prop drilling explosion — then introduce Context or state libraries when many intermediaries only forward props.",
      ],
    },
    {
      id: "react-8",
      title: "Context — caveats they want you to know",
      bullets: [
        "Good for infrequently changing data (theme, locale, auth user id).",
        "Every context change can re-render all consumers — split contexts by update frequency or pass stable values + dispatch (e.g. useReducer pattern).",
        "Not a replacement for Redux/Zustand for high-frequency updates unless structured carefully.",
      ],
    },
    {
      id: "react-9",
      title: "Refs (useRef)",
      bullets: [
        ".current persists across renders without causing re-renders when mutated.",
        "Use for: DOM nodes, timer ids, any mutable value that shouldn't trigger render.",
        "Don't read/write ref.current during render for things that affect output — that's state territory.",
      ],
    },
    {
      id: "react-10",
      title: "Synthetic events & delegation",
      bullets: [
        "React attaches listeners at the root (historically delegation) — consistent API, normalization across browsers.",
        "stopPropagation still works; know the difference between React's event system and native addEventListener if you mix them.",
      ],
    },
    {
      id: "react-11",
      title: "Portals",
      bullets: [
        "Render children into another DOM node (document.body, modal container) while keeping React tree/context parent.",
        "Common use: modals, tooltips, escaping overflow: hidden ancestors.",
      ],
    },
    {
      id: "react-12",
      title: "Error boundaries",
      bullets: [
        "Class-only: componentDidCatch / getDerivedStateFromError — no hook equivalent yet for catching render errors in children.",
        "Function components can still throw to a boundary above.",
        "Boundaries don't catch event handler errors — use try/catch there.",
      ],
    },
    {
      id: "react-13",
      title: "Suspense & concurrent direction (high level)",
      bullets: [
        "Suspense for lazy components (React.lazy) and (with frameworks) async data — show fallback while waiting.",
        "Concurrent rendering can interrupt work — effects may run with stricter assumptions; prefer idempotent effects and good cleanup.",
      ],
    },
    {
      id: "react-14",
      title: "Short 'round' questions they often ask",
      bullets: [
        "Virtual DOM — why? → Declarative UI + batched updates; diffing reduces direct DOM work; not 'faster than vanilla DOM' in every case.",
        "What triggers a re-render? → State/context change in this tree, or parent re-render (unless memo + stable props).",
        "Hooks rules? → Only call at top level of React functions; same order every render — no hooks in loops/conditions.",
        "Refs vs state? → State triggers re-render; ref updates don't.",
        "SSR/hydration mismatch? → Don't use Date.now() / random in initial HTML without suppressing or matching server output.",
        "How would you share logic between components? → Extract custom hooks, composition, or render props — not inheritance.",
      ],
    },
    {
      id: "react-15",
      title: "Code reading angle — stale deps",
      bullets: [
        "When shown a useEffect with a dependency omitted from the array, ask: is that value stale?",
        "If b is used inside the effect but omitted from deps, yes — fix deps or document intentional omission with lint disable + comment.",
        "Study order for a sprint: hooks rules → useEffect deps & cleanup → batching → memo/useCallback when → Context pitfalls → error boundaries → Profiler mindset.",
      ],
      code: `useEffect(() => {
  doSomething(a, b)
}, [a]) // b is stale if omitted`,
      language: "tsx",
    },
  ],
}
