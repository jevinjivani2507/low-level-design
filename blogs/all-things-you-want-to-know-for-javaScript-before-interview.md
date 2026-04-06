---
title: "All things you want to know for JavaScript before interview"
date: "2026-04-05"
tags: ["JavaScript", "Execution Context", "Closures", "Async JS"]
---

# JavaScript Execution Context — Interview Revision Guide

## What is Execution Context?

Everything in JavaScript runs inside an **Execution Context**.

### It has 2 phases:

| Phase                                      | Description                                |
| ------------------------------------------ | ------------------------------------------ |
| **Memory Creation Phase (Creation Phase)** | Variables & functions are allocated memory |
| **Execution Phase (Code Phase)**           | Code runs line by line                     |

---

## Execution Context Structure

```

Execution Context
│
├── Memory Component (Variable Environment)
│     → Stores variables & functions as key-value pairs
│
└── Code Component (Thread of Execution)
→ Executes code line by line

```

---

## JavaScript Nature

| Concept             | Meaning                             |
| ------------------- | ----------------------------------- |
| **Synchronous**     | Executes line by line in order      |
| **Single-threaded** | One task at a time (one call stack) |

---

## Call Stack — How JS Executes Code

- JS uses a **Call Stack** to manage execution contexts
- Functions are pushed → executed → popped

```js
function a() {
  b()
}
function b() {
  console.log("Hello")
}
a()
```

### Flow:

```
Global → a() → b() → pop → pop
```

---

## Hoisting (VERY IMPORTANT)

> Hoisting = Variables & functions are **moved to memory phase before execution**

### Behavior:

| Declaration | Hoisted? | Value                 |
| ----------- | -------- | --------------------- |
| `var`       | Yes      | `undefined`           |
| `let`       | Yes      | TDZ (uninitialized)   |
| `const`     | Yes      | TDZ (must initialize) |
| Function    | Yes      | Full function         |

---

## Lexical Environment

> **Lexical Environment = Local Memory + Reference to Parent**

- Defines scope chain
- Used to resolve variables

```js
function outer() {
  let x = 10
  function inner() {
    console.log(x) // resolves via lexical scope
  }
  inner()
}
```

---

## let & const — Temporal Dead Zone (TDZ)

### TDZ = Time between declaration & initialization

```js
console.log(a) // ReferenceError
let a = 10
```

### Key Points:

- `let` & `const` are **block scoped**
- Cannot access before initialization
- `const` must be initialized at declaration

---

## Types of Errors (Interview Favorite)

| Error              | Meaning               |
| ------------------ | --------------------- |
| **ReferenceError** | Variable not declared |
| **SyntaxError**    | Code is invalid       |
| **TypeError**      | Operation not allowed |

### Examples:

```js
console.log(x)
// ReferenceError: x is not defined
```

```js
console.log(a)
let a = 5
// Cannot access 'a' before initialization (TDZ)
```

```js
let a = 10
let a = 20
// SyntaxError: Identifier already declared
```

```js
const a
// SyntaxError: Missing initializer
```

```js
const a = 10
a = 20
// TypeError: Assignment to constant variable
```

---

## Block Scope & Shadowing

```js
let a = 10
{
  let a = 20 // shadows outer 'a'
  console.log(a) // 20
}
console.log(a) // 10
```

### Types of Shadowing:

| Type              | Description            |
| ----------------- | ---------------------- |
| Legal Shadowing   | `let` inside block     |
| Illegal Shadowing | `var` over `let/const` |

---

## Closures (MOST ASKED)

> A closure = Function + its lexical environment

### Definition:

A function that remembers variables from its outer scope **even after the outer function is executed**

---

### Example 1:

```js
function x() {
  var i = 1
  setTimeout(function () {
    console.log(i)
  }, 3000)
  console.log("Namaste Javascript")
}
x()
```

---

### Example 2 (Classic Interview Trap):

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000)
}
```

### Output:

```
6 6 6 6 6
```

Because **same `i` is shared (function scope)**

---

### Fix using Closure:

```js
for (var i = 1; i <= 5; i++) {
  function close(i) {
    setTimeout(() => console.log(i), i * 1000)
  }
  close(i)
}
```

---

### OR use `let`:

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000)
}
```

---

## Callback Functions & Event Listeners

- Functions passed as arguments
- Used in async operations

```js
button.addEventListener("click", () => {
  console.log("Clicked!")
})
```

---

## Garbage Collection & removeEventListener

- JS automatically removes unused memory
- But **event listeners can cause memory leaks**

```js
element.removeEventListener("click", handler)
```

Always clean up listeners (important in React too)

---

## Asynchronous JavaScript & Event Loop

### Core Components:

| Component       | Role                    |
| --------------- | ----------------------- |
| Call Stack      | Executes code           |
| Web APIs        | Handles async tasks     |
| Callback Queue  | Macrotasks              |
| Microtask Queue | Promises                |
| Event Loop      | Orchestrates everything |

---

## Microtask vs Macrotask Queue

| Queue                          | Contains                            | Priority |
| ------------------------------ | ----------------------------------- | -------- |
| **Microtask Queue**            | Promises, MutationObserver          | Higher   |
| **Callback Queue (Macrotask)** | setTimeout, setInterval, DOM events | Lower    |

---

### Important Rule:

> Microtasks always execute **before** macrotasks

---

### Starvation Problem

If microtasks keep adding more microtasks:

Macrotasks may never execute

---

## Event Loop — Interview Deep Understanding

### Key Points:

- Runs continuously (infinite loop)
- Checks:
  1. Is Call Stack empty?
  2. If yes → run Microtasks
  3. Then → run Macrotasks

---

## Interview Questions (Must Know)

### 1. When does Event Loop start?

- It is **always running** in the JS runtime

---

### 2. Are synchronous callbacks stored in Web APIs?

No

Only async callbacks (setTimeout, fetch, event listeners)

---

### 3. Does Web API store callback functions?

Yes

- It stores them and pushes reference to queues
- Event listeners stay until removed

---

### 4. setTimeout(fn, 0) — does it run immediately?

No

It runs **only after call stack is empty**

---

### Example:

```js
setTimeout(() => console.log("Timeout"), 0)
console.log("Hello")
```

### Output:

```
Hello
Timeout
```

---
