import { DsaTopic } from "../dsa-data"

export const array: DsaTopic = {
  topic: "Array",
  questions: [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Exactly one solution exists and you may not use the same element twice.",
      testCases: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "nums[0] + nums[1] == 9.",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
        },
      ],
      code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen; // value -> index

        for (int i = 0; i < nums.size(); i++) { // O(N)
            int need = target - nums[i];
            if (seen.count(need)) { // O(1) avg
                return {seen[need], i};
            }
            seen[nums[i]] = i; // O(1) avg
        }

        return {};
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- One pass: for each element look up its complement \`target - nums[i]\` in a hash map.
- Store value → index; check before inserting so you never reuse the same element.
- Hash map trades O(N) space for O(N) time vs the O(N²) brute force.`,
    },
    {
      id: "best-time-to-buy-and-sell-stock",
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "You are given an array prices where prices[i] is the price of a stock on day i. Maximize profit by buying on one day and selling on a later day. Return the max profit, or 0 if none is possible.",
      testCases: [
        {
          input: "prices = [7,1,5,3,6,4]",
          output: "5",
          explanation: "Buy on day 2 (price 1), sell on day 5 (price 6).",
        },
        {
          input: "prices = [7,6,4,3,1]",
          output: "0",
          explanation: "Prices only fall, so no profitable transaction.",
        },
      ],
      code: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int best = 0;

        for (int p : prices) { // O(N)
            minPrice = min(minPrice, p);
            best = max(best, p - minPrice);
        }

        return best;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Track the minimum price seen so far; best answer is the max gap after that min.
- One pass: at each day, either lower the running min or improve the profit.
- Buy must come before sell — updating min first each day enforces the ordering.`,
    },
    {
      id: "contains-duplicate",
      title: "Contains Duplicate",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.",
      testCases: [
        {
          input: "nums = [1,2,3,1]",
          output: "true",
        },
        {
          input: "nums = [1,2,3,4]",
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;

        for (int x : nums) { // O(N)
            if (seen.count(x)) return true; // O(1) avg
            seen.insert(x); // O(1) avg
        }

        return false;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Insert into a hash set; a value already present means a duplicate.
- Early-return on the first collision instead of scanning the whole array.
- Alternative: sort and compare neighbors for O(1) space but O(N log N) time.`,
    },
    {
      id: "product-of-array-except-self",
      title: "Product of Array Except Self",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/product-of-array-except-self/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an integer array nums, return an array answer where answer[i] is the product of all elements except nums[i]. Solve in O(N) without division.",
      testCases: [
        {
          input: "nums = [1,2,3,4]",
          output: "[24,12,8,6]",
        },
        {
          input: "nums = [-1,1,0,-3,3]",
          output: "[0,0,9,0,0]",
        },
      ],
      code: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);

        int prefix = 1;
        for (int i = 0; i < n; i++) { // O(N) prefix pass
            res[i] = prefix;
            prefix *= nums[i];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) { // O(N) suffix pass
            res[i] *= suffix;
            suffix *= nums[i];
        }

        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- answer[i] = product of everything to the left × product of everything to the right.
- First pass fills res with prefix products; second pass multiplies in suffix products.
- Running \`prefix\`/\`suffix\` scalars keep it O(1) extra space (output array excluded).`,
    },
    {
      id: "maximum-subarray",
      title: "Maximum Subarray",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an integer array nums, find the contiguous subarray with the largest sum and return that sum.",
      testCases: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
        },
        {
          input: "nums = [1]",
          output: "1",
        },
      ],
      code: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0];
        int best = nums[0];

        for (int i = 1; i < nums.size(); i++) { // O(N)
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur);
        }

        return best;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Kadane: \`cur\` is the best sum ending at i — extend the run or restart at nums[i].
- Restart when the running sum turns negative (dragging the next element down).
- Track \`best\` separately since the optimal subarray may end before the array does.`,
    },
    {
      id: "maximum-product-subarray",
      title: "Maximum Product Subarray",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an integer array nums, find the contiguous subarray with the largest product and return that product.",
      testCases: [
        {
          input: "nums = [2,3,-2,4]",
          output: "6",
          explanation: "The subarray [2,3] has the largest product 6.",
        },
        {
          input: "nums = [-2,0,-1]",
          output: "0",
        },
      ],
      code: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int best = nums[0];
        int curMax = nums[0], curMin = nums[0];

        for (int i = 1; i < nums.size(); i++) { // O(N)
            int x = nums[i];
            if (x < 0) swap(curMax, curMin); // negative flips roles

            curMax = max(x, curMax * x);
            curMin = min(x, curMin * x);

            best = max(best, curMax);
        }

        return best;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Track both max and min product ending at i — a negative can turn the min into the max.
- Swap curMax/curMin on a negative element before multiplying.
- Zero resets both to the current element (max(x, ...) restarts the window).`,
    },
    {
      id: "longest-consecutive-sequence",
      title: "Longest Consecutive Sequence",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-consecutive-sequence/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an unsorted array of integers nums, return the length of the longest run of consecutive integers. Solve in O(N).",
      testCases: [
        {
          input: "nums = [100,4,200,1,3,2]",
          output: "4",
          explanation: "The longest sequence is [1,2,3,4], length 4.",
        },
        {
          input: "nums = [0,3,7,2,5,8,4,6,0,1]",
          output: "9",
        },
      ],
      code: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s(nums.begin(), nums.end()); // O(N)
        int best = 0;

        for (int x : s) { // O(N)
            if (s.count(x - 1)) continue; // not a sequence start

            int len = 1;
            int cur = x;
            while (s.count(cur + 1)) { // O(1) avg per step, O(N) total
                cur++;
                len++;
            }
            best = max(best, len);
        }

        return best;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Put all values in a hash set for O(1) membership tests.
- Only start counting from a sequence start (no \`x - 1\` present) so each run is walked once.
- The inner while runs O(N) total across the whole loop, keeping it linear overall.`,
    },
    {
      id: "valid-sudoku",
      title: "Valid Sudoku",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/",
      tags: ["neetcode-150"],
      question:
        "Determine if a 9 × 9 Sudoku board is valid: each row, each column, and each 3 × 3 sub-box must contain the digits 1-9 without repetition. Only filled cells are checked.",
      testCases: [
        {
          input:
            'board = [["5","3",".",".","7",...],...] (valid partially filled board)',
          output: "true",
        },
        {
          input: "board with two 8s in the top-left box",
          output: "false",
          explanation: "A repeated digit in a row, column, or box is invalid.",
        },
      ],
      code: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        vector<set<char>> rows(9), cols(9), boxes(9);

        for (int i = 0; i < 9; i++) { // O(1) — fixed 9x9
            for (int j = 0; j < 9; j++) {
                char c = board[i][j];
                if (c == '.') continue;
                int b = (i / 3) * 3 + j / 3; // box index 0..8
                if (rows[i].count(c) || cols[j].count(c) || boxes[b].count(c))
                    return false;
                rows[i].insert(c); cols[j].insert(c); boxes[b].insert(c);
            }
        }

        return true;
    }
};`,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      notes: `- Track seen digits per row, per column, and per 3×3 box.
- Box index is \`(i/3)*3 + j/3\`; a repeat in any set means invalid.
- Fixed 9×9 board → constant time and space.`,
    },
  ],
}
