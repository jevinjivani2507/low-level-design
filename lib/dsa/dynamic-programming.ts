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
    {
      id: "min-cost-climbing-stairs",
      title: "Min Cost Climbing Stairs",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
      tags: ["neetcode-150"],
      question:
        "Each cost[i] is the cost of step i. You may start at step 0 or 1 and climb one or two steps at a time. Return the minimum cost to reach the top (past the last step).",
      testCases: [
        {
          input: "cost = [10,15,20]",
          output: "15",
          explanation: "Start at index 1, pay 15, and step two to the top.",
        },
        {
          input: "cost = [1,100,1,1,1,100,1,1,100,1]",
          output: "6",
        },
      ],
      code: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int a = 0, b = 0; // min cost to stand on step i-2, i-1

        for (int i = 2; i <= n; i++) { // O(N)
            int cur = min(b + cost[i - 1], a + cost[i - 2]);
            a = b; b = cur;
        }

        return b;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- dp[i] = min cost to reach step i = min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2]).
- The top is index n, one past the last step.
- Two rolling variables replace the array.`,
    },
    {
      id: "partition-equal-subset-sum",
      title: "Partition Equal Subset Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
      tags: ["neetcode-150"],
      question:
        "Given an array of positive integers nums, return true if it can be split into two subsets with equal sum.",
      testCases: [
        {
          input: "nums = [1,5,11,5]",
          output: "true",
          explanation: "[1,5,5] and [11].",
        },
        { input: "nums = [1,2,3,5]", output: "false" },
      ],
      code: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2) return false; // odd total can't split evenly
        int target = sum / 2;

        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int num : nums) // O(N × target)
            for (int j = target; j >= num; j--) // iterate down: 0/1 knapsack
                dp[j] = dp[j] || dp[j - num];

        return dp[target];
    }
};`,
      timeComplexity: "O(N × sum)",
      spaceComplexity: "O(sum)",
      notes: `- Reduce to subset-sum for target = total/2 (impossible if total is odd).
- 1-D knapsack; iterate j downward so each number is used at most once.
- dp[j] means some subset sums to j.`,
    },
    {
      id: "best-time-to-buy-and-sell-stock-with-cooldown",
      title: "Best Time to Buy and Sell Stock with Cooldown",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      tags: ["neetcode-150"],
      question:
        "Given daily prices, maximize profit with unlimited transactions, but after selling you must cooldown one day before buying again.",
      testCases: [
        {
          input: "prices = [1,2,3,0,2]",
          output: "3",
          explanation: "buy, sell, cooldown, buy, sell.",
        },
        { input: "prices = [1]", output: "0" },
      ],
      code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int sold = 0, held = INT_MIN, rest = 0;

        for (int p : prices) { // O(N)
            int prevSold = sold;
            sold = held + p;              // sell today
            held = max(held, rest - p);   // hold or buy today (from rest)
            rest = max(rest, prevSold);   // rest / cooldown
        }

        return max(sold, rest);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Three states per day: just sold, currently holding, resting.
- Buying is only allowed from \`rest\`, enforcing the one-day cooldown after a sale.
- Answer is the best of ending sold or resting (never mid-hold).`,
    },
    {
      id: "coin-change-ii",
      title: "Coin Change II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
      tags: ["neetcode-150"],
      question:
        "Given coin denominations and an amount, return the number of distinct combinations that make up that amount. Infinite coins of each type.",
      testCases: [
        {
          input: "amount = 5, coins = [1,2,5]",
          output: "4",
          explanation: "5=5, 5=2+2+1, 5=2+1+1+1, 5=1×5.",
        },
        { input: "amount = 3, coins = [2]", output: "0" },
      ],
      code: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;

        for (int coin : coins) // coins outer → count combinations, not permutations
            for (int j = coin; j <= amount; j++) // O(coins × amount)
                dp[j] += dp[j - coin];

        return dp[amount];
    }
};`,
      timeComplexity: "O(coins × amount)",
      spaceComplexity: "O(amount)",
      notes: `- dp[j] = number of ways to form amount j.
