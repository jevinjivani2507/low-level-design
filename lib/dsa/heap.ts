import { DsaTopic } from "../dsa-data"

export const heap: DsaTopic = {
  topic: "Heap",
  questions: [
    {
      id: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
      tags: ["blind-75"],
      question:
        "Given an integer array nums and an integer k, return the k most frequent elements in any order.",
      testCases: [
        {
          input: "nums = [1,1,1,2,2,3], k = 2",
          output: "[1,2]",
        },
        {
          input: "nums = [1], k = 1",
          output: "[1]",
        },
      ],
      code: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> freq;
        for (int x : nums) freq[x]++; // O(N), O(1) avg

        // bucket[f] = values that appear exactly f times
        int n = nums.size();
        vector<vector<int>> buckets(n + 1);
        for (auto& [val, f] : freq) buckets[f].push_back(val); // O(U)

        vector<int> res;
        for (int f = n; f >= 1 && (int)res.size() < k; f--) { // O(N)
            for (int val : buckets[f]) {
                res.push_back(val);
                if ((int)res.size() == k) break;
            }
        }
        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Count frequencies, then bucket values by frequency (index = count).
- Scan buckets from highest frequency down, collecting until you have k values.
- Bucket sort gives O(N) vs O(N log k) for a heap-based approach.`,
    },
    {
      id: "find-median-from-data-stream",
      title: "Find Median from Data Stream",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/find-median-from-data-stream/",
      tags: ["blind-75"],
      question:
        "Design a data structure that supports addNum(num) to add a number from a stream and findMedian() to return the median of all elements so far.",
      testCases: [
        {
          input:
            'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()',
          output: "1.5, then 2.0",
          explanation: "Median of [1,2] is 1.5; median of [1,2,3] is 2.",
        },
      ],
      code: `class MedianFinder {
    priority_queue<int> lo;                              // max-heap: smaller half
    priority_queue<int, vector<int>, greater<int>> hi;   // min-heap: larger half

public:
    void addNum(int num) { // O(log N)
        lo.push(num);
        hi.push(lo.top()); lo.pop();      // balance value into the upper half
        if (hi.size() > lo.size()) {      // keep lo the same size or one larger
            lo.push(hi.top()); hi.pop();
        }
    }

    double findMedian() { // O(1)
        if (lo.size() > hi.size()) return lo.top();
        return (lo.top() + hi.top()) / 2.0;
    }
};`,
      timeComplexity: "O(log N) add, O(1) median",
      spaceComplexity: "O(N)",
      notes: `- Two heaps: a max-heap for the smaller half, a min-heap for the larger half.
- Keep sizes balanced (lo ≥ hi by at most 1); the tops straddle the median.
- Odd count → lo.top(); even count → average of both tops.`,
    },
  ],
}
