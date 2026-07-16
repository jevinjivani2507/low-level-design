import { DsaTopic } from "../dsa-data"

export const linkedList: DsaTopic = {
  topic: "Linked List",
  questions: [
    {
      id: "reverse-linked-list",
      title: "Reverse Linked List",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given the head of a singly linked list, reverse the list and return the new head.",
      testCases: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
        },
        {
          input: "head = [1,2]",
          output: "[2,1]",
        },
      ],
      code: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;

        while (head) { // O(N)
            ListNode* next = head->next; // save before rewiring
            head->next = prev;           // reverse the pointer
            prev = head;
            head = next;
        }

        return prev;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Walk the list flipping each \`next\` pointer to the previous node.
- Save \`next\` before rewiring or you lose the rest of the list.
- \`prev\` ends up at the old tail, which is the new head.`,
    },
    {
      id: "linked-list-cycle",
      title: "Linked List Cycle",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given the head of a linked list, return true if the list contains a cycle (a node reachable again by following next pointers), otherwise false.",
      testCases: [
        {
          input: "head = [3,2,0,-4], pos = 1",
          output: "true",
          explanation: "The tail connects back to the node at index 1.",
        },
        {
          input: "head = [1], pos = -1",
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast && fast->next) { // O(N)
            slow = slow->next;       // 1 step
            fast = fast->next->next; // 2 steps
            if (slow == fast) return true; // they meet inside a cycle
        }

        return false;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Floyd's tortoise and hare: a fast pointer laps a slow one iff a cycle exists.
- If \`fast\` reaches null, the list ends → no cycle.
- O(1) space vs the hash-set approach that stores visited nodes.`,
    },
    {
      id: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Merge two sorted linked lists into one sorted list by splicing their nodes together, and return the head of the merged list.",
      testCases: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]",
        },
        {
          input: "list1 = [], list2 = [0]",
          output: "[0]",
        },
      ],
      code: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
        ListNode dummy;          // dummy head simplifies edge cases
        ListNode* tail = &dummy;

        while (a && b) { // O(N + M)
            if (a->val <= b->val) { tail->next = a; a = a->next; }
            else { tail->next = b; b = b->next; }
            tail = tail->next;
        }

        tail->next = a ? a : b; // attach the remaining list
        return dummy.next;
    }
};`,
      timeComplexity: "O(N + M)",
      spaceComplexity: "O(1)",
      notes: `- Dummy head lets you append without special-casing the first node.
