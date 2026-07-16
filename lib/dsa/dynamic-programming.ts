import { DsaTopic } from "../dsa-data"

export const dynamicProgramming: DsaTopic = {
  topic: "Dynamic Programming",
  questions: [
    {
      id: "climbing-stairs",
      title: "Climbing Stairs",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?",
      testCases: [
        {
          input: "n = 2",
          output: "2",
          explanation: "1+1 or 2.",
        },
        {
          input: "n = 3",
          output: "3",
          explanation: "1+1+1, 1+2, 2+1.",
        },
      ],
      code: `class Solution {
public:
    int climbStairs(int n) {
        int a = 1, b = 1; // ways to reach steps i-2 and i-1

        for (int i = 2; i <= n; i++) { // O(N)
            int c = a + b;
            a = b;
            b = c;
        }

        return b;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- ways(n) = ways(n-1) + ways(n-2) — Fibonacci from the last 1- or 2-step.
- Roll two variables instead of a full array for O(1) space.
- Base: ways(0) = ways(1) = 1.`,
    },
    {
      id: "coin-change",
      title: "Coin Change",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given coin denominations coins and a total amount, return the fewest coins needed to make up that amount, or -1 if it cannot be made. You have infinite coins of each type.",
      testCases: [
        {
          input: "coins = [1,2,5], amount = 11",
          output: "3",
          explanation: "11 = 5 + 5 + 1.",
        },
        {
          input: "coins = [2], amount = 3",
          output: "-1",
        },
      ],
      code: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1); // amount+1 = "infinity"
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) { // O(amount)
            for (int c : coins) { // O(coins)
                if (c <= a) dp[a] = min(dp[a], dp[a - c] + 1);
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      timeComplexity: "O(amount × coins)",
      spaceComplexity: "O(amount)",
      notes: `- Unbounded knapsack: dp[a] = min coins to make amount a.
- dp[a] = min over coins c of dp[a - c] + 1; seed dp[0] = 0.
- Use amount+1 as a sentinel "unreachable" so unmade amounts return -1.`,
    },
    {
      id: "longest-increasing-subsequence",
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-increasing-subsequence/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
      testCases: [
        {
          input: "nums = [10,9,2,5,3,7,101,18]",
          output: "4",
          explanation: "The LIS is [2,3,7,101].",
        },
        {
          input: "nums = [0,1,0,3,2,3]",
          output: "4",
        },
      ],
      code: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails; // tails[k] = smallest tail of an LIS of length k+1

        for (int x : nums) { // O(N)
            auto it = lower_bound(tails.begin(), tails.end(), x); // O(log N)
            if (it == tails.end()) tails.push_back(x);
            else *it = x; // replace to keep tails minimal
        }

        return tails.size();
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Patience sorting: keep the smallest possible tail for each subsequence length.
- \`lower_bound\` finds where x extends or replaces a tail; size of tails = LIS length.
- tails is not the actual subsequence, only its length is meaningful.`,
    },
    {
      id: "longest-common-subsequence",
      title: "Longest Common Subsequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given two strings text1 and text2, return the length of their longest common subsequence (characters in order, not necessarily contiguous), or 0 if none exists.",
      testCases: [
        {
          input: 'text1 = "abcde", text2 = "ace"',
          output: "3",
          explanation: 'The LCS is "ace".',
        },
        {
          input: 'text1 = "abc", text2 = "def"',
          output: "0",
        },
      ],
      code: `class Solution {
public:
    int longestCommonSubsequence(string a, string b) {
        int m = a.size(), n = b.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (int i = 1; i <= m; i++) { // O(M)
            for (int j = 1; j <= n; j++) { // O(N)
                if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }

        return dp[m][n];
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M × N)",
      notes: `- dp[i][j] = LCS of the first i chars of a and first j chars of b.
- Match → 1 + diagonal; mismatch → best of dropping one char from either string.
- Can compress to two rows for O(N) space since each cell needs only row i-1 and i.`,
    },
    {
      id: "word-break",
      title: "Word Break",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/word-break/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given a string s and a dictionary wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Words may be reused.",
      testCases: [
        {
          input: 's = "leetcode", wordDict = ["leet","code"]',
          output: "true",
          explanation: '"leet" + "code".',
        },
        {
          input:
            's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true; // empty prefix is always breakable

        for (int i = 1; i <= n; i++) { // O(N)
            for (int j = 0; j < i; j++) { // O(N)
                if (dp[j] && dict.count(s.substr(j, i - j))) { // O(1) avg + O(len)
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
};`,
      timeComplexity: "O(N² × L)",
      spaceComplexity: "O(N)",
      notes: `- dp[i] = can the prefix of length i be segmented into dictionary words.
- dp[i] is true if some split point j has dp[j] true and s[j..i) in the dict.
- The substr lookup adds an O(L) factor where L is the word length.`,
    },
    {
      id: "combination-sum",
      title: "Combination Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array of distinct integers candidates and a target, return all unique combinations that sum to target. Each candidate may be used unlimited times.",
      testCases: [
        {
          input: "candidates = [2,3,6,7], target = 7",
          output: "[[2,2,3],[7]]",
        },
        {
          input: "candidates = [2,3,5], target = 8",
          output: "[[2,2,2,2],[2,3,3],[3,5]]",
        },
      ],
      code: `class Solution {
public:
    void backtrack(vector<int>& c, int target, int start,
                   vector<int>& cur, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(cur); return; }

        for (int i = start; i < c.size(); i++) { // O(branching)
            if (c[i] > target) continue;
            cur.push_back(c[i]);
            backtrack(c, target - c[i], i, cur, res); // reuse i (unlimited)
            cur.pop_back();
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> cur;
        backtrack(candidates, target, 0, cur, res);
        return res;
    }
};`,
      timeComplexity: "O(2^target)",
      spaceComplexity: "O(target)",
      notes: `- Backtracking: at each step pick a candidate ≥ current, subtract, recurse.
- Pass \`i\` (not i+1) so the same number can be reused; \`start\` avoids permutations.
- Base case target == 0 records a valid combination; prune when candidate > target.`,
    },
    {
      id: "house-robber",
      title: "House Robber",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/house-robber/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array nums of house values along a street, return the maximum amount you can rob without robbing two adjacent houses.",
      testCases: [
        {
          input: "nums = [1,2,3,1]",
          output: "4",
          explanation: "Rob house 0 (1) and house 2 (3).",
        },
        {
          input: "nums = [2,7,9,3,1]",
          output: "12",
          explanation: "Rob houses 0, 2, 4 → 2 + 9 + 1.",
        },
      ],
      code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int prev = 0, curr = 0; // best up to i-2 and i-1

        for (int x : nums) { // O(N)
            int take = prev + x;      // rob this house
            int skip = curr;          // skip this house
            prev = curr;
            curr = max(take, skip);
        }

        return curr;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- At each house: max(rob it + best two back, skip it = best one back).
- Two rolling variables replace the dp array for O(1) space.
- Adjacency constraint is why "take" builds on \`prev\`, not \`curr\`.`,
    },
    {
      id: "house-robber-ii",
      title: "House Robber II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Houses are arranged in a circle, so the first and last are adjacent. Return the maximum you can rob without robbing two adjacent houses.",
      testCases: [
        {
          input: "nums = [2,3,2]",
          output: "3",
          explanation: "Can't rob houses 0 and 2 (adjacent in a circle).",
        },
        {
          input: "nums = [1,2,3,1]",
          output: "4",
        },
      ],
      code: `class Solution {
public:
    int robLine(vector<int>& nums, int lo, int hi) {
        int prev = 0, curr = 0;
        for (int i = lo; i <= hi; i++) { // O(N)
            int take = prev + nums[i];
            prev = curr;
            curr = max(take, curr);
        }
        return curr;
    }

    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        // Either skip the last house or skip the first — never both ends.
        return max(robLine(nums, 0, n - 2), robLine(nums, 1, n - 1));
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Circle means first and last are adjacent, so they can't both be robbed.
- Run the linear House Robber twice: houses [0..n-2] and [1..n-1], take the max.
- Handle n == 1 separately since both ranges would be empty.`,
    },
    {
      id: "decode-ways",
      title: "Decode Ways",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/decode-ways/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "A message of digits is encoded with A→1 … Z→26. Given a digit string s, return the number of ways to decode it. Leading zeros make a mapping invalid.",
      testCases: [
        {
          input: 's = "12"',
          output: "2",
          explanation: '"AB" (1 2) or "L" (12).',
        },
        {
          input: 's = "226"',
          output: "3",
          explanation: '"BZ", "VF", "BBF".',
        },
      ],
      code: `class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        if (s[0] == '0') return 0;

        int prev2 = 1, prev1 = 1; // ways up to i-2 and i-1

        for (int i = 1; i < n; i++) { // O(N)
            int cur = 0;
            if (s[i] != '0') cur += prev1;                 // single digit
            int two = (s[i - 1] - '0') * 10 + (s[i] - '0');
            if (two >= 10 && two <= 26) cur += prev2;       // two digits 10..26
            prev2 = prev1;
            prev1 = cur;
        }

        return prev1;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- dp[i] = ways to decode the prefix ending at i: add prev1 if s[i] valid alone, prev2 if the pair 10..26.
- A '0' can only survive as part of 10 or 20 — otherwise the string is undecodable.
- Two rolling variables give O(1) space; guard the leading '0' up front.`,
    },
    {
      id: "unique-paths",
      title: "Unique Paths",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "A robot starts at the top-left of an m × n grid and can only move right or down. Return the number of unique paths to the bottom-right corner.",
      testCases: [
        {
          input: "m = 3, n = 7",
          output: "28",
        },
        {
          input: "m = 3, n = 2",
          output: "3",
        },
      ],
      code: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1); // first row: only one way to each cell

        for (int i = 1; i < m; i++) { // O(M)
            for (int j = 1; j < n; j++) { // O(N)
                dp[j] += dp[j - 1]; // from above (dp[j]) + from left (dp[j-1])
            }
        }

        return dp[n - 1];
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(N)",
      notes: `- paths(i,j) = paths(i-1,j) + paths(i,j-1); first row and column are all 1.
- Compress to a single row: dp[j] += dp[j-1] reuses "above" and "left" in place.
- Closed form is C(m+n-2, m-1) but the DP is simpler to reason about.`,
    },
    {
      id: "jump-game",
      title: "Jump Game",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/jump-game/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array nums where nums[i] is the max jump length from index i, return true if you can reach the last index starting from index 0.",
      testCases: [
        {
          input: "nums = [2,3,1,1,4]",
          output: "true",
          explanation: "Jump 1 step to index 1, then 3 steps to the end.",
        },
        {
          input: "nums = [3,2,1,0,4]",
          output: "false",
          explanation: "You always land on index 3 with jump length 0.",
        },
      ],
      code: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int reach = 0; // furthest index reachable so far

        for (int i = 0; i < nums.size(); i++) { // O(N)
            if (i > reach) return false;        // stuck before this index
            reach = max(reach, i + nums[i]);
        }

        return true;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Greedy: track the furthest reachable index while scanning left to right.
- If the current index passes \`reach\`, there's a gap you can't cross → false.
- No DP needed; one pass and a single running maximum suffice.`,
    },
  ],
}
