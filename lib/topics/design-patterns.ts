import { FlashCardTopic } from "../topics-data"

export const designPatterns: FlashCardTopic = {
  slug: "design-patterns",
  title: "Design Patterns — Fast Recall (Python)",
  tags: ["Design Patterns", "GoF", "OOP", "LLD", "Python", "Interviews"],
  cards: [
    {
      id: "cheat-sheet",
      title: "The 3 categories (map first, then recall)",
      bullets: [
        "A design pattern is a **named, reusable solution** to a recurring design problem — a shared vocabulary, not copy-paste code.",
        "**Creational** — *how objects get made*: Singleton, Factory, Builder.",
        "**Structural** — *how objects are composed*: Adapter, Facade, Decorator, Proxy.",
        "**Behavioral** — *how objects talk & share responsibility*: Strategy, Observer, Command, State, Template Method.",
        "One-line intents: **Singleton** = one instance · **Factory** = pick class at runtime · **Builder** = step-by-step build · **Adapter** = translate interface · **Facade** = simple front for complex · **Decorator** = wrap to add behavior · **Proxy** = stand-in that controls access · **Strategy** = swap algorithm · **Observer** = notify subscribers · **Command** = request as object · **State** = behavior follows state · **Template** = fixed skeleton, variable steps.",
        "Golden rule: **reach for a pattern to remove a real pain** (rigidity, duplication, tight coupling) — never to look clever. In Python, a function or a `dict` often beats a class-heavy pattern.",
      ],
    },
    {
      id: "singleton",
      title: "Singleton — exactly one instance",
      bullets: [
        "**What:** guarantee a class has **one instance** with a global access point.",
        "**Why / when:** a single shared resource — **config, logger, DB connection pool, cache**. Creating many would waste resources or cause inconsistent state.",
        "**Python truth:** a **module is already a singleton** (imported once, cached) — often the cleanest answer in interviews.",
        "**Gotcha:** it's global state → **hard to test, hidden coupling, thread-safety** needs a lock. Mention these to sound senior.",
      ],
      code: `class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.settings = {}   # init once
        return cls._instance

a, b = Config(), Config()
assert a is b           # same object
a.settings["env"] = "prod"
print(b.settings)       # {'env': 'prod'}`,
      language: "python",
    },
    {
      id: "factory",
      title: "Factory — decide the class at runtime",
      bullets: [
        "**What:** move object creation behind a function/method so callers **don't hardcode concrete classes**.",
        "**Why / when:** the concrete type depends on **input, config, or environment** (e.g. `parser_for('json')`), and you want to add new types without touching callers.",
        "**Key benefit:** creation logic lives in **one place** — new type = one new branch/registry entry.",
        "**Python truth:** skip the class hierarchy — a **`dict` registry** of `{key: cls}` is the idiomatic factory.",
      ],
      code: `class Dog:  speak = lambda self: "woof"
class Cat:  speak = lambda self: "meow"

REGISTRY = {"dog": Dog, "cat": Cat}   # the "factory"

def make_animal(kind):
    return REGISTRY[kind]()           # caller never names the class

print(make_animal("cat").speak())     # meow`,
      language: "python",
    },
    {
      id: "builder",
      title: "Builder — assemble a complex object step by step",
      bullets: [
        "**What:** construct an object **piece by piece**, then `build()` the final result.",
        "**Why / when:** many **optional fields** or a required order of steps → avoids the **telescoping constructor** (`__init__` with 10 args).",
        "**Signature move:** each setter **returns `self`** so calls **chain** fluently.",
        "**Python truth:** for pure data, **keyword args / `@dataclass`** usually replace Builder. Use it when construction has real logic or validation.",
      ],
      code: `class Burger:
    def __init__(self): self.parts = []

class BurgerBuilder:
    def __init__(self): self.b = Burger()
    def add(self, x):
        self.b.parts.append(x); return self   # chainable
    def build(self): return self.b

burger = BurgerBuilder().add("patty").add("cheese").build()
print(burger.parts)   # ['patty', 'cheese']`,
      language: "python",
    },
    {
      id: "adapter",
      title: "Adapter — make an incompatible interface fit",
      bullets: [
        "**What:** a **wrapper** that translates one object's interface into the one your code expects.",
        "**Why / when:** integrating a **third-party / legacy** class whose method names don't match your interface — and you can't change it.",
        "**Analogy:** a **travel power plug** — same electricity, different socket shape.",
        "**vs Facade:** Adapter **converts** one interface to another; Facade **simplifies** a whole subsystem.",
      ],
      code: `class ThirdPartyLogger:              # can't modify this
    def write_log(self, text): print("LOG:", text)

class LoggerAdapter:                  # exposes our interface
    def __init__(self, ext): self.ext = ext
    def log(self, msg):               # what our app calls
        self.ext.write_log(msg)       # translate the call

log = LoggerAdapter(ThirdPartyLogger())
log.log("hi")   # LOG: hi`,
      language: "python",
    },
    {
      id: "facade",
      title: "Facade — one simple door to a complex system",
      bullets: [
        "**What:** a single class offering a **high-level API** that hides a messy multi-part subsystem.",
        "**Why / when:** callers shouldn't need to know the **order/details** of many internal calls (e.g. `order.checkout()` hiding inventory + payment + shipping).",
        "**Benefit:** **decouples** clients from internals — you can refactor behind the facade freely.",
        "**Remember:** it **simplifies**, it doesn't restrict — the subsystem is still usable directly if needed.",
      ],
      code: `class CPU:    def start(self): print("cpu on")
class Disk:   def load(self): print("os loaded")

class Computer:                 # the facade
    def __init__(self):
        self.cpu, self.disk = CPU(), Disk()
    def boot(self):             # one call hides the steps
        self.cpu.start(); self.disk.load()

Computer().boot()`,
      language: "python",
    },
    {
      id: "decorator",
      title: "Decorator — add behavior by wrapping",
      bullets: [
        "**What:** wrap an object/function to **add responsibilities** without changing it or subclassing.",
        "**Why / when:** stack optional features — **logging, caching, auth, retry** — that you can mix and match at runtime.",
        "**Python truth:** this is **built into the language** as `@decorator` syntax — the most-used pattern you already use daily.",
        "**Don't confuse:** GoF Decorator = *wrap an object with same interface*; Python `@` = *wrap a function*. Same idea, both are 'transparent wrapping'.",
      ],
      code: `def timed(fn):                     # decorator adds timing
    def wrapper(*a, **k):
        print("start"); r = fn(*a, **k); print("end")
        return r
    return wrapper

@timed
def work(): print("working")

work()   # start / working / end`,
      language: "python",
    },
    {
      id: "proxy",
      title: "Proxy — a stand-in that controls access",
      bullets: [
        "**What:** a placeholder with the **same interface** as the real object, sitting in front of it.",
        "**Why / when:** you need to add a gate before the real work — **lazy loading, access control, caching, rate-limiting, remote calls**.",
        "**Flavors:** *virtual* (create on first use), *protection* (check permissions), *caching*, *remote*.",
        "**vs Decorator:** Decorator **adds features**; Proxy **controls/guards access** (often creates the real object itself).",
      ],
      code: `class RealImage:
    def __init__(self, f): print("loading", f); self.f = f
    def show(self): print("show", self.f)

class LazyImage:                  # proxy: defer the heavy load
    def __init__(self, f): self.f, self.real = f, None
    def show(self):
        if self.real is None:     # create only when needed
            self.real = RealImage(self.f)
        self.real.show()

img = LazyImage("cat.png")        # nothing loaded yet
img.show()                        # loads, then shows`,
      language: "python",
    },
    {
      id: "strategy",
      title: "Strategy — swap the algorithm at runtime",
      bullets: [
        "**What:** define a family of **interchangeable algorithms** and pick one on the fly.",
        "**Why / when:** the same task has **multiple approaches** — payment methods, sort orders, discount rules — chosen by config/user.",
        "**Kills:** the giant **`if/elif` on a 'type'** flag; add a new strategy without editing existing code (Open/Closed).",
        "**Python truth:** a strategy is just a **function** — pass it as an argument, no interface class needed.",
      ],
      code: `def pay_card(amt):  print("card", amt)
def pay_upi(amt):   print("upi", amt)

def checkout(amt, strategy):     # inject the algorithm
    strategy(amt)

checkout(100, pay_card)          # card 100
checkout(50,  pay_upi)           # upi 50`,
      language: "python",
    },
    {
      id: "observer",
      title: "Observer — notify subscribers on change",
      bullets: [
        "**What:** a **subject** keeps a list of **observers** and pushes updates to all of them when its state changes (**pub/sub**).",
        "**Why / when:** **one-to-many** reactions — UI re-render on data change, event systems, notifications, cache invalidation.",
        "**Benefit:** subject and observers are **loosely coupled** — subject doesn't know who's listening.",
        "**Gotcha:** **unsubscribe** or you leak memory / update dead objects; beware update storms (cascading notifications).",
      ],
      code: `class Subject:
    def __init__(self): self.subs = []
    def subscribe(self, fn): self.subs.append(fn)
    def emit(self, data):
        for fn in self.subs: fn(data)   # notify all

s = Subject()
s.subscribe(lambda d: print("A got", d))
s.subscribe(lambda d: print("B got", d))
s.emit("event!")   # A got event! / B got event!`,
      language: "python",
    },
    {
      id: "command",
      title: "Command — package a request as an object",
      bullets: [
        "**What:** wrap an action (+ its args) into an object with `execute()` — and often `undo()`.",
        "**Why / when:** you need to **queue, log, schedule, or undo/redo** operations — editors, transactions, task queues, macros.",
        "**Benefit:** decouples the **invoker** (button, queue) from the **receiver** (who does the work).",
        "**Recall hook:** turning a **verb into a noun** so you can store it in a list.",
      ],
      code: `class AddText:
    def __init__(self, doc, s): self.doc, self.s = doc, s
    def execute(self): self.doc.append(self.s)
    def undo(self):    self.doc.pop()

doc, history = [], []
cmd = AddText(doc, "hi"); cmd.execute(); history.append(cmd)
print(doc)              # ['hi']
history.pop().undo()    # undo last
print(doc)              # []`,
      language: "python",
    },
    {
      id: "state",
      title: "State — behavior changes with internal state",
      bullets: [
        "**What:** an object **delegates behavior to a state object**; changing state changes behavior — a clean **state machine**.",
        "**Why / when:** an entity moves through **statuses** with different rules — order (placed→shipped→delivered), TCP connection, media player.",
        "**Kills:** sprawling **`if status == ...`** checks scattered everywhere; each state owns its own transitions.",
        "**vs Strategy:** structurally similar, but State **transitions itself** between states; Strategy is chosen from outside.",
      ],
      code: `class Draft:
    def publish(self, post): post.state = Published()
class Published:
    def publish(self, post): print("already live")

class Post:
    def __init__(self): self.state = Draft()
    def publish(self): self.state.publish(self)

p = Post(); p.publish()   # Draft -> Published
p.publish()               # already live`,
      language: "python",
    },
    {
      id: "template-method",
      title: "Template Method — fixed skeleton, variable steps",
      bullets: [
        "**What:** a base class defines the **algorithm's outline**; subclasses **fill in specific steps** (hooks).",
        "**Why / when:** several flows share the **same sequence** but differ in a step or two — data pipelines (load→process→save), report generators.",
        "**Benefit:** the **invariant order lives in one place**; you can't accidentally reorder steps.",
        "**vs Strategy:** Template uses **inheritance** (override steps); Strategy uses **composition** (swap the whole algorithm).",
      ],
      code: `class Report:
    def generate(self):          # the fixed skeleton
        self.load(); self.render(); print("done")
    def load(self):   raise NotImplementedError
    def render(self): raise NotImplementedError

class CSVReport(Report):
    def load(self):   print("read csv")
    def render(self): print("render table")

CSVReport().generate()   # read csv / render table / done`,
      language: "python",
    },
  ],
}