- Splice the smaller front node each step; advance that list's pointer.
- One list empties first — attach the untouched remainder in O(1).`,
    },
    {
      id: "merge-k-sorted-lists",
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array of k sorted linked lists, merge them into one sorted linked list and return its head.",
      testCases: [
        {
          input: "lists = [[1,4,5],[1,3,4],[2,6]]",
          output: "[1,1,2,3,4,4,5,6]",
        },
        {
          input: "lists = []",
          output: "[]",
        },
      ],
      code: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);

        for (auto l : lists) if (l) pq.push(l); // O(k log k)

        ListNode dummy;
        ListNode* tail = &dummy;
        while (!pq.empty()) { // O(N log k)
            ListNode* node = pq.top(); pq.pop(); // O(log k)
            tail->next = node;
            tail = node;
            if (node->next) pq.push(node->next); // O(log k)
        }

        return dummy.next;
    }
};`,
      timeComplexity: "O(N log k)",
      spaceComplexity: "O(k)",
      notes: `- Min-heap of the current head of each list; pop the global minimum each step.
- After popping a node, push its \`next\` so the heap always holds ≤ k nodes.
- N total nodes × O(log k) per heap op → O(N log k), better than merging pairwise naively.`,
    },
    {
      id: "remove-nth-node-from-end-of-list",
      title: "Remove Nth Node From End of List",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given the head of a linked list, remove the nth node from the end and return the head. Do it in one pass.",
      testCases: [
        {
          input: "head = [1,2,3,4,5], n = 2",
          output: "[1,2,3,5]",
        },
        {
          input: "head = [1], n = 1",
          output: "[]",
        },
      ],
      code: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy;
        dummy.next = head;
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;

        for (int i = 0; i < n; i++) fast = fast->next; // O(n) head start

        while (fast->next) { // O(N)
            fast = fast->next;
            slow = slow->next;
        }

        slow->next = slow->next->next; // unlink the target
        return dummy.next;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Advance \`fast\` n nodes ahead, then move both until fast hits the end.
- \`slow\` lands just before the target node, so \`slow->next\` is removed.
- Dummy head handles removing the actual head cleanly.`,
    },
    {
      id: "reorder-list",
      title: "Reorder List",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given the head of a list L0 → L1 → … → Ln-1 → Ln, reorder it to L0 → Ln → L1 → Ln-1 → … in place, changing only node links.",
      testCases: [
        {
          input: "head = [1,2,3,4]",
          output: "[1,4,2,3]",
        },
        {
          input: "head = [1,2,3,4,5]",
          output: "[1,5,2,4,3]",
        },
      ],
      code: `class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;

        // 1. find middle (slow ends at first half's tail)
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast->next && fast->next->next) { // O(N)
            slow = slow->next;
            fast = fast->next->next;
        }

        // 2. reverse the second half
        ListNode* second = slow->next;
        slow->next = nullptr;
        ListNode* prev = nullptr;
        while (second) { // O(N)
            ListNode* next = second->next;
            second->next = prev;
            prev = second;
            second = next;
        }

        // 3. weave the two halves together
        ListNode* first = head;
        while (prev) { // O(N)
            ListNode* n1 = first->next;
            ListNode* n2 = prev->next;
            first->next = prev;
            prev->next = n1;
            first = n1;
            prev = n2;
        }
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Three steps: find the middle, reverse the second half, then interleave.
- Split with slow/fast pointers; cut the first half by nulling slow->next.
- Weaving alternates one node from each half until the reversed half is consumed.`,
    },
    {
      id: "copy-list-with-random-pointer",
      title: "Copy List with Random Pointer",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/copy-list-with-random-pointer/",
      tags: ["neetcode-150"],
      question:
        "A linked list where each node has a next and a random pointer (to any node or null). Return a deep copy of the list.",
      testCases: [
        {
          input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
          output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
        },
        { input: "head = []", output: "[]" },
      ],
      code: `class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        unordered_map<Node*, Node*> map; // original -> clone

        for (Node* cur = head; cur; cur = cur->next) // O(N) create clones
            map[cur] = new Node(cur->val);

        for (Node* cur = head; cur; cur = cur->next) { // O(N) wire pointers
            map[cur]->next = map[cur->next];     // map[nullptr] == nullptr
            map[cur]->random = map[cur->random];
        }

        return map[head];
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- First pass clones every node into a map; second pass links next/random via the map.
- \`map[nullptr]\` default-constructs to nullptr, so null pointers copy correctly.
- An O(1)-space variant interleaves clones between originals instead of a map.`,
    },
    {
      id: "add-two-numbers",
      title: "Add Two Numbers",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
      tags: ["neetcode-150"],
      question:
        "Two non-empty linked lists represent non-negative integers with digits in reverse order. Add them and return the sum as a linked list.",
      testCases: [
        {
          input: "l1 = [2,4,3], l2 = [5,6,4]",
          output: "[7,0,8]",
          explanation: "342 + 465 = 807.",
        },
        {
          input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
          output: "[8,9,9,9,0,0,0,1]",
        },
      ],
      code: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy;
        ListNode* tail = &dummy;
        int carry = 0;

        while (l1 || l2 || carry) { // O(max(N, M))
            int sum = carry;
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }
            carry = sum / 10;
            tail->next = new ListNode(sum % 10);
            tail = tail->next;
        }

        return dummy.next;
    }
};`,
      timeComplexity: "O(max(N, M))",
      spaceComplexity: "O(max(N, M))",
      notes: `- Digits are already reversed, so add from the heads with a running carry.
