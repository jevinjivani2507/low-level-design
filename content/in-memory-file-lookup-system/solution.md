---
title: "In-Memory File Lookup System"
---

# Solution: In-Memory File Lookup System

This is a **classic LLD + Strategy Pattern question**. The interviewer checks:

- **Open/Closed Principle**
- **Extensible search logic**
- **Clean separation of responsibilities**

I'll show a **production-quality C++ design**.

---

# Design Idea

We separate the system into **three responsibilities**:

### 1. File storage

Stores files in memory.

```text
path -> size
```

### 2. Search Strategy

Each search criteria implements a **strategy interface**.

```text
SearchStrategy
   ↑
SizeSearchStrategy
ExtensionSearchStrategy
```

### 3. Search Engine

Handles:

- directory filtering
- applying strategy
- sorting results

---

# Why Strategy Pattern?

Without strategy:

```cpp
if(criteria == 1) ...
else if(criteria == 2) ...
```

Every new feature requires modifying the main logic ❌

With strategy:

```cpp
strategy->match(file)
```

Add new search criteria **without touching existing code** ✅

Example future extension:

```
NameContainsStrategy
CreatedAfterStrategy
OwnerStrategy
```

---

# Data Model

```cpp
struct File {
    string path;
    int sizeMb;
};
```

Storage:

```
unordered_map<string, int> files
```

Key = path
Value = size

---

# Strategy Interface

```cpp
class SearchStrategy {
public:
    virtual bool match(const string& path, int sizeMb, const string& args) = 0;
    virtual ~SearchStrategy() {}
};
```

---

# Strategy 1 — Size Search

Criteria: **size > minSize**

```cpp
class SizeSearchStrategy : public SearchStrategy {
public:
    bool match(const string& path, int sizeMb, const string& args) override {
        int minSize = stoi(args);
        return sizeMb > minSize;
    }
};
```

---

# Strategy 2 — Extension Search

Criteria: **file ends with extension**

```cpp
class ExtensionSearchStrategy : public SearchStrategy {
public:
    bool match(const string& path, int sizeMb, const string& args) override {
        string ext = args;

        if (path.size() < ext.size()) return false;

        return path.substr(path.size() - ext.size()) == ext;
    }
};
```

---

# Main FileSearch System

Key responsibilities:

- store files
- map searchCriteriaId → strategy
- filter directory
- apply strategy

---

# Full Optimal C++ Implementation

```cpp
#include <bits/stdc++.h>
using namespace std;

struct File {
    string path;
    int sizeMb;
};

class SearchStrategy {
public:
    virtual bool match(const string& path, int sizeMb, const string& args) = 0;
    virtual ~SearchStrategy() {}
};

class SizeSearchStrategy : public SearchStrategy {
public:
    bool match(const string& path, int sizeMb, const string& args) override {
        int minSize = stoi(args);
        return sizeMb > minSize;
    }
};

class ExtensionSearchStrategy : public SearchStrategy {
public:
    bool match(const string& path, int sizeMb, const string& args) override {
        if (path.size() < args.size()) return false;
        return path.substr(path.size() - args.size()) == args;
    }
};

class FileSearch {
private:
    unordered_map<string, int> files;
    unordered_map<int, SearchStrategy*> strategies;

    bool isUnderDirectory(const string& path, const string& dir) {
        if (path.size() < dir.size()) return false;
        if (path.substr(0, dir.size()) != dir) return false;

        if (path.size() == dir.size()) return true;
        return path[dir.size()] == '/';
    }

public:
    FileSearch() {
        strategies[1] = new SizeSearchStrategy();
        strategies[2] = new ExtensionSearchStrategy();
    }

    void putFile(string path, int sizeMb) {
        files[path] = sizeMb;
    }

    vector<string> search(int searchCriteriaId, string dirPath, string args) {

        vector<string> result;

        if (!strategies.count(searchCriteriaId)) return result;

        SearchStrategy* strategy = strategies[searchCriteriaId];

        for (auto& [path, size] : files) {

            if (!isUnderDirectory(path, dirPath)) continue;

            if (strategy->match(path, size, args))
                result.push_back(path);
        }

        sort(result.begin(), result.end());

        return result;
    }

    ~FileSearch() {
        for (auto& [id, strategy] : strategies)
            delete strategy;
    }
};
```

---

# Complexity

Let:

```
N = number of files (≤2000)
```

### putFile

```
O(1)
```

### search

```
O(N log N)
```

- scan all files
- sort results

Perfect for constraints.

---

# Why This Design Is Good (Interview Answer)

**Open/Closed Principle**

The system is **open for extension but closed for modification**.

To add new criteria:

```cpp
class NameContainsStrategy : public SearchStrategy
```

Then just register:

```cpp
strategies[3] = new NameContainsStrategy();
```

No other code changes required.

---

# Possible Follow-ups (Interviewers LOVE these)

### Add search by filename substring

```
search(3, "/data", "report")
```

### Add multiple criteria

```
size > 10 AND extension = ".xml"
```

### Optimize search

Use **directory index (Trie)** instead of scanning all files.

---

✅ If you'd like, I can also show the **Amazon/Google senior-level solution** using a **Trie-based filesystem index** that makes search **O(files_in_directory)** instead of **O(all_files)**.
