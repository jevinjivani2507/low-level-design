import { DsaTopic } from "../dsa-data"

export const matrix: DsaTopic = {
  topic: "Matrix",
  questions: [
    {
      id: "set-matrix-zeroes",
      title: "Set Matrix Zeroes",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an m × n integer matrix, if an element is 0 set its entire row and column to 0. Do it in place using O(1) extra space.",
      testCases: [
        {
          input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
          output: "[[1,0,1],[0,0,0],[1,0,1]]",
          matrices: [
            [
              [1, 1, 1],
              [1, 0, 1],
              [1, 1, 1],
            ],
          ],
        },
        {
          input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
          output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
        },
      ],
      code: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool firstRow = false, firstCol = false;

        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true; // O(N)
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true; // O(M)

        // Use row 0 and col 0 as markers for the rest of the grid.
        for (int i = 1; i < m; i++) // O(M)
            for (int j = 1; j < n; j++) // O(N)
                if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }

        for (int i = 1; i < m; i++) // O(M)
            for (int j = 1; j < n; j++) // O(N)
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;

        if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(1)",
      notes: `- Use the first row and column themselves as zero-flags instead of extra arrays.
- Record whether row 0 / col 0 originally had a zero before overwriting them.
- Apply markers to the interior first, then zero the first row/col last.`,
    },
    {
      id: "spiral-matrix",
      title: "Spiral Matrix",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an m × n matrix, return all its elements in spiral order (clockwise from the top-left).",
      testCases: [
        {
          input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          output: "[1,2,3,6,9,8,7,4,5]",
          matrices: [
            [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          ],
        },
        {
          input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
          output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
        },
      ],
      code: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;

        while (top <= bottom && left <= right) { // O(M × N) total
            for (int j = left; j <= right; j++) res.push_back(matrix[top][j]);
            top++;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res.push_back(matrix[bottom][j]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }

        return res;
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(1)",
      notes: `- Maintain four boundaries; peel top row, right col, bottom row, left col each loop.
- Shrink the matching boundary after traversing each edge.
- Re-check top ≤ bottom and left ≤ right before the bottom/left passes to avoid re-reading a single middle line.`,
    },
    {
      id: "rotate-image",
      title: "Rotate Image",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an n × n matrix representing an image, rotate it 90 degrees clockwise in place.",
      testCases: [
        {
          input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          output: "[[7,4,1],[8,5,2],[9,6,3]]",
          matrices: [
            [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          ],
        },
        {
          input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
          output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
        },
      ],
      code: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();

        // 1. transpose (swap across the main diagonal)
        for (int i = 0; i < n; i++) // O(N)
            for (int j = i + 1; j < n; j++) // O(N)
                swap(matrix[i][j], matrix[j][i]);

        // 2. reverse each row
        for (int i = 0; i < n; i++) // O(N)
            reverse(matrix[i].begin(), matrix[i].end()); // O(N)
    }
};`,
      timeComplexity: "O(N²)",
      spaceComplexity: "O(1)",
      notes: `- 90° clockwise = transpose then reverse each row.
- Transpose only the upper triangle (j > i) so pairs aren't swapped twice.
- Purely in place — no auxiliary matrix needed.`,
    },
    {
      id: "word-search",
      title: "Word Search",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/word-search/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an m × n board of characters and a word, return true if the word can be formed from sequentially adjacent (horizontal or vertical) cells, using each cell at most once.",
      testCases: [
        {
          input:
            'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
          output: "true",
        },
        {
          input:
            'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool dfs(vector<vector<char>>& board, string& word, int i, int j, int k) {
        if (k == word.size()) return true;
        if (i < 0 || j < 0 || i >= board.size() || j >= board[0].size()
            || board[i][j] != word[k]) return false;

        char tmp = board[i][j];
        board[i][j] = '#'; // mark visited to avoid reuse
        bool found = dfs(board, word, i + 1, j, k + 1)
                  || dfs(board, word, i - 1, j, k + 1)
                  || dfs(board, word, i, j + 1, k + 1)
                  || dfs(board, word, i, j - 1, k + 1);
        board[i][j] = tmp; // restore on backtrack

        return found;
    }

    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < board.size(); i++) // O(M)
            for (int j = 0; j < board[0].size(); j++) // O(N)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
};`,
      timeComplexity: "O(M × N × 4^L)",
      spaceComplexity: "O(L)",
      notes: `- DFS from every cell, matching one character of the word per step.
- Mark a cell (e.g. '#') before recursing and restore it on backtrack to enforce no reuse.
- L is the word length; each step branches in ≤ 4 directions → 4^L worst case.`,
    },
  ],
}
