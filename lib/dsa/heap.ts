import { DsaTopic } from "../dsa-data"

export const heap: DsaTopic = {
  topic: "Heap",
  questions: [
    {
      id: "top-k-frequent-elements",
      title: "Top K Frequent Elements",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
      tags: ["blind-75", "neetcode-150"],
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
      tags: ["blind-75", "neetcode-150"],
      question:
        "Design a data structure that supports addNum(num) to add a number from a stream and findMedian() to return the median of all elements so far.",
      testCases: [
        {
          input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()",
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
    {
      id: "kth-largest-element-in-a-stream",
      title: "Kth Largest Element in a Stream",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
      tags: ["neetcode-150"],
      question:
        "Design a class that, given k and a stream of numbers, returns the kth largest element seen so far after each add.",
      testCases: [
        {
          input:
            "k = 3, nums = [4,5,8,2], add(3), add(5), add(10), add(9), add(4)",
          output: "4, 5, 5, 8, 8",
        },
      ],
      code: `class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap; // size k
    int k;

public:
    KthLargest(int k, vector<int>& nums) : k(k) {
        for (int x : nums) add(x);
    }

    int add(int val) { // O(log k)
        minHeap.push(val);
        if ((int)minHeap.size() > k) minHeap.pop(); // drop smallest
        return minHeap.top(); // kth largest = heap min of the top k
    }
};`,
      timeComplexity: "O(log k) per add",
      spaceComplexity: "O(k)",
      notes: `- Keep a min-heap of only the k largest values seen.
- The heap's top is the kth largest; evict when size exceeds k.
- Bounded heap makes each add O(log k), not O(log n).`,
    },
    {
      id: "last-stone-weight",
      title: "Last Stone Weight",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/",
      tags: ["neetcode-150"],
      question:
        "Repeatedly smash the two heaviest stones; if unequal, the difference remains. Return the weight of the last stone left, or 0 if none.",
      testCases: [
        {
          input: "stones = [2,7,4,1,8,1]",
          output: "1",
        },
        { input: "stones = [1]", output: "1" },
      ],
      code: `class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq(stones.begin(), stones.end()); // max-heap, O(N)

        while (pq.size() > 1) { // O(N log N)
            int a = pq.top(); pq.pop();
            int b = pq.top(); pq.pop();
            if (a != b) pq.push(a - b); // remainder goes back
        }

        return pq.empty() ? 0 : pq.top();
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- A max-heap always yields the two heaviest stones in O(log N).
- Push back the positive difference; equal stones vanish.
- Ends with one or zero stones.`,
    },
    {
      id: "k-closest-points-to-origin",
      title: "K Closest Points to Origin",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/",
      tags: ["neetcode-150"],
      question:
        "Given an array of points and an integer k, return the k points closest to the origin (Euclidean distance).",
      testCases: [
        {
          input: "points = [[1,3],[-2,2]], k = 1",
          output: "[[-2,2]]",
        },
        {
          input: "points = [[3,3],[5,-1],[-2,4]], k = 2",
          output: "[[3,3],[-2,4]]",
        },
      ],
      code: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<int, vector<int>>> pq; // max-heap by distance

        for (auto& p : points) { // O(N log k)
            int d = p[0] * p[0] + p[1] * p[1]; // squared distance (no sqrt)
            pq.push({d, p});
            if ((int)pq.size() > k) pq.pop(); // keep only k closest
        }

        vector<vector<int>> res;
        while (!pq.empty()) { res.push_back(pq.top().second); pq.pop(); }
        return res;
    }
};`,
      timeComplexity: "O(N log k)",
      spaceComplexity: "O(k)",
      notes: `- Compare squared distances — no need for sqrt.
- A size-k max-heap evicts the farthest, leaving the k closest.
- Quickselect gives O(N) average if a single batch answer is enough.`,
    },
    {
      id: "kth-largest-element-in-an-array",
      title: "Kth Largest Element in an Array",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      tags: ["neetcode-150"],
      question:
        "Given an integer array nums and an integer k, return the kth largest element (in sorted order, not the kth distinct).",
      testCases: [
        { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
        { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
      ],
      code: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap; // size k

        for (int x : nums) { // O(N log k)
            minHeap.push(x);
            if ((int)minHeap.size() > k) minHeap.pop();
        }

        return minHeap.top();
    }
};`,
      timeComplexity: "O(N log k)",
      spaceComplexity: "O(k)",
      notes: `- Maintain a min-heap of the k largest; its top is the answer.
- Evicting the smallest keeps the heap at size k.
- Quickselect averages O(N); the heap is simpler and streaming-friendly.`,
    },
    {
      id: "task-scheduler",
      title: "Task Scheduler",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
      tags: ["neetcode-150"],
      question:
        "Given tasks (letters) and a cooldown n between two identical tasks, return the minimum number of intervals (including idles) to finish all tasks.",
      testCases: [
        {
          input: 'tasks = ["A","A","A","B","B","B"], n = 2',
          output: "8",
          explanation: "A B idle A B idle A B.",
        },
        {
          input: 'tasks = ["A","A","A","B","B","B"], n = 0',
          output: "6",
        },
      ],
      code: `class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> count(26, 0);
        for (char t : tasks) count[t - 'A']++; // O(N)

        int maxCount = *max_element(count.begin(), count.end());
        int maxCountTasks = 0; // tasks tied for the highest frequency
        for (int c : count) if (c == maxCount) maxCountTasks++;

        // fill (maxCount-1) frames of size (n+1), then the last row
        int result = (maxCount - 1) * (n + 1) + maxCountTasks;
        return max((int)tasks.size(), result);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- The most frequent task dictates the skeleton of (maxCount-1) gaps of size n+1.
- Add the number of tasks sharing that max frequency for the final row.
- If tasks are plentiful there are no idles, so take max with tasks.size().`,
    },
    {
      id: "design-twitter",
      title: "Design Twitter",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/design-twitter/",
      tags: ["neetcode-150"],
      question:
        "Design a simplified Twitter: post tweets, follow/unfollow users, and get the 10 most recent tweet ids in a user's news feed (self + followees).",
      testCases: [
        {
          input:
            "postTweet(1,5), getNewsFeed(1), follow(1,2), postTweet(2,6), getNewsFeed(1), unfollow(1,2), getNewsFeed(1)",
          output: "[5], [6,5], [5]",
        },
      ],
      code: `class Twitter {
    int time = 0;
    unordered_map<int, vector<pair<int, int>>> tweets;   // user -> {time, id}
    unordered_map<int, unordered_set<int>> following;    // user -> followees

public:
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        priority_queue<pair<int, int>> pq; // max-heap by time
        auto addUser = [&](int u) {
            for (auto& [t, id] : tweets[u]) pq.push({t, id});
        };
        addUser(userId);
        for (int f : following[userId]) addUser(f);

        vector<int> res;
        while (!pq.empty() && res.size() < 10) { res.push_back(pq.top().second); pq.pop(); }
        return res;
    }

    void follow(int a, int b) { following[a].insert(b); }
    void unfollow(int a, int b) { following[a].erase(b); }
};`,
      timeComplexity: "O(T log T) per feed",
      spaceComplexity: "O(U + T)",
      notes: `- Timestamp every tweet so recency is a global counter.
- Feed merges the user's and followees' tweets via a max-heap, taking the top 10.
- follow/unfollow are set insert/erase; a k-way merge of per-user lists is a faster variant.`,
    },
  ],
}
