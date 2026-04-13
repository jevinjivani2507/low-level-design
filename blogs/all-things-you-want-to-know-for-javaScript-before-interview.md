---
title: "Namaste JavaScript — Interview Quick Notes"
date: "2026-04-13"
tags: ["JavaScript", "Closures", "Promises", "Async JS", "Event Loop"]
---

> Condensed notes from all 25 Namaste JavaScript episodes. One concept per section, bullet-first, interview-ready.

---

## Ep 1–2: Execution Context & Call Stack

- Everything in JS runs inside an **Execution Context** — a container with two components: **Memory** (variable environment) and **Code** (thread of execution).
- JS is **synchronous** and **single-threaded** — one command at a time, in order.
- Every EC is created in two phases: **Memory Creation Phase** (variables → `undefined`, functions → full body) then **Code Execution Phase** (runs line by line).
- A new **local EC** is created each time a function is invoked and destroyed on `return`.
- The **Call Stack** manages EC creation and deletion. Also called: Program Stack, Runtime Stack, Execution Context Stack.

---

## Ep 3: Hoisting

> Hoisting is a concept which enables us to extract values of variables and functions even before initialising/assigning value without getting error and this is happening due to the 1st phase (memory creation phase) of the Execution Context.

- `var` declarations are hoisted and initialised to `undefined`.
- Function declarations are hoisted with their **entire body** — callable before the line they appear.
- `let`/`const` are hoisted but stay in the **Temporal Dead Zone** — accessing them before initialisation throws `ReferenceError`.

```js
getName() // "Namaste JS"  ← works, function hoisted fully
console.log(x) // undefined     ← var hoisted as undefined
var x = 7
function getName() {
  console.log("Namaste JS")
}

var fn = function () {} // fn is hoisted as undefined, calling fn() before this line → TypeError
```

---

## Ep 4: Variable Environments

- Each function invocation creates its own EC with its own memory space.
- Variables with the same name in different functions are completely independent — no shared state.

---

## Ep 5: window & this at Global Level

- The shortest JS program is an empty file — JS still creates a **Global EC**, a **global object** (`window` in browsers), and a `this` pointing to it.
- `this === window` at the global level.
- `var` variables declared globally are attached to `window`; `let`/`const` are not.

---

## Ep 6: undefined vs not defined

- `undefined` — memory was allocated but no value assigned yet. JS uses it as a placeholder.
- `not defined` — variable was never declared; accessing it throws `ReferenceError`.
- JS is **loosely typed** — a variable can hold any type at any time.
- Never manually assign `undefined` to a variable; let JS set it.

---

## Ep 7: Scope Chain & Lexical Environment

> **MDN:** The scope of a variable or other expression is the part of a program where it can be referenced. If a variable is not in the current scope, it will be unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scope variables, but not vice versa.

- Every EC has a reference to its **lexical parent's** environment — this chain is the **Scope Chain**.
- An inner function can access variables in all outer scopes; the global EC cannot access local variables.
- `Lexical Environment = local memory + reference to parent's lexical environment`.
- The search travels up the chain until `null` (global) is reached — this is **lexical scoping**.

---

## Ep 8: let, const & Temporal Dead Zone

- `let` and `const` are **block-scoped** and stored in a separate memory space (not on `window`).
- **TDZ** = the time between hoisting and the line where the variable is initialised. Accessing in TDZ → `ReferenceError`.
- `let` can be declared and assigned separately; `const` must be initialised at declaration.
- Re-declaring `let` in the same scope → `SyntaxError`. Reassigning `const` → `TypeError`.
- Best practice: prefer `const` > `let` > avoid `var`.

---

## Ep 9: Block Scope & Shadowing

- A block `{ }` groups statements. `let`/`const` inside a block are scoped to that block; `var` leaks to the enclosing function/global scope.
- **Shadowing**: a same-named inner variable shadows the outer one within its scope.
- `var` shadowing another `var` modifies the same memory — the outer value is overwritten.
- `let` shadowing `let` (or `var`) creates a separate memory slot — the outer is unaffected.
- **Illegal shadowing**: shadowing a `let` with `var` in the same scope → `SyntaxError`.

---

## Ep 10–12: Closures

> **MDN:** A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.

