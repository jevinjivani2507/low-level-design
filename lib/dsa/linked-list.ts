import { DsaTopic } from "../dsa-data"

export const linkedList: DsaTopic = {
  topic: "Linked List",
  questions: [
    {
      id: "reverse-linked-list",
      title: "Reverse Linked List",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
      tags: ["blind-75"],
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
      tags: ["blind-75"],
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
      tags: ["blind-75"],
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
      tags: ["blind-75"],
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
      tags: ["blind-75"],
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
      tags: ["blind-75"],
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
  ],
}
