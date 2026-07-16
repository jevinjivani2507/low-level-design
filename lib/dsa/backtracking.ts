import { DsaTopic } from "../dsa-data"

export const backtracking: DsaTopic = {
  topic: "Backtracking",
  questions: [
    {
      id: "subsets",
      title: "Subsets",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/subsets/",
      tags: ["neetcode-150"],
      question:
        "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
      testCases: [
        {
          input: "nums = [1,2,3]",
          output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]",
        },
        { input: "nums = [0]", output: "[[],[0]]" },
      ],
      code: `class Solution {
public:
    void backtrack(vector<int>& nums, int start,
                   vector<int>& cur, vector<vector<int>>& res) {
        res.push_back(cur); // every prefix state is a valid subset

        for (int i = start; i < nums.size(); i++) { // O(2^N) total
            cur.push_back(nums[i]);
            backtrack(nums, i + 1, cur, res); // i+1 → no reuse, no permutations
            cur.pop_back();
        }
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        backtrack(nums, 0, cur, res);
        return res;
    }
};`,
      timeComplexity: "O(N × 2^N)",
      spaceComplexity: "O(N)",
      notes: `- Each element is either included or not → 2^N subsets.
- Record \`cur\` at every node; \`start\` prevents revisiting earlier elements.
- Passing i+1 (not i) avoids reuse and duplicate orderings.`,
    },
    {
      id: "combination-sum-ii",
      title: "Combination Sum II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/",
      tags: ["neetcode-150"],
      question:
        "Given a collection of candidate numbers (which may contain duplicates) and a target, find all unique combinations that sum to target. Each number may be used at most once.",
      testCases: [
        {
          input: "candidates = [10,1,2,7,6,1,5], target = 8",
          output: "[[1,1,6],[1,2,5],[1,7],[2,6]]",
        },
        {
          input: "candidates = [2,5,2,1,2], target = 5",
          output: "[[1,2,2],[5]]",
        },
      ],
      code: `class Solution {
public:
    void backtrack(vector<int>& c, int target, int start,
                   vector<int>& cur, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(cur); return; }

        for (int i = start; i < c.size(); i++) { // O(2^N)
            if (i > start && c[i] == c[i - 1]) continue; // skip dup at same depth
            if (c[i] > target) break;                    // sorted → prune
            cur.push_back(c[i]);
            backtrack(c, target - c[i], i + 1, cur, res); // each used once
            cur.pop_back();
        }
    }

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end()); // O(N log N)
        vector<vector<int>> res;
        vector<int> cur;
        backtrack(candidates, target, 0, cur, res);
        return res;
    }
};`,
      timeComplexity: "O(2^N)",
      spaceComplexity: "O(N)",
      notes: `- Sort first so duplicates are adjacent and can be skipped at each level.
- \`i > start && c[i] == c[i-1]\` avoids duplicate combinations.
- Pass i+1 (each number used once); break early since sorted candidates > target can't help.`,
    },
    {
      id: "permutations",
      title: "Permutations",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/permutations/",
      tags: ["neetcode-150"],
      question:
        "Given an array nums of distinct integers, return all possible permutations in any order.",
      testCases: [
        {
          input: "nums = [1,2,3]",
          output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        },
        { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
      ],
      code: `class Solution {
public:
    void backtrack(vector<int>& nums, vector<int>& cur,
                   vector<bool>& used, vector<vector<int>>& res) {
        if (cur.size() == nums.size()) { res.push_back(cur); return; }

        for (int i = 0; i < nums.size(); i++) { // O(N) per level
            if (used[i]) continue;
            used[i] = true; cur.push_back(nums[i]);
            backtrack(nums, cur, used, res);
            cur.pop_back(); used[i] = false; // undo choice
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        vector<bool> used(nums.size(), false);
        backtrack(nums, cur, used, res);
        return res;
    }
};`,
      timeComplexity: "O(N × N!)",
      spaceComplexity: "O(N)",
      notes: `- Build permutations position by position, tracking which elements are used.
- Undo the used flag and pop on backtrack to explore other branches.
- N! leaves × O(N) to copy each permutation.`,
    },
    {
      id: "subsets-ii",
      title: "Subsets II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/subsets-ii/",
      tags: ["neetcode-150"],
      question:
        "Given an integer array nums that may contain duplicates, return all possible subsets. The solution must not contain duplicate subsets.",
      testCases: [
        {
          input: "nums = [1,2,2]",
          output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
        },
        { input: "nums = [0]", output: "[[],[0]]" },
      ],
      code: `class Solution {
public:
    void backtrack(vector<int>& nums, int start,
                   vector<int>& cur, vector<vector<int>>& res) {
        res.push_back(cur);

        for (int i = start; i < nums.size(); i++) { // O(2^N)
            if (i > start && nums[i] == nums[i - 1]) continue; // skip dup at level
            cur.push_back(nums[i]);
            backtrack(nums, i + 1, cur, res);
            cur.pop_back();
        }
    }

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end()); // O(N log N)
        vector<vector<int>> res;
        vector<int> cur;
        backtrack(nums, 0, cur, res);
        return res;
    }
};`,
      timeComplexity: "O(N × 2^N)",
      spaceComplexity: "O(N)",
      notes: `- Same as Subsets, but sort and skip duplicates at the same recursion depth.
- \`i > start\` lets the first copy of a value be used but blocks siblings from repeating it.
- Sorting groups duplicates so the skip check works.`,
    },
    {
      id: "palindrome-partitioning",
      title: "Palindrome Partitioning",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/",
      tags: ["neetcode-150"],
      question:
        "Given a string s, partition it so that every substring of the partition is a palindrome. Return all possible palindrome partitionings.",
      testCases: [
        {
          input: 's = "aab"',
          output: '[["a","a","b"],["aa","b"]]',
        },
        { input: 's = "a"', output: '[["a"]]' },
      ],
      code: `class Solution {
public:
    bool isPal(const string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    }

    void backtrack(const string& s, int start,
                   vector<string>& cur, vector<vector<string>>& res) {
        if (start == (int)s.size()) { res.push_back(cur); return; }

        for (int end = start; end < (int)s.size(); end++) { // O(2^N) cuts
            if (isPal(s, start, end)) { // O(N) check
                cur.push_back(s.substr(start, end - start + 1));
                backtrack(s, end + 1, cur, res);
                cur.pop_back();
            }
        }
    }

    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> cur;
        backtrack(s, 0, cur, res);
        return res;
    }
};`,
      timeComplexity: "O(N × 2^N)",
      spaceComplexity: "O(N)",
      notes: `- Try every cut point; only recurse when the prefix substring is a palindrome.
- Each position can start a new cut → up to 2^N partitions.
- A DP palindrome table can drop the per-check cost from O(N) to O(1).`,
    },
    {
      id: "letter-combinations-of-a-phone-number",
      title: "Letter Combinations of a Phone Number",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      tags: ["neetcode-150"],
      question:
        "Given a string of digits 2-9, return all possible letter combinations the number could represent (as on a phone keypad). Return an empty list if the input is empty.",
      testCases: [
        {
          input: 'digits = "23"',
          output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]',
        },
        { input: 'digits = ""', output: "[]" },
      ],
      code: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> map = {"", "", "abc", "def", "ghi",
                              "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string> res;
        string cur;

        function<void(int)> backtrack = [&](int idx) {
            if (idx == (int)digits.size()) { res.push_back(cur); return; }
            for (char c : map[digits[idx] - '0']) { // O(4) branching
                cur.push_back(c);
                backtrack(idx + 1);
                cur.pop_back();
            }
        };

        backtrack(0);
        return res;
    }
};`,
      timeComplexity: "O(4^N × N)",
      spaceComplexity: "O(N)",
      notes: `- Map each digit to its letters; recurse one digit deeper per level.
- Up to 4 letters per digit → at most 4^N combinations.
- Guard the empty input explicitly so it returns [] not [""].`,
    },
    {
      id: "n-queens",
      title: "N-Queens",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/n-queens/",
      tags: ["neetcode-150"],
      question:
        "Place n queens on an n × n board so that no two attack each other. Return all distinct solutions, each as a board where 'Q' is a queen and '.' is empty.",
      testCases: [
        {
          input: "n = 4",
          output:
            '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
        },
        { input: "n = 1", output: '[["Q"]]' },
      ],
      code: `class Solution {
public:
    vector<vector<string>> res;

    void backtrack(int row, int n, vector<string>& board,
                   vector<bool>& cols, vector<bool>& d1, vector<bool>& d2) {
        if (row == n) { res.push_back(board); return; }

        for (int col = 0; col < n; col++) { // O(N) per row
            int a = row + col, b = row - col + n - 1; // diagonal ids
            if (cols[col] || d1[a] || d2[b]) continue;

            board[row][col] = 'Q';
            cols[col] = d1[a] = d2[b] = true;
            backtrack(row + 1, n, board, cols, d1, d2);
            board[row][col] = '.';
            cols[col] = d1[a] = d2[b] = false;
        }
    }

    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        vector<bool> cols(n), d1(2 * n), d2(2 * n);
        backtrack(0, n, board, cols, d1, d2);
        return res;
    }
};`,
      timeComplexity: "O(N!)",
      spaceComplexity: "O(N²)",
      notes: `- Place one queen per row; track attacked columns and both diagonals with boolean arrays.
- Diagonal ids: \`row + col\` (↘) and \`row - col + n - 1\` (↙) are constant along a diagonal.
- O(1) conflict checks via the marker arrays make each placement cheap.`,
    },
  ],
}