- A **closure** = a function bundled together with its lexical scope. The function remembers variables from its outer scope even after the outer function has returned.
- Closures enable: module pattern, currying, memoisation, data hiding/encapsulation, `setTimeout` callbacks.
- Downside: closed-over variables are not garbage-collected until the closure itself is released → potential memory leaks.

```js
function counter() {
  var count = 0
  return function increment() {
    count++
    console.log(count)
  }
}
const c1 = counter() // independent closure
c1() // 1
c1() // 2
```

**Classic interview Q — `var` in loop:**

```js
// Prints 6,6,6,6,6 — all closures share the same `i` reference
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, i * 1000)
}

// Fix 1: use let (block-scoped, new binding each iteration)
for (let i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, i * 1000)
}

// Fix 2: wrap with a function to capture a new copy
for (var i = 1; i <= 5; i++) {
  ;(function (i) {
    setTimeout(function () {
      console.log(i)
    }, i * 1000)
  })(i)
}
```

---

## Ep 13: First Class Functions

> **MDN:** A programming language is said to have first-class functions when functions in that language are treated like any other variable. A function can be passed as an argument to other functions, returned as the value from another function, and assigned to a variable.

| Term                      | Definition                                                             |
| ------------------------- | ---------------------------------------------------------------------- |
| Function Statement        | `function a() {}` — hoisted fully                                      |
| Function Expression       | `var b = function() {}` — hoisted as `undefined`                       |
| Named Function Expression | `var b = function xyz() {}` — `xyz` not in global scope                |
| Anonymous Function        | No name; used as a value; standalone throws `SyntaxError`              |
| First Class Functions     | Functions can be passed as arguments and returned from other functions |

- **Difference hoisting**: calling a function statement before declaration works; calling a function expression before declaration → `TypeError`.

---

## Ep 14: Callback Functions & Event Listeners

- JS is single-threaded but callbacks give access to **asynchronous** behaviour.
- Never **block the main thread** — use async APIs (`setTimeout`, `fetch`, etc.) for time-intensive work.
- Event listeners form closures over their scope — they are **heavy** (memory not freed until explicitly removed).
- Remove event listeners when no longer needed to allow garbage collection.

---

## Ep 15: Asynchronous JS & Event Loop

> **MDN:** The event loop concept is very simple — there's an endless loop where the JavaScript engine waits for tasks, executes them, and then sleeps, waiting for more tasks. The general algorithm of the engine: while there are tasks → execute them, starting with the oldest task; sleep until a task appears, then go to step 1.

- **Web APIs** (setTimeout, DOM, fetch, localStorage, console) live in the browser — not in the JS engine itself. Accessed via the global `window` object.
- Flow: callback registered in Web API env → on completion, pushed to **Callback Queue** → **Event Loop** moves it to Call Stack when stack is empty.
- **Microtask Queue** (Promise callbacks, MutationObserver) has **higher priority** than the Callback Queue — microtasks run first.
- All the callback functions that come through promises go in microtask Queue.
- **Starvation**: if microtasks keep spawning new microtasks, the Callback Queue never gets a turn.

```
Call Stack ← Event Loop ← Microtask Queue (higher priority)
                        ← Callback/Task Queue
```

---

## Ep 16: JS Engine & V8 Architecture

- JS runs everywhere because of the **JavaScript Runtime Environment** (JRE) = JS Engine + Web APIs + Event Loop + Queues.
- **ECMAScript** sets the spec; each engine (V8, SpiderMonkey, Chakra) implements it.
- Three steps inside the engine: **Parsing** (code → tokens → AST) → **Compilation** (JIT: interpreter + compiler) → **Execution** (Memory Heap + Call Stack).
- V8 internals: **Ignition** (interpreter), **TurboFan** (optimising compiler), **Orinoco** (garbage collector, Mark & Sweep).

---

## Ep 17: setTimeout Trust Issues

- `setTimeout(cb, 0)` does **not** run immediately — `cb` still goes through the Callback Queue and waits for the Call Stack to be empty.
- **Concurrency model**: if the Call Stack is busy for 10 s and the timer was 5 s, the callback fires after 10 s — not 5 s.
- `setTimeout` guarantees **at least** the specified delay, never exactly.

