---
title: "Design Pizza Pricing System"
---

# Solution: Design Pizza Pricing System

This question is testing **Decorator Pattern + Rule extensibility**.
The key idea: **every topping decorates the base pizza** and modifies price/tax behavior.

I'll show a **clean interview-quality C++ design** that is extensible.

---

# 1️⃣ Design Overview

We separate concerns:

### Core abstraction

```text
Pizza
 ├── BasePizza
 └── ToppingDecorator
        ├── CheeseBurst
        ├── Onion
        ├── Corn
        ├── Capsicum
        ├── Pineapple
        └── Mushroom
```

Each topping **wraps the pizza and modifies behavior**.

---

# 2️⃣ Pizza Interface

```cpp
class Pizza {
public:
    virtual double getSubtotal() = 0;
    virtual double getTaxRate() = 0;
    virtual ~Pizza() {}
};
```

---

# 3️⃣ Base Pizza

```cpp
class BasePizza : public Pizza {
private:
    int basePrice;
    double taxRate;

public:
    BasePizza(int price, int tax) {
        basePrice = price;
        taxRate = tax;
    }

    double getSubtotal() override {
        return basePrice;
    }

    double getTaxRate() override {
        return taxRate;
    }

    void setTaxRate(double newRate) {
        taxRate = newRate;
    }
};
```

---

# 4️⃣ Decorator Base Class

```cpp
class ToppingDecorator : public Pizza {
protected:
    Pizza* pizza;

public:
    ToppingDecorator(Pizza* p) {
        pizza = p;
    }
};
```

---

# 5️⃣ Cheeseburst Decorator

Handles:

- **volume discount**
- **tax uplift**

```cpp
class CheeseBurst : public ToppingDecorator {

private:
    int servings;

public:
    CheeseBurst(Pizza* p, int s) : ToppingDecorator(p) {
        servings = s;
    }

    double getSubtotal() override {

        double cost = 100;

        if(servings > 1)
            cost += (servings - 1) * 70;

        return pizza->getSubtotal() + cost;
    }

    double getTaxRate() override {

        double rate = pizza->getTaxRate();

        return rate * 1.3; // +30%
    }
};
```

---

# 6️⃣ Simple Toppings

Example Onion:

```cpp
class Onion : public ToppingDecorator {

private:
    int servings;

public:
    Onion(Pizza* p, int s) : ToppingDecorator(p) {
        servings = s;
    }

    double getSubtotal() override {
        return pizza->getSubtotal() + servings * 30;
    }

    double getTaxRate() override {
        return pizza->getTaxRate();
    }
};
```

Example Mushroom:

```cpp
class Mushroom : public ToppingDecorator {

private:
    int servings;

public:
    Mushroom(Pizza* p, int s) : ToppingDecorator(p) {
        servings = s;
    }

    double getSubtotal() override {
        return pizza->getSubtotal() + servings * 40;
    }

    double getTaxRate() override {
        return pizza->getTaxRate();
    }
};
```

---

# 7️⃣ PizzaPricing Manager

This class enforces **business rules**.

```cpp
class PizzaPricing {

private:
    Pizza* pizza;

    bool hasCheeseBurst = false;
    bool hasMushroom = false;

public:

    PizzaPricing(int basePrice, int tax, string size) {
        pizza = new BasePizza(basePrice, tax);
    }

    bool addTopping(string topping, int servings) {

        if(topping == "cheeseburst") {

            if(hasMushroom) return false;

            pizza = new CheeseBurst(pizza, servings);

            hasCheeseBurst = true;

            return true;
        }

        if(topping == "mushroom") {

            if(hasCheeseBurst) return false;

            pizza = new Mushroom(pizza, servings);

            hasMushroom = true;

            return true;
        }

        if(topping == "onion") {
            pizza = new Onion(pizza, servings);
            return true;
        }

        if(topping == "corn") {
            pizza = new Onion(pizza, servings); // similar structure
            return true;
        }

        if(topping == "capsicum") {
            pizza = new Onion(pizza, servings);
            return true;
        }

        if(topping == "pineapple") {
            pizza = new Onion(pizza, servings);
            return true;
        }

        return false;
    }

    int getFinalPrice() {

        double subtotal = pizza->getSubtotal();

        double taxRate = pizza->getTaxRate();

        double tax = subtotal * taxRate / 100.0;

        double finalPrice = subtotal + tax;

        return (int)(finalPrice + 0.5);
    }
};
```

---

# 8️⃣ Example Execution

```cpp
PizzaPricing p(200, 10, "small");

p.addTopping("cheeseburst",1);
p.addTopping("onion",2);

cout << p.getFinalPrice();
```

Result:

```
407
```

---

# 9️⃣ Why This Design Is Good (Interview Answer)

**Decorator Pattern**

- dynamically adds toppings
- avoids subclass explosion like:

```
PizzaWithOnion
PizzaWithCheese
PizzaWithCheeseAndOnion
PizzaWithCheeseAndOnionAndCorn
```

Decorator avoids exponential combinations.

---

# 🔟 Easy to Extend

Add new rule:

Example **Combo topping**

```cpp
class ComboDecorator : public ToppingDecorator
```

No changes required to existing pizza classes.

---

# 1️⃣1️⃣ Time Complexity

Operations:

| Operation     | Complexity            |
| ------------- | --------------------- |
| addTopping    | O(1)                  |
| getFinalPrice | O(number_of_toppings) |

---

# 1️⃣2️⃣ Possible Interview Follow-ups

Common follow-ups:

### 1️⃣ Size multiplier

```
small 1x
medium 1.2x
large 1.5x
```

### 2️⃣ Promo rules

```
buy 2 onion get 1 free
```

### 3️⃣ Max topping cap

```
max 10 toppings
```

---
