import { FlashCardTopic } from "../topics-data"

export const jsMachineCoding: FlashCardTopic = {
  slug: "js-machine-coding-questions",
  title: "JS Machine Coding Questions — Implementations You Must Know",
  tags: ["JavaScript", "Machine Coding", "Closures", "Functional Programming", "Interview"],
  cards: [
    {
      id: "mc-1",
      title: "Memoize",
      bullets: [
        "Cache the result of a pure function so repeated calls with the same arguments skip recomputation.",
        "Key insight: Use a Map keyed by JSON.stringify(args). Works best for pure functions with primitive arguments.",
        "Gotcha: JSON.stringify fails for functions, undefined, circular refs — use a custom key for complex args.",
        "Gotcha: Each memoized function gets its own independent cache.",
        "Gotcha: Not useful for functions with side effects.",
      ],
      code: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});
factorial(5); // computed → 120
factorial(5); // from cache → 120`,
      language: "js",
    },
    {
      id: "mc-2",
      title: "Currying",
      bullets: [
        "Transform f(a, b, c) into f(a)(b)(c) — a chain of single-argument functions.",
        "Key insight: Recursively return a new function until all expected arguments (fn.length) have been collected, then call the original.",
        "Gotcha: fn.length counts only explicitly declared parameters — rest params (...args) report 0.",
        "Gotcha: Partial application (passing multiple args at once) should still work.",
        "Gotcha: Infinite currying (no fixed arity) requires a different pattern — override valueOf/toString.",
      ],
      code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

function add(a, b, c) { return a + b + c; }
const curriedAdd = curry(add);
curriedAdd(1)(2)(3);  // 6
curriedAdd(1, 2)(3);  // 6  ← partial application works too`,
      language: "js",
    },
    {
      id: "mc-3",
      title: "Pipe (& Compose)",
      bullets: [
        "pipe(f, g, h)(x) → h(g(f(x))) — left-to-right function composition.",
        "compose is right-to-left — just use reduceRight.",
        "Key insight: reduce over the array of functions, passing the accumulated value through each in order.",
        "Gotcha: pipe with zero functions should be an identity (x => x).",
        "Gotcha: Each function must accept and return a single value for basic pipe — for async, use async/await inside reduce.",
      ],
      code: `function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}

function compose(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

const double = x => x * 2;
const addTen = x => x + 10;
const square = x => x * x;
pipe(double, addTen, square)(3); // 256

// Async pipe
function asyncPipe(...fns) {
  return function (value) {
    return fns.reduce((p, fn) => p.then(fn), Promise.resolve(value));
  };
}`,
      language: "js",
    },
    {
      id: "mc-4",
      title: "Promise — Build from Scratch",
      bullets: [
        "Implement a MyPromise class with resolve, reject, .then, and .catch.",
        "Key insight: Store state (pending/fulfilled/rejected) and value. Queue .then callbacks — run them when the promise settles. Chaining works by returning a new MyPromise from each .then.",
        "Gotcha: A promise can only transition once — guard with if (state !== 'pending') return.",
        "Gotcha: If .then callback itself throws, the returned promise must reject.",
        "Gotcha: Real Promises run callbacks asynchronously (microtask queue) — simplified version runs them synchronously.",
      ],
      code: `class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCbs.forEach(cb => cb(value));
    };
    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = reason;
      this.onRejectedCbs.forEach(cb => cb(reason));
    };
    try { executor(resolve, reject); }
    catch (e) { reject(e); }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfill = (value) => {
        try { resolve(onFulfilled ? onFulfilled(value) : value); }
        catch (e) { reject(e); }
      };
      const handleReject = (reason) => {
        try { resolve(onRejected ? onRejected(reason) : (() => { throw reason; })()); }
        catch (e) { reject(e); }
      };
      if (this.state === "fulfilled") handleFulfill(this.value);
      else if (this.state === "rejected") handleReject(this.value);
      else {
        this.onFulfilledCbs.push(handleFulfill);
        this.onRejectedCbs.push(handleReject);
      }
    });
  }

  catch(onRejected) { return this.then(null, onRejected); }
  static resolve(value) { return new MyPromise(res => res(value)); }
  static reject(reason) { return new MyPromise((_, rej) => rej(reason)); }
}`,
      language: "js",
    },
    {
      id: "mc-5",
      title: "Flatten — nested array (5.1)",
      bullets: [
        "Flatten [1, [2, [3]]] → [1, 2, 3]. Only arrays, no object key paths.",
        "Recursive: reduce with optional depth param. Built-in: arr.flat(Infinity).",
        "Iterative (stack): avoids deep recursion stack overflow.",
        "Gotcha: Iterative unshift is O(n) per step — for huge inputs, push and reverse() at the end instead.",
      ],
      code: `// Recursive with depth
function flatten(arr, depth = Infinity) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flatten(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

// Iterative (stack)
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) stack.push(...item);
    else result.unshift(item);
  }
  return result;
}`,
      language: "js",
    },
    {
      id: "mc-6",
      title: "Flatten — object with dot paths (5.2)",
      bullets: [
        "Nested plain objects only (values are not arrays). Output keys use dots: a.b.c → one string key.",
        "Gotcha: If a value is an array, this keeps it under 'a.b' as a single array (does not expand [0]). Use 5.3 when arrays must become part of the path.",
      ],
      code: `function flattenObjectDot(obj, prefix = "") {
  const out = {};
  for (const k of Object.keys(obj)) {
    const path = prefix ? \`\${prefix}.\${k}\` : k;
    const v = obj[k];
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flattenObjectDot(v, path));
    } else {
      out[path] = v;
    }
  }
  return out;
}

flattenObjectDot({ a: { b: { c: 1 } }, q: 10 });
// { "a.b.c": 1, q: 10 }`,
      language: "js",
    },
    {
      id: "mc-7",
      title: "Flatten — object + array paths (5.3)",
      bullets: [
        "Same as 5.2, but nested arrays become [index] segments in the key string (e.g. w[0].e.r).",
        "Mix of dots (object keys) and brackets (array indices) in one string.",
        "Three separate questions: 5.1 array flattening, 5.2 object-only dot paths, 5.3 object + array path keys.",
      ],
      code: `function flattenObject(obj, prefix = "") {
  const out = {};
  if (obj === null || typeof obj !== "object") {
    if (prefix !== "") out[prefix] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      if (prefix !== "") out[prefix] = [];
      return out;
    }
    obj.forEach((item, i) => {
      const path = prefix ? \`\${prefix}[\${i}]\` : \`[\${i}]\`;
      Object.assign(out, flattenObject(item, path));
    });
    return out;
  }
  for (const k of Object.keys(obj)) {
    const path = prefix ? \`\${prefix}.\${k}\` : k;
    const v = obj[k];
    if (v !== null && typeof v === "object") {
      Object.assign(out, flattenObject(v, path));
    } else {
      out[path] = v;
    }
  }
  return out;
}

flattenObject({ w: [{ e: { r: 8 } }], x: { y: 2 } });
// { "w[0].e.r": 8, "x.y": 2 }`,
      language: "js",
    },
    {
      id: "mc-8",
      title: "Custom bind",
      bullets: [
        "Implement Function.prototype.myBind(ctx, ...presetArgs) — returns a new function with this bound to ctx and optional pre-filled arguments.",
        "Key insight: Return a closure. Inside, use apply to call the original function with the bound this. Merge preset args with new call-time args.",
        "Gotcha: this inside myBind is the function it's called on — save it before the returned closure shadows it.",
        "Gotcha: Real bind also handles new — when the bound function is used as a constructor, the bound this is ignored. Handle with instanceof.",
      ],
      code: `// Simple version
Function.prototype.myBind = function (ctx, ...presetArgs) {
  const fn = this;
  return function (...callArgs) {
    return fn.apply(ctx, [...presetArgs, ...callArgs]);
  };
};

// With new support
Function.prototype.myBind = function (ctx, ...presetArgs) {
  const fn = this;
  function bound(...callArgs) {
    return fn.apply(
      this instanceof bound ? this : ctx,
      [...presetArgs, ...callArgs]
    );
  }
  bound.prototype = Object.create(fn.prototype);
  return bound;
};`,
      language: "js",
    },
    {
      id: "mc-9",
      title: "Custom call & apply",
      bullets: [
        "Trick: Temporarily attach the function as a property of ctx, call it (so this inside becomes ctx), then remove it.",
        "Using a Symbol avoids overwriting existing properties on ctx.",
      ],
      code: `Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || globalThis;
  const sym = Symbol();
  ctx[sym] = this;
  const result = ctx[sym](...args);
  delete ctx[sym];
  return result;
};

Function.prototype.myApply = function (ctx, args = []) {
  return this.myCall(ctx, ...args);
};`,
      language: "js",
    },
    {
      id: "mc-10",
      title: "Debounce",
      bullets: [
        "Wait until calls stop for wait ms, then run once — classic for search-as-you-type and resize.",
        "Key insight: Each new call clears the pending setTimeout and schedules a fresh one.",
        "Trailing (default) fires after the burst; leading fires on the first call in a burst.",
        "Gotcha: Always expose .cancel() so callers can clear the timer on unmount.",
        "Gotcha: production libraries (Lodash) also support maxWait.",
      ],
      code: `// Trailing only
function debounce(fn, wait) {
  let timeoutId;
  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  }
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}

// Leading + trailing
function debounce(fn, wait, { leading = false, trailing = true } = {}) {
  let timeoutId;
  return function (...args) {
    const pending = timeoutId != null;
    clearTimeout(timeoutId);
    if (leading && !pending) fn.apply(this, args);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (trailing && (pending || !leading)) fn.apply(this, args);
    }, wait);
  };
}`,
      language: "js",
    },
    {
      id: "mc-11",
      title: "Throttle",
      bullets: [
        "Run the function at most once per wait ms — classic for scroll and mousemove.",
        "Key insight: Track last execution time; either skip calls inside the window (leading) or schedule one trailing call (trailing).",
        "Debounce vs throttle: debounce waits for silence; throttle caps frequency.",
        "For requestAnimationFrame-style scroll, consider a rAF throttle instead of time-based.",
      ],
      code: `function throttle(fn, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  let lastTime = 0;
  let timeoutId;

  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) { clearTimeout(timeoutId); timeoutId = undefined; }
      lastTime = now;
      if (leading) fn.apply(this, args);
    } else if (trailing && !timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = undefined;
        fn.apply(this, args);
      }, remaining);
    }
  };
}`,
      language: "js",
    },
    {
      id: "mc-12",
      title: "Deep clone",
      bullets: [
        "Copy nested objects/arrays so nested values are new references.",
        "Key insight: If value is not an object (or is null), return it. Otherwise build a new array or plain object and recurse.",
        "Gotcha: Does not handle circular refs (infinite loop). For production, use structuredClone(obj) (built-in) or a WeakMap to detect cycles.",
        "Gotcha: Date / Map / Set need special cases if you go beyond plain objects.",
      ],
      code: `function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    copy[key] = deepClone(obj[key]);
  }

  return copy;
}`,
      language: "js",
    },
    {
      id: "mc-13",
      title: "Retry promise",
      bullets: [
        "Run an async function (or promise factory); on failure, retry up to n times with optional delay between attempts.",
        "Loop runs retries + 1 total attempts (initial try plus retries retries).",
        "Exponential backoff (common follow-up): multiply delay by 2 ** attempt inside the loop.",
      ],
      code: `async function retryPromise(fn, { retries = 3, delayMs = 0 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries) throw err;
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw lastError;
}

// Usage
await retryPromise(
  () => fetch("/api").then((r) => r.json()),
  { retries: 2, delayMs: 200 }
);`,
      language: "js",
    },
    {
      id: "mc-14",
      title: "Promise.all polyfill",
      bullets: [
        "Resolve when every input settles successfully; reject with the first rejection (fail-fast). Output order matches input order.",
        "Key insight: Promise.resolve each item so non-thenables count as fulfilled values. Track how many are still pending; on the last success, resolve the array.",
        "Gotcha: Empty iterable must resolve to [], not hang.",
        "Gotcha: First rejection short-circuits — remaining work may still run, but the returned promise is already rejected.",
        "Gotcha: Preserve index order even if promises finish out of order (hence results[i]).",
      ],
      code: `Promise.myAll = function (iterable) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(iterable);
    const n = arr.length;
    if (n === 0) { resolve([]); return; }

    const results = new Array(n);
    let settled = 0;

    arr.forEach((item, i) => {
      Promise.resolve(item).then(
        (value) => {
          results[i] = value;
          settled++;
          if (settled === n) resolve(results);
        },
        reject
      );
    });
  });
};`,
      language: "js",
    },
    {
      id: "mc-15",
      title: "LRU Cache",
      bullets: [
        "Fixed-capacity key-value store; evict the least recently used entry when full.",
        "Key insight: In JavaScript, Map keeps insertion order. On get, delete and re-insert the key to move it to the end (most recently used). Evict the first key when over capacity.",
        "Gotcha: For interviews asking O(1) strictly, mention a doubly linked list + hash map — the Map trick is acceptable in many JS rounds.",
        "Gotcha: get on missing key should not mutate order.",
      ],
      code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
    this.cache.set(key, value);
  }
}`,
      language: "js",
    },
    {
      id: "mc-16",
      title: "Parallel limit (async pool)",
      bullets: [
        "Run many async tasks but only N at a time — e.g. crawl URLs without opening 100 connections.",
        "Key insight: Maintain a pool of N worker loops; each worker pulls the next index from a shared counter until the list is exhausted.",
        "Gotcha: Pass functions (() => doWork(i)) so work starts only when a slot is free — not an array of already-started promises.",
        "Gotcha: Wrap await tasks[i]() in try/catch or use Promise.allSettled on the pool if partial failure is OK.",
      ],
      code: `async function parallelLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const i = nextIndex++;
      if (i >= tasks.length) break;
      results[i] = await tasks[i]();
    }
  }

  const pool = Array.from(
    { length: Math.min(limit, tasks.length) },
    () => worker()
  );
  await Promise.all(pool);
  return results;
}

// Usage: tasks[i] is a zero-arg function returning a Promise
await parallelLimit(
  urls.map((url) => () => fetch(url).then((r) => r.json())),
  3
);`,
      language: "js",
    },
  ],
}