---

## Ep 18–19: Higher-Order Functions, map / filter / reduce

> **MDN:** A higher-order function is a function that takes one or more functions as arguments or returns a function as its result.

- A **Higher-Order Function** takes a function as an argument or returns one.
- `map` — transforms each element, returns a new array of the same length.
- `filter` — returns a new array with elements where the callback returns `true`.
- `reduce` — accumulates all elements into a single output value.

```js
const nums = [1, 2, 3, 4]
nums.map((x) => x * 2) // [2, 4, 6, 8]
nums.filter((x) => x % 2 === 0) // [2, 4]
nums.reduce((acc, x) => acc + x, 0) // 10
```

- `reduce` can replicate `map` and `filter` — useful to know for interviews.

---

## Ep 20: Callback Problems

- **Callback Hell (Pyramid of Doom)**: deeply nested callbacks that make code hard to read and maintain.
- **Inversion of Control**: passing a callback means trusting the callee to invoke it correctly — it may run 0 times, twice, or never.

```js
// Callback hell
api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet()
    })
  })
})
```

---

## Ep 21–22: Promises

> **MDN:** A `Promise` is an object representing the eventual completion or failure of an asynchronous operation. It is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

- A **Promise** is an object that is a placeholder for a future async value. States: `pending` → `fulfilled` or `rejected`.
- Promise result is **immutable** once settled — safe to pass around.
- `.then` attaches a success callback; `.catch` handles rejection; both return promises enabling **chaining**.
- Always `return` a value/promise inside `.then` to pass data down the chain.
- `.catch` placed mid-chain only catches errors from above it; code below it still runs.

```js
createOrder(cart)
  .then((orderId) => proceedToPayment(orderId))
  .then((info) => showOrderSummary(info))
  .catch((err) => console.error(err))
```

---

## Ep 23: async / await

> **MDN:** The `async` function declaration creates a binding of a new async function to a given name. The `await` keyword is permitted within the function body, enabling asynchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains.

- `async` before a function makes it always return a Promise (wraps plain values automatically).
- `await` pauses execution of the **async function** until the promise resolves — the Call Stack is **not blocked** (function is suspended and resumed).
- `async`/`await` is syntactic sugar over `.then`/`.catch` — same behaviour, better readability.
- Error handling: use `try/catch` inside async functions (or `.catch` on the returned promise).
- Promises start executing immediately when created — `await` only waits, it does not start them.

```js
async function fetchUser() {
  try {
    const res = await fetch("https://api.github.com/users/alok722")
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
```

---

## Ep 24: Promise APIs

| API                              | Behaviour                                                                                         | Use when                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `Promise.all([p1,p2,p3])`        | Waits for **all** to fulfill; rejects immediately on first rejection (**fail-fast**)              | Need all results; any failure is fatal  |
| `Promise.allSettled([p1,p2,p3])` | Waits for **all** to settle (fulfill or reject); always returns array of `{status, value/reason}` | Want every result regardless of failure |
| `Promise.race([p1,p2,p3])`       | Settles with the **first** settled promise (fulfill or reject)                                    | Timeout patterns                        |
| `Promise.any([p1,p2,p3])`        | Fulfills with the **first success**; rejects only if **all** reject (`AggregateError`)            | Need at least one success               |

---

## Ep 25: this Keyword

> **MDN:** The `this` value depends on in which context it appears: function, class, or global. In a function, the value of `this` depends on how the function is called. In an object method, `this` refers to the object. In strict mode, if the function was called without being called as a method, `this` is `undefined`.

| Context                       | Value of `this`                                            |
| ----------------------------- | ---------------------------------------------------------- |
| Global scope                  | `window` (browser)                                         |
| Regular function — non-strict | `window` (this substitution)                               |
| Regular function — strict     | `undefined`                                                |
| Object method                 | The object the method is called on                         |
| Arrow function                | Inherited from **enclosing lexical scope** (no own `this`) |
| DOM event handler             | The HTML element that fired the event                      |

- `call(ctx, ...args)`, `apply(ctx, [args])`, `bind(ctx)` — all explicitly set the value of `this`.
- Arrow functions **cannot** have their `this` overridden with `call`/`apply`/`bind`.
