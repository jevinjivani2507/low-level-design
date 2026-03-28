---
title: "Design Pizza Pricing System"
difficulty: "Medium"
tags: ["LLD", "OOP", "Design Patterns", "Decorator Pattern"]
---

# Design Pizza Pricing System

Implement the **Low Level Design (LLD)** of a pizza pricing system.

The system should support:

- Initializing a new pizza
- Adding toppings to it
- Calculating the final price of the pizza

Your implementation should be **extensible** so that **new pricing rules can be added later** (for example: combos, promos, size-based discounts).

Use the **Decorator Design Pattern**.

---

## Toppings Catalog

Each topping has a **per-serving cost**.

| Topping     | Cost per serving |
| ----------- | ---------------- |
| cheeseburst | 100              |
| corn        | 50               |
| onion       | 30               |
| capsicum    | 50               |
| pineapple   | 60               |
| mushroom    | 40               |

---

## Business Rules

### Cheeseburst Tax Uplift

Cheeseburst is considered **unhealthy food** and attracts more tax.

If **at least one serving of cheeseburst** is present:

- Increase the pizza’s **entire tax rate by +30% of its current value**
- This uplift happens **only once**

Example:

```
base tax = 10
uplift = 0.30 × 10 = 3
new tax = 13
```

Additional cheeseburst servings **do not increase tax further**.

---

### Cheeseburst Volume Discount

Cheeseburst pricing rule:

- First serving → **100**
- Each additional serving → **70**

Example:

```
3 servings → 100 + 70 + 70 = 240
```

---

### Health Constraint (Mutual Exclusion)

`mushroom` is considered **healthy food**.

It **cannot be combined with cheeseburst**.

Rules:

- If **cheeseburst already exists**, mushroom **cannot be added**
- If **mushroom already exists**, cheeseburst **cannot be added**

If violated:

```
addTopping() returns false
No state change occurs
```

---

## Constructor

```java
PizzaPricing(int basePrice, int taxPercentage, String size)
```

### Constraints

```
100 ≤ basePrice ≤ 10000
basePrice is always a multiple of 100
```

```
0 ≤ taxPercentage ≤ 1000
```

Example interpretation:

```
taxPercentage = 1000
means tax = 1000% = 10 × base price
```

Example:

```
basePrice = 200
taxPercentage = 1000

tax = 1000/100 × 200 = 2000

final price = 200 + 2000 = 2200
```

Another example:

```
basePrice = 200
taxPercentage = 18

tax = 18/100 × 200 = 36

final price = 236
```

---

### Size

```
size ∈ { small, medium, large }
```

All constructor inputs are guaranteed to be **valid**.

---

## Methods

### Add Topping

```java
boolean addTopping(String topping, int servingsCount)
```

- `servingsCount` is a **valid positive integer**
- Returns **true** if topping is successfully applied
- Returns **false** if any rule fails
- On failure → **no state change**

---

### Get Final Price

```java
int getFinalPrice()
```

- Returns **final price**
- Uses **Round Half Up** rounding rule
- Can be called **any time**

---

## Pricing and Tax Model

### Step 1 — Subtotal

```
Subtotal = basePrice + Σ(topping costs applied)
```

---

### Step 2 — Taxable Base

```
Taxable Base = Subtotal
```

---

### Step 3 — Tax Rate

Tax rate starts with the **constructor supplied taxPercentage**.

Rules may modify the tax rate (example: **cheeseburst uplift**).

---

### Step 4 — Tax Amount

```
Tax Amount = (Tax Rate / 100) × Subtotal
```

---

### Step 5 — Final Price

```
Final Price (pre-round) = Subtotal + Tax Amount
```

---

## Rounding Rule

To convert the final price to integer:

```
(int)(x + 0.5)
```

Examples:

```
4.6  → 5
4.51 → 5
4.49 → 4
4.5  → 5
```

---

# Worked Examples

## Example A — Cheeseburst uplift + toppings

```java
PizzaPricing p = new PizzaPricing(200, 10, "small");

p.addTopping("cheeseburst", 1);   // true
p.addTopping("onion", 2);         // true

int price = p.getFinalPrice();    // 407
```

### Calculation

```
base = 200

toppings
cheeseburst = 100
onion = 2 × 30 = 60

toppings total = 160

subtotal = 200 + 160 = 360
```

Cheeseburst tax uplift:

```
tax = 10 → 13
```

```
tax amount = 13% of 360 = 46.8
final price = 360 + 46.8 = 406.8
rounded = 407
```

---

## Example B — Mutual exclusion rule

```java
PizzaPricing q = new PizzaPricing(350, 8, "medium");

q.addTopping("mushroom", 2);      // true
q.addTopping("cheeseburst", 1);   // false

int price = q.getFinalPrice();    // 464
```

### Calculation

```
base = 350

toppings
mushroom = 2 × 40 = 80

subtotal = 350 + 80 = 430
```

```
tax = 8% of 430 = 34.4
final price = 430 + 34.4 = 464.4
rounded = 464
```