- Loop coins on the outside so each combination is counted once (order-independent).
- Swapping the loop order would count permutations instead.`,
    },
    {
      id: "target-sum",
      title: "Target Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/target-sum/",
      tags: ["neetcode-150"],
      question:
        "Assign + or - to each number in nums so the expression equals target. Return the number of ways to do so.",
      testCases: [
        {
          input: "nums = [1,1,1,1,1], target = 3",
          output: "5",
        },
        { input: "nums = [1], target = 1", output: "1" },
      ],
      code: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        // positives P satisfy P = (sum + target) / 2
        if (abs(target) > sum || (sum + target) % 2) return 0;
        int p = (sum + target) / 2;

        vector<int> dp(p + 1, 0);
        dp[0] = 1;
        for (int num : nums) // O(N × p)
            for (int j = p; j >= num; j--) // 0/1 knapsack
                dp[j] += dp[j - num];

        return dp[p];
    }
};`,
      timeComplexity: "O(N × sum)",
      spaceComplexity: "O(sum)",
      notes: `- Split into positive/negative sets: the positives must sum to (total+target)/2.
- Reduces to counting subsets with that sum — a 0/1 knapsack count.
- Impossible if (total+target) is odd or |target| exceeds total.`,
    },
    {
      id: "interleaving-string",
      title: "Interleaving String",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
      tags: ["neetcode-150"],
      question:
        "Given strings s1, s2, s3, return true if s3 is formed by interleaving s1 and s2 (preserving each string's internal order).",
      testCases: [
        {
          input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"',
          output: "true",
        },
        {
          input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"',
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != (int)s3.size()) return false;

        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int i = 0; i <= m; i++) { // O(M × N)
            for (int j = 0; j <= n; j++) {
                if (i > 0 && s1[i - 1] == s3[i + j - 1])
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                if (j > 0 && s2[j - 1] == s3[i + j - 1])
                    dp[i][j] = dp[i][j] || dp[i][j - 1];
            }
        }

        return dp[m][n];
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M × N)",
      notes: `- dp[i][j] = can s3's first i+j chars be interleaved from s1[0..i) and s2[0..j).
- Extend from above (take an s1 char) or from the left (take an s2 char) when it matches s3.
- Length mismatch fails immediately; compressible to one row.`,
    },
    {
      id: "longest-increasing-path-in-a-matrix",
      title: "Longest Increasing Path in a Matrix",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
      tags: ["neetcode-150"],
      question:
        "Given an m × n matrix, return the length of the longest strictly increasing path. You may move up, down, left, or right.",
      testCases: [
        {
          input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
          output: "4",
          explanation: "The path [1,2,6,9].",
        },
        {
          input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
          output: "4",
          explanation: "The path [3,4,5,6].",
        },
      ],
      code: `class Solution {
public:
    int dfs(vector<vector<int>>& m, int i, int j, vector<vector<int>>& memo) {
        if (memo[i][j]) return memo[i][j];
        int rows = m.size(), cols = m[0].size(), best = 1;
        int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && nj >= 0 && ni < rows && nj < cols && m[ni][nj] > m[i][j])
                best = max(best, 1 + dfs(m, ni, nj, memo));
        }
        return memo[i][j] = best;
    }

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size(), res = 0;
        vector<vector<int>> memo(m, vector<int>(n, 0));
        for (int i = 0; i < m; i++) // O(M × N)
            for (int j = 0; j < n; j++)
                res = max(res, dfs(matrix, i, j, memo));
        return res;
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M × N)",
      notes: `- DFS from each cell to strictly greater neighbors; memoize the longest path per cell.
- Strictly increasing edges make the graph a DAG, so no visited set is needed.
- Memoization makes each cell computed once → O(M × N).`,
    },
    {
      id: "distinct-subsequences",
      title: "Distinct Subsequences",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/",
      tags: ["neetcode-150"],
      question:
        "Given strings s and t, return the number of distinct subsequences of s that equal t.",
      testCases: [
        {
          input: 's = "rabbbit", t = "rabbit"',
          output: "3",
        },
        {
          input: 's = "babgbag", t = "bag"',
          output: "5",
        },
      ],
      code: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<vector<unsigned long long>> dp(
            m + 1, vector<unsigned long long>(n + 1, 0));
        for (int i = 0; i <= m; i++) dp[i][0] = 1; // empty t: one subsequence

        for (int i = 1; i <= m; i++) { // O(M × N)
            for (int j = 1; j <= n; j++) {
                dp[i][j] = dp[i - 1][j]; // skip s[i-1]
                if (s[i - 1] == t[j - 1]) dp[i][j] += dp[i - 1][j - 1]; // use it
            }
        }

        return dp[m][n];
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M × N)",
      notes: `- dp[i][j] = ways the first i chars of s form the first j chars of t.
- Always allow skipping s[i-1]; when characters match, also add the matched count.
- Empty target has exactly one subsequence, seeding the first column.`,
    },
    {
      id: "edit-distance",
      title: "Edit Distance",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
      tags: ["neetcode-150"],
      question:
        "Given two words, return the minimum number of insertions, deletions, or replacements to convert word1 into word2.",
      testCases: [
        {
          input: 'word1 = "horse", word2 = "ros"',
          output: "3",
          explanation: "horse → rorse → rose → ros.",
        },
        {
          input: 'word1 = "intention", word2 = "execution"',
          output: "5",
        },
      ],
      code: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 0; i <= m; i++) dp[i][0] = i; // delete all
        for (int j = 0; j <= n; j++) dp[0][j] = j; // insert all

        for (int i = 1; i <= m; i++) { // O(M × N)
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + min({dp[i - 1][j],      // delete
                                         dp[i][j - 1],      // insert
                                         dp[i - 1][j - 1]}); // replace
            }
        }

        return dp[m][n];
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M × N)",
      notes: `- dp[i][j] = edit distance between the prefixes of lengths i and j.
- Match → carry the diagonal; else 1 + min(delete, insert, replace).
- First row/column are pure insert/delete costs.`,
    },
    {
      id: "burst-balloons",
      title: "Burst Balloons",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
      tags: ["neetcode-150"],
      question:
        "Given balloons with values nums, bursting balloon i earns nums[left] × nums[i] × nums[right] (neighbors after removals; out-of-range = 1). Return the max coins.",
      testCases: [
        {
          input: "nums = [3,1,5,8]",
          output: "167",
          explanation:
            "Burst order 1,5,3,8 → 3·1·5 + 3·5·8 + 1·3·8 + 1·8·1 = 167.",
        },
        { input: "nums = [1,5]", output: "10" },
      ],
      code: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> b(n + 2, 1); // pad with 1s at both ends
        for (int i = 0; i < n; i++) b[i + 1] = nums[i];

        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 1; len <= n; len++) {           // O(N³)
            for (int left = 1; left + len - 1 <= n; left++) {
                int right = left + len - 1;
                for (int k = left; k <= right; k++) {  // k = last balloon burst
                    int coins = b[left - 1] * b[k] * b[right + 1]
                              + dp[left][k - 1] + dp[k + 1][right];
                    dp[left][right] = max(dp[left][right], coins);
                }
            }
        }

        return dp[1][n];
    }
};`,
      timeComplexity: "O(N³)",
      spaceComplexity: "O(N²)",
      notes: `- Think of k as the LAST balloon burst in a range; its neighbors are then the padded ends.
- dp[left][right] = max coins bursting all balloons strictly inside that range.
- Pad with 1s so boundary multiplications are uniform.`,
    },
    {
      id: "regular-expression-matching",
      title: "Regular Expression Matching",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/",
      tags: ["neetcode-150"],
      question:
        "Implement regex matching for '.' (any single char) and '*' (zero or more of the preceding element). The match must cover the entire input string.",
      testCases: [
        {
          input: 's = "aa", p = "a*"',
          output: "true",
          explanation: "'a*' matches 'aa'.",
        },
        {
          input: 's = "mississippi", p = "mis*is*p*."',
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;

        for (int j = 1; j <= n; j++) // patterns like a*, a*b* match empty s
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];

        for (int i = 1; i <= m; i++) { // O(M × N)
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2]; // zero of the preceding element
                    if (p[j - 2] == '.' || p[j - 2] == s[i - 1])
                        dp[i][j] = dp[i][j] || dp[i - 1][j]; // one more
                } else if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }

        return dp[m][n];
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M × N)",
      notes: `- dp[i][j] = does s[0..i) match p[0..j).
- '*' means zero occurrences (dp[i][j-2]) or one more if the preceding token matches s[i-1].
- Seed dp[0][j] so patterns like "a*b*" can match the empty string.`,
    },
  ],
}