- Loop while either list has digits or a carry remains.
- A dummy head simplifies building the result list.`,
    },
    {
      id: "find-the-duplicate-number",
      title: "Find the Duplicate Number",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
      tags: ["neetcode-150"],
      question:
        "Given an array nums of n+1 integers where each is in [1, n], exactly one value is repeated. Find it without modifying the array and in O(1) space.",
      testCases: [
        { input: "nums = [1,3,4,2,2]", output: "2" },
        { input: "nums = [3,1,3,4,2]", output: "3" },
      ],
      code: `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0, fast = 0;
        do { // phase 1: find a meeting point inside the cycle
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = 0;
        while (slow != fast) { // phase 2: find the cycle entrance
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Treat values as next-pointers: the duplicate creates a cycle whose entrance is the answer.
- Floyd's algorithm: find a meeting point, then walk one pointer from the start.
- Doesn't modify the array and uses only two indices.`,
    },
    {
      id: "lru-cache",
      title: "LRU Cache",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
      tags: ["neetcode-150"],
      question:
        "Design an LRU cache with get and put in O(1). When capacity is exceeded, evict the least recently used key.",
      testCases: [
        {
          input:
            "cap=2: put(1,1), put(2,2), get(1)→1, put(3,3) evicts 2, get(2)→-1",
          output: "1, then -1",
        },
      ],
      code: `class LRUCache {
    int cap;
    list<pair<int, int>> dll;                              // front = most recent
    unordered_map<int, list<pair<int, int>>::iterator> mp; // key -> node

public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) { // O(1)
        if (!mp.count(key)) return -1;
        dll.splice(dll.begin(), dll, mp[key]); // move to front
        return mp[key]->second;
    }

    void put(int key, int value) { // O(1)
        if (mp.count(key)) {
            mp[key]->second = value;
            dll.splice(dll.begin(), dll, mp[key]);
            return;
        }
        if ((int)dll.size() == cap) {  // evict least recently used
            mp.erase(dll.back().first);
            dll.pop_back();
        }
        dll.push_front({key, value});
        mp[key] = dll.begin();
    }
};`,
      timeComplexity: "O(1) per op",
      spaceComplexity: "O(capacity)",
      notes: `- Doubly linked list orders by recency; hash map gives O(1) node lookup.
- \`splice\` moves an accessed node to the front without reallocating.
- Evict from the back (least recent) when at capacity.`,
    },
    {
      id: "reverse-nodes-in-k-group",
      title: "Reverse Nodes in k-Group",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      tags: ["neetcode-150"],
      question:
        "Given a linked list, reverse the nodes k at a time and return the modified list. Nodes in a final group of fewer than k stay as is.",
      testCases: [
        {
          input: "head = [1,2,3,4,5], k = 2",
          output: "[2,1,4,3,5]",
        },
        {
          input: "head = [1,2,3,4,5], k = 3",
          output: "[3,2,1,4,5]",
        },
      ],
      code: `class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* node = head;
        for (int i = 0; i < k; i++) { // check there are k nodes
            if (!node) return head;   // fewer than k → leave unchanged
            node = node->next;
        }

        ListNode* prev = reverseKGroup(node, k); // recurse on the rest
        ListNode* cur = head;
        for (int i = 0; i < k; i++) { // reverse this group
            ListNode* next = cur->next;
            cur->next = prev;
            prev = cur;
            cur = next;
        }
        return prev; // new head of this group
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N / k)",
      notes: `- Verify k nodes exist; if not, return the group unreversed.
- Reverse the current k nodes, attaching to the already-processed suffix.
- Recursion depth is N/k; an iterative version reaches O(1) space.`,
    },
  ],
}
