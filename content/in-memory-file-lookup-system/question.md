---
title: "In-Memory File Lookup System"
difficulty: "Medium"
tags: ["OOP", "Design Patterns"]
---

# In-Memory File Lookup System (Unix `find`-like)

Build an **in-memory file lookup tool** similar to the Unix `find` command.

The system should support **two initial search criteria** and be **easily extensible** so new search criteria can be added later.

Use the **Strategy Design Pattern** to implement the search criteria.

---

## Functional Requirements

Supported Search Criteria

- Search by Minimum File Size

  Return **all files strictly larger than a given size (in MB)** under a specified directory **recursively**.

- Search by File Extension

  Return **all files with a given file extension** under a specified directory **recursively**.
  Example: `.xml`, `.jpg`

---

## API Design

Use **Java-style naming conventions**.

```java
void putFile(String path, int sizeMb)
```

### Behavior

- Adds a new file entry.
- If the file already exists → **overwrite the size**.
- `path` will always be a **valid absolute file path**.
- `sizeMb >= 0`

---

```java
List<String> search(int searchCriteriaId, String dirPath, String args)
```

### Behavior

Find files matching a **Search Criteria**.

### Requirements

- Search must include **all nested subdirectories recursively**
- Return **file paths sorted in ascending lexicographical order**
- **No duplicate paths**

---

## Search Criteria Arguments

| Criteria          | searchCriteriaId | args format   | Example  |
| ----------------- | ---------------- | ------------- | -------- |
| Minimum File Size | `1`              | `"minSizeMb"` | `"5"`    |
| File Extension    | `2`              | `".ext"`      | `".xml"` |

Examples:

```
search(1, "/data", "8")
```

```
search(2, "/work", ".xml")
```

---

## Design Requirement

Use the **Strategy Design Pattern** for implementing search criteria.

This ensures the system can **easily support new search criteria in the future**, such as:

- Filename substring match
- Created date
- Modified date
- File size range
- Regex match

---

## Example 1

```java
FileSearch s = new FileSearch();

s.putFile("/data/pics/photoA.jpg", 4);
s.putFile("/data/pics/movie.mp4", 12);
s.putFile("/work/docs/readme.md", 1);
s.putFile("/work/docs/report.xml", 7);
```

Update file size:

```java
s.putFile("/data/pics/photoA.jpg", 9);
```

#### Search Criteria 1

Files **> 8 MB** inside `/data`

```java
s.search(1, "/data", "8");
```

Result:

```
[
"/data/pics/photoA.jpg",
"/data/pics/movie.mp4"
]
```

---

#### Search Criteria 2

Files with `.xml` inside `/work`

```java
s.search(2, "/work", ".xml");
```

Result:

```
[
"/work/docs/report.xml"
]
```

---

## Example 2

```java
FileSearch s = new FileSearch();

s.putFile("/media/images/aa.jpg", 6);
s.putFile("/media/images/ab.jpg", 7);
s.putFile("/media/images/ac.xml", 2);

s.putFile("/office/reports/r1.xml", 9);
s.putFile("/office/reports/r2.xml", 4);
s.putFile("/office/notes.txt", 3);
```

### Search Criteria 1

Files **> 5 MB** under `/media/images`

```java
s.search(1, "/media/images", "5");
```

Result:

```
[
"/media/images/aa.jpg",
"/media/images/ab.jpg"
]
```

---

### Search Criteria 2

Files with `.xml` under `/office` (recursive)

```java
s.search(2, "/office", ".xml");
```

Result:

```
[
"/office/reports/r1.xml",
"/office/reports/r2.xml"
]
```

---

## Constraints

- At most **1000 total calls** to `putFile` and `search`
- Maximum **2000 files stored**
- All paths are **absolute** (start with `/`)
- Directory separator is `/`
- `sizeMb` range: **0 → 10000**
- `search` must traverse **all nested directories recursively**
- Return results in **strict lexicographical order**
