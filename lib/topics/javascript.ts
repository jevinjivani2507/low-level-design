import { FlashCardTopic } from "../topics-data"

export const javascriptInterviewNotes: FlashCardTopic = {
  slug: "javascript-interview-notes",
  title: "Namaste JavaScript — Interview Quick Notes",
  tags: ["JavaScript", "Closures", "Promises", "Async JS", "Event Loop"],
  cards: [
    {
      id: "js-1",
      title: "Ep 1–2: Execution Context & Call Stack",
      bullets: [
        "Everything in JS runs inside an Execution Context — a container with two components: Memory (variable environment) and Code (thread of execution).",
        "JS is synchronous and single-threaded — one command at a time, in order.",
        "Every EC is created in two phases: Memory Creation Phase (variables → undefined, functions → full body) then Code Execution Phase (runs line by line).",
        "A new local EC is created each time a function is invoked and destroyed on return.",
        "The Call Stack manages EC creation and deletion. Also called: Program Stack, Runtime Stack, Execution Context Stack.",
      ],
    },
    {
      id: "js-2",
      title: "Ep 3: Hoisting",
      bullets: [
        "Hoisting enables extracting values of variables and functions before initialising/assigning — due to the Memory Creation Phase of EC.",
        "var declarations are hoisted and initialised to undefined.",
        "Function declarations are hoisted with their entire body — callable before the line they appear.",
        "let/const are hoisted but stay in the Temporal Dead Zone — accessing them before initialisation throws ReferenceError.",
        "var fn = function() {} — fn is hoisted as undefined; calling fn() before this line → TypeError.",
      ],
      code: `getName() // "Namaste JS" ← works, function hoisted fully
console.log(x) // undefined ← var hoisted as undefined
var x = 7
function getName() {
  console.log("Namaste JS")
}

var fn = function () {} // fn is undefined before this line`,
      language: "js",
    },
    {
      id: "js-3",
      title: "Ep 4: Variable Environments",
      bullets: [
        "Each function invocation creates its own EC with its own memory space.",
        "Variables with the same name in different functions are completely independent — no shared state.",
      ],
    },
    {
      id: "js-4",
      title: "Ep 5: window & this at Global Level",
      bullets: [
        "The shortest JS program is an empty file — JS still creates a Global EC, a global object (window in browsers), and a this pointing to it.",
        "this === window at the global level.",
        "var variables declared globally are attached to window; let/const are not.",
      ],
    },
    {
      id: "js-5",
      title: "Ep 6: undefined vs not defined",
      bullets: [
        "undefined — memory was allocated but no value assigned yet. JS uses it as a placeholder.",
        "not defined — variable was never declared; accessing it throws ReferenceError.",
        "JS is loosely typed — a variable can hold any type at any time.",
        "Never manually assign undefined to a variable; let JS set it.",
      ],
    },
    {
      id: "js-6",
      title: "Ep 7: Scope Chain & Lexical Environment",
      bullets: [
        "Every EC has a reference to its lexical parent's environment — this chain is the Scope Chain.",
        "An inner function can access variables in all outer scopes; the global EC cannot access local variables.",
        "Lexical Environment = local memory + reference to parent's lexical environment.",
        "The search travels up the chain until null (global) is reached — this is lexical scoping.",
      ],
    },
    {
      id: "js-7",
      title: "Ep 8: let, const & Temporal Dead Zone",
      bullets: [
        "let and const are block-scoped and stored in a separate memory space (not on window).",
        "TDZ = the time between hoisting and the line where the variable is initialised. Accessing in TDZ → ReferenceError.",
        "let can be declared and assigned separately; const must be initialised at declaration.",
        "Re-declaring let in the same scope → SyntaxError. Reassigning const → TypeError.",
        "Best practice: prefer const > let > avoid var.",
      ],
    },
    {
      id: "js-8",
      title: "Ep 9: Block Scope & Shadowing",
      bullets: [
        "A block { } groups statements. let/const inside a block are scoped to that block; var leaks to the enclosing function/global scope.",
        "Shadowing: a same-named inner variable shadows the outer one within its scope.",
        "var shadowing another var modifies the same memory — the outer value is overwritten.",
        "let shadowing let (or var) creates a separate memory slot — the outer is unaffected.",
        "Illegal shadowing: shadowing a let with var in the same scope → SyntaxError.",
      ],
    },
    {
      id: "js-9",
      title: "Ep 10–12: Closures",
      bullets: [
        "A closure = a function bundled together with its lexical scope. The function remembers variables from its outer scope even after the outer function has returned.",
        "Closures enable: module pattern, currying, memoisation, data hiding/encapsulation, setTimeout callbacks.",
        "Downside: closed-over variables are not garbage-collected until the closure itself is released → potential memory leaks.",
        "Classic Q — var in loop: all closures share the same i reference → prints 6,6,6,6,6. Fix: use let (block-scoped) or wrap with IIFE to capture a new copy.",
      ],
      code: `function counter() {
  var count = 0
  return function increment() {
    count++
    console.log(count)
  }
}
const c1 = counter()
c1() // 1
c1() // 2

// var in loop — prints 6,6,6,6,6
for (var i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000)
}

// Fix: use let
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000)
}`,
      language: "js",
    },
    {
      id: "js-10",
      title: "Ep 13: First Class Functions",
      bullets: [
        "First-class functions: functions can be passed as arguments and returned from other functions.",
        "Function Statement: function a() {} — hoisted fully.",
        "Function Expression: var b = function() {} — hoisted as undefined.",
        "Named Function Expression: var b = function xyz() {} — xyz not in global scope.",
        "Anonymous Function: no name; used as a value; standalone → SyntaxError.",
        "Hoisting difference: calling a function statement before declaration works; calling a function expression before declaration → TypeError.",
      ],
    },
    {
      id: "js-11",
      title: "Ep 14: Callback Functions & Event Listeners",
      bullets: [
        "JS is single-threaded but callbacks give access to asynchronous behaviour.",
        "Never block the main thread — use async APIs (setTimeout, fetch) for time-intensive work.",
        "Event listeners form closures over their scope — they are heavy (memory not freed until explicitly removed).",
        "Remove event listeners when no longer needed to allow garbage collection.",
      ],
    },
    {
      id: "js-12",
      title: "Ep 15: Asynchronous JS & Event Loop",
      bullets: [
        "Web APIs (setTimeout, DOM, fetch, localStorage, console) live in the browser — not in the JS engine itself.",
        "Flow: callback registered in Web API env → on completion, pushed to Callback Queue → Event Loop moves it to Call Stack when stack is empty.",
        "Microtask Queue (Promise callbacks, MutationObserver) has higher priority than the Callback Queue — microtasks run first.",
        "All callbacks that come through promises go in Microtask Queue.",
        "Starvation: if microtasks keep spawning new microtasks, the Callback Queue never gets a turn.",
        "Call Stack ← Event Loop ← Microtask Queue (higher priority) / Callback Queue.",
      ],
    },
    {
      id: "js-13",
      title: "Ep 16: JS Engine & V8 Architecture",
      bullets: [
        "JS runs everywhere because of the JavaScript Runtime Environment (JRE) = JS Engine + Web APIs + Event Loop + Queues.",
        "ECMAScript sets the spec; each engine (V8, SpiderMonkey, Chakra) implements it.",
        "Three steps inside the engine: Parsing (code → tokens → AST) → Compilation (JIT: interpreter + compiler) → Execution (Memory Heap + Call Stack).",
        "V8 internals: Ignition (interpreter), TurboFan (optimising compiler), Orinoco (garbage collector, Mark & Sweep).",
      ],
    },
    {
      id: "js-14",
      title: "Ep 17: setTimeout Trust Issues",
      bullets: [
        "setTimeout(cb, 0) does not run immediately — cb still goes through the Callback Queue and waits for the Call Stack to be empty.",
        "Concurrency model: if the Call Stack is busy for 10s and the timer was 5s, the callback fires after 10s — not 5s.",
        "setTimeout guarantees at least the specified delay, never exactly.",
      ],
    },
    {
      id: "js-15",
      title: "Ep 18–19: Higher-Order Functions, map / filter / reduce",
      bullets: [
        "A Higher-Order Function takes a function as an argument or returns one.",
        "map — transforms each element, returns a new array of the same length.",
        "filter — returns a new array with elements where the callback returns true.",
        "reduce — accumulates all elements into a single output value.",
        "reduce can replicate map and filter — useful to know for interviews.",
      ],
      code: `const nums = [1, 2, 3, 4]
nums.map((x) => x * 2)          // [2, 4, 6, 8]
nums.filter((x) => x % 2 === 0) // [2, 4]
nums.reduce((acc, x) => acc + x, 0) // 10`,
      language: "js",
    },
    {
      id: "js-16",
      title: "Ep 20: Callback Problems",
      bullets: [
        "Callback Hell (Pyramid of Doom): deeply nested callbacks that make code hard to read and maintain.",
        "Inversion of Control: passing a callback means trusting the callee to invoke it correctly — it may run 0 times, twice, or never.",
      ],
      code: `// Callback hell
api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet()
    })
  })
})`,
      language: "js",
    },
    {
      id: "js-17",
      title: "Ep 21–22: Promises",
      bullets: [
        "A Promise is an object that is a placeholder for a future async value. States: pending → fulfilled or rejected.",
        "Promise result is immutable once settled — safe to pass around.",
        ".then attaches a success callback; .catch handles rejection; both return promises enabling chaining.",
        "Always return a value/promise inside .then to pass data down the chain.",
        ".catch placed mid-chain only catches errors from above it; code below it still runs.",
      ],
      code: `createOrder(cart)
  .then((orderId) => proceedToPayment(orderId))
  .then((info) => showOrderSummary(info))
  .catch((err) => console.error(err))`,
      language: "js",
    },
    {
      id: "js-18",
      title: "Ep 23: async / await",
      bullets: [
        "async before a function makes it always return a Promise (wraps plain values automatically).",
        "await pauses execution of the async function until the promise resolves — the Call Stack is not blocked.",
        "async/await is syntactic sugar over .then/.catch — same behaviour, better readability.",
        "Error handling: use try/catch inside async functions (or .catch on the returned promise).",
        "Promises start executing immediately when created — await only waits, it does not start them.",
      ],
      code: `async function fetchUser() {
  try {
    const res = await fetch("https://api.github.com/users/alok722")
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}`,
      language: "js",
    },
    {
      id: "js-19",
      title: "Ep 24: Promise APIs",
      bullets: [
        "Promise.all([p1,p2,p3]) — waits for all to fulfill; rejects immediately on first rejection (fail-fast). Use when all results needed and any failure is fatal.",
        "Promise.allSettled([p1,p2,p3]) — waits for all to settle; always returns array of {status, value/reason}. Use when you want every result regardless of failure.",
        "Promise.race([p1,p2,p3]) — settles with the first settled promise (fulfill or reject). Use for timeout patterns.",
        "Promise.any([p1,p2,p3]) — fulfills with the first success; rejects only if all reject (AggregateError). Use when you need at least one success.",
      ],
    },
    {
      id: "js-20",
      title: "Ep 25: this Keyword",
      bullets: [
        "Global scope → this is window (browser).",
        "Regular function (non-strict) → window (this substitution).",
        "Regular function (strict) → undefined.",
        "Object method → the object the method is called on.",
        "Arrow function → inherited from enclosing lexical scope (no own this).",
        "DOM event handler → the HTML element that fired the event.",
        "call(ctx, ...args), apply(ctx, [args]), bind(ctx) — all explicitly set the value of this.",
        "Arrow functions cannot have their this overridden with call/apply/bind.",
      ],
    },
  ],
}
