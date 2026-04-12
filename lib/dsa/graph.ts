import { DsaTopic } from "../dsa-data"

export const graph: DsaTopic = {
  topic: "Graph",
  questions: [
    {
      id: "number-of-provinces",
      title: "Number of Provinces",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-provinces/",
      tags: ["striver-a2z"],
      question:
        "There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c. A province is a group of directly or indirectly connected cities and no other cities outside of the group. You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise. Return the total number of provinces.",
      testCases: [
        {
          input: "isConnected = [[1,1,0],[1,1,0],[0,0,1]]",
          output: "2",
          explanation:
            "Cities 0 and 1 are directly connected (one province); city 2 is isolated (second province).",
          graphs: [
            [
              [1, 1, 0],
              [1, 1, 0],
              [0, 0, 1],
            ],
          ],
        },
        {
          input: "isConnected = [[1,0,0],[0,1,0],[0,0,1]]",
          output: "3",
          explanation:
            "No roads between cities; each city is its own province.",
          graphs: [
            [
              [1, 0, 0],
              [0, 1, 0],
              [0, 0, 1],
            ],
          ],
        },
      ],
      code: `class Solution {

private:
    void DFS(int node, vector<vector<int>>& adj, vector<bool>& vis) {
        vis[node] = true;
        for (int i : adj[node]) {
            if (!vis[i]) {
                DFS(i, adj, vis);
            }
        }
    }

public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int N = isConnected.size();
        vector<vector<int>> adj(N);

        for (int i = 0; i < N; i++) { // O(N²)
            for (int j = 0; j < N; j++) {
                if (isConnected[i][j] == 1 && i != j) {
                    adj[i].push_back(j);
                    adj[j].push_back(i);
                }
            }
        }

        int ct = 0;
        vector<bool> vis(N);

        for (int i = 0; i < N; i++) { // O(V + E) total DFS
            if (!vis[i]) {
                ct++;
                DFS(i, adj, vis);
            }
        }

        return ct;
    }
};`,
      timeComplexity: "O(N²)",
      spaceComplexity: "O(N²)",
      notes: `- Convert adjacency matrix to adjacency list, then count connected components via DFS.
- Each unvisited node starts a new component (province); DFS marks all reachable nodes.
- O(N²) to build the list from the matrix; DFS itself is O(V + E).`,
    },
    {
      id: "rotting-oranges",
      title: "Rotting Oranges",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
      tags: ["striver-a2z"],
      question:
        "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
      testCases: [
        {
          input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
          output: "-1",
          explanation:
            "The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.",
          matrices: [
            [
              [2, 1, 1],
              [0, 1, 1],
              [1, 0, 1],
            ],
          ],
        },
        {
          input: "grid = [[0,2]]",
          output: "0",
          explanation:
            "Since there are already no fresh oranges at minute 0, the answer is just 0.",
          matrices: [[[0, 2]]],
        },
      ],
      code: `class Solution {
private:
    bool isValid(int i, int j, int N, int M) {
        return i >= 0 && j >= 0 && i < N && j < M;
    }

public:
    int ROTTEN = 2;
    int FRESH = 1;

    int orangesRotting(vector<vector<int>>& grid) {
        int N = grid.size();
        int M = grid[0].size();

        vector<vector<int>> vis(N, vector<int>(M, 0));

        queue<pair<pair<int, int>, int>> q;

        int freshCount = 0;
        int maxTime = 0;

        for (int i = 0; i < N; i++) { // O(N*M)
            for (int j = 0; j < M; j++) {
                if (grid[i][j] == ROTTEN) {
                    vis[i][j] = ROTTEN;
                    q.push({{i, j}, 0}); // O(1)
                }
                if (grid[i][j] == FRESH) {
                    freshCount++;
                }
            }
        }

        vector<vector<int>> dirs = {{0, 1}, {-1, 0}, {1, 0}, {0, -1}};
        int count = 0;

        while (!q.empty()) { // O(N*M)
            int i = q.front().first.first;
            int j = q.front().first.second;
            int time = q.front().second;

            q.pop();

            count = max(count, time);

            for (auto dir : dirs) {
                int newI = i + dir[0];
                int newJ = j + dir[1];

                if (isValid(newI, newJ, N, M) && grid[newI][newJ] == FRESH &&
                    vis[newI][newJ] != ROTTEN) {
                    q.push({{newI, newJ}, time + 1});
                    freshCount--;
                    vis[newI][newJ] = ROTTEN;
                }
            }
        }

        return freshCount == 0 ? count : -1;
    }
};`,
      timeComplexity: "O(N*M)",
      spaceComplexity: "O(N*M)",
      notes: `- Multi-source BFS: seed the queue with all rotten oranges simultaneously at time 0.
- Each step in BFS represents one minute; track the maximum time seen across all dequeued nodes.
- After BFS, if any fresh oranges remain (freshCount > 0), return -1 (unreachable).
- Storing time in the queue avoids a separate distance array.`,
    },
    {
      id: "flood-fill",
      title: "Flood Fill",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/flood-fill/",
      tags: ["striver-a2z"],
      question:
        "You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc]. To perform a flood fill: Begin with the starting pixel and change its color to color. Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel. Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel. The process stops when there are no more adjacent pixels of the original color to update. Return the modified image after performing the flood fill.",
      testCases: [
        {
          input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
          output: "[[2,2,2],[2,2,0],[2,0,1]]",
          explanation:
            "The starting pixel is already colored with color 2, so no changes are made.",
          matrices: [
            [
              [1, 1, 1],
              [1, 1, 0],
              [1, 0, 1],
            ],
            [
              [2, 2, 2],
              [2, 2, 0],
              [2, 0, 1],
            ],
          ],
        },
        {
          input: "image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0",
          output: "[[0,0,0],[0,0,0]]",
          explanation:
            "The starting pixel is already colored with color 0, so no changes are made.",
          matrices: [
            [
              [0, 0, 0],
              [0, 0, 0],
            ],
            [
              [0, 0, 0],
              [0, 0, 0],
            ],
          ],
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "01-matrix",
      title: "01 Matrix",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/01-matrix/",
      tags: ["striver-a2z"],
      question:
        "Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell. The distance between two cells sharing a common edge is 1.",
      testCases: [
        {
          input: "mat = [[0,0,0],[0,1,0],[0,0,0]]",
          output: "[[0,0,0],[0,1,0],[0,0,0]]",
          explanation:
            "The distance of the nearest 0 for each cell is as follows:",
          matrices: [
            [
              [0, 0, 0],
              [0, 1, 0],
              [0, 0, 0],
            ],
            [
              [0, 0, 0],
              [0, 1, 0],
              [1, 2, 1],
            ],
          ],
        },
        {
          input: "mat = [[0,0,0],[0,1,0],[1,1,1]]",
          output: "[[0,0,0],[0,1,0],[1,2,1]]",
          explanation:
            "The distance of the nearest 0 for each cell is as follows:",
          matrices: [
            [
              [0, 0, 0],
              [0, 1, 0],
              [1, 1, 1],
            ],
            [
              [0, 0, 0],
              [0, 1, 0],
              [1, 2, 1],
            ],
          ],
        },
      ],
      code: `class Solution {
public:
    bool isValid(int x, int y, int maxX, int maxY) {
        return x >= 0 && y >= 0 && x < maxX && y < maxY;
    }

    vector<vector<int>> updateMatrix(vector<vector<int>>& vv) {
        int N = vv.size(), M = vv[0].size();
        vector<vector<int>> ans(N, vector<int>(M, 0));
        queue<pair<pair<int, int>, int>> q;

        for (int i = 0; i < N; i++) { // O(N*M)
            for (int j = 0; j < M; j++) {
                if (vv[i][j] == 0) {
                    q.push({{i, j}, 0}); // O(1)
                }
            }
        }

        vector<vector<int>> dirs = {{0, 1}, {-1, 0}, {1, 0}, {0, -1}};

        while (!q.empty()) { // O(N*M)
            int x = q.front().first.first;
            int y = q.front().first.second;
            int step = q.front().second;

            q.pop();

            for (auto dir : dirs) {
                int newX = x + dir[0];
                int newY = y + dir[1];

                if (isValid(newX, newY, N, M) && ans[newX][newY] == 0 &&
                    vv[newX][newY] != 0) {
                    q.push({{newX, newY}, step + 1});
                    ans[newX][newY] = step + 1;
                }
            }
        }

        return ans;
    }
};`,
      timeComplexity: "O(N*M)",
      spaceComplexity: "O(N*M)",
      notes: `- Multi-source BFS from all 0-cells simultaneously; each cell's distance is its BFS level.
- Using 0-cells as sources (reverse approach) avoids running BFS from every 1-cell individually.
- Track visited cells via the \`ans\` array (non-zero = visited) to avoid a separate visited matrix.`,
    },
    {
      id: "surrounded-regions",
      title: "Surrounded Regions",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
      tags: ["striver-a2z"],
      question:
        "You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded: Connect: A cell is connected to adjacent cells horizontally or vertically. Region: To form a region connect every 'O' cell. Surround: A region is surrounded if none of the 'O' cells in that region are on the edge of the board. Such regions are completely enclosed by 'X' cells. To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.",
      testCases: [
        {
          input:
            "board = [['X','X','X','X'],['X','O','O','X'],['X','X','O','X'],['X','O','X','X']]",
          output:
            "[['X','X','X','X'],['X','X','X','X'],['X','X','X','X'],['X','O','X','X']]",
          explanation:
            "The surrounded regions should be captured, so we need to replace all 'O's with 'X's in-place within the original board.",
          matrices: [
            [
              [1, 1, 1, 1],
              [1, 0, 0, 1],
              [1, 1, 0, 1],
              [1, 0, 1, 1],
            ],
            [
              [1, 1, 1, 1],
              [1, 1, 1, 1],
              [1, 1, 1, 1],
              [1, 0, 1, 1],
            ],
          ],
        },
      ],
      code: `class Solution {

private:
    bool isValid(int i,int j, int N, int M){
        return i>=0 && j>=0 && i<N && j<M;
    }

public:

    void dfs(int i, int j, int N, int M, vector<vector<char>>& board, int markChar, vector<vector<int>> dirs){
        board[i][j] = markChar;

        for(auto dir: dirs){
            int newX = i+dir[0];
            int newY = j+dir[1];

            if(isValid(newX,newY,N,M) && board[newX][newY]=='O'){
                dfs(newX,newY,N,M,board,markChar,dirs);
            }
        }
    }

    void solve(vector<vector<char>>& board) {
        int N = board.size();
        int M = board[0].size();

        vector<vector<int>> dirs = {{1,0},{0,1},{-1,0},{0,-1}};

        for(int i=0;i<N;i++){ // O(N*M) total for all three passes
            for(int j=0;j<M;j++){
                if(i*j==0 || i==N-1 || j==M-1){
                    if(board[i][j]=='O'){
                        dfs(i,j,N,M,board,'B',dirs);
                    }
                }
            }
        }

        for(int i=0;i<N;i++){
            for(int j=0;j<M;j++){
                if(board[i][j]=='O'){
                    dfs(i,j,N,M,board,'X',dirs);
                }
            }
        }

        for(int i=0;i<N;i++){
            for(int j=0;j<M;j++){
                if(board[i][j]=='B'){
                    board[i][j] = 'O';
                }
            }
        }


    }
};`,
      timeComplexity: "O(N*M)",
      spaceComplexity: "O(N*M)",
      notes: `- Key insight: only 'O' cells connected to the border can escape — mark those with 'B' first.
- DFS from every border 'O' to mark all border-connected 'O's as 'B' (safe).
- Remaining 'O' cells are surrounded — flip to 'X'; then restore 'B' back to 'O'.`,
    },
    {
      id: "number-of-enclaves",
      title: "Number of Enclaves",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-enclaves/",
      tags: ["striver-a2z"],
      question:
        "You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell. A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid. Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.",
      testCases: [
        {
          input: "grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]",
          output: "3",
          explanation:
            "The land cells that cannot walk off the boundary of the grid are the ones that are surrounded by sea cells.",
          matrices: [
            [
              [0, 0, 0, 0],
              [1, 0, 1, 0],
              [0, 1, 1, 0],
              [0, 0, 0, 0],
            ],
          ],
        },
        {
          input: "grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]",
          output: "0",
          explanation:
            "The land cells that cannot walk off the boundary of the grid are the ones that are surrounded by sea cells.",
          matrices: [
            [
              [0, 1, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 0, 0],
            ],
          ],
        },
      ],
      code: `class Solution {

private:
    bool isValid(int i, int j, int N, int M) {
        return i >= 0 && j >= 0 && i < N && j < M;
    }

    void dfs(int i, int j, vector<vector<int>>& grid, vector<vector<int>>& dirs,
             int make, int N, int M, int& ct) {
        grid[i][j] = make;

        for (auto dir : dirs) {
            int newI = i + dir[0];
            int newJ = j + dir[1];

            if (isValid(newI, newJ, N, M) && grid[newI][newJ] == 1) {
                ct++;
                dfs(newI, newJ, grid, dirs, make, N, M, ct);
            }
        }
    }

public:
    int numEnclaves(vector<vector<int>>& grid) {
        int N = grid.size();
        int M = grid[0].size();

        int enclaves = 0;

        vector<vector<int>> dirs = {{1, 0}, {0, -1}, {-1, 0}, {0, 1}};

        for (int i = 0; i < N; i++) { // O(N*M) total for both passes
            for (int j = 0; j < M; j++) {
                if (i * j == 0 || i == N - 1 || j == M - 1) {
                    if (grid[i][j] == 1) {
                        int ct = 0;
                        dfs(i, j, grid, dirs, -1, N, M, ct);
                    }
                }
            }
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (grid[i][j] == 1) {
                    int ct = 1;
                    dfs(i, j, grid, dirs, 2, N, M, ct);
                    enclaves += ct;
                }
            }
        }

        return enclaves;
    }
};`,
      timeComplexity: "O(N*M)",
      spaceComplexity: "O(N*M)",
      notes: `- Same border-marking pattern as \`Surrounded Regions\`: DFS from boundary land cells to exclude them.
- Mark boundary-connected land cells as -1 (ineligible), then count remaining 1-cells as enclaves.
- The DFS counter tracks the size of each component so enclaves can be summed in one pass.`,
    },
    {
      id: "word-ladder",
      title: "Word Ladder",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
      tags: ["striver-a2z"],
      question:
        "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. sk == endWord Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
      testCases: [
        {
          input:
            'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
          output: "5",
          explanation:
            'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.',
        },
        {
          input:
            'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
          output: "0",
          explanation:
            'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.',
        },
      ],
      code: `class Solution {
public:
    int ladderLength(string beginWord, string endWord,
                     vector<string>& wordList) {
        unordered_set<string> st(wordList.begin(), wordList.end()); // O(N*M)

        if (!st.count(endWord)) // O(1) avg
            return 0;

        queue<pair<string, int>> q;
        q.push({beginWord, 0}); // O(1)
        st.erase(beginWord); // O(1) avg

        while (!q.empty()) { // O(N*M*26)
            auto top = q.front();
            q.pop();
            string curr = top.first;
            int steps = top.second;

            if (curr == endWord)
                return steps + 1;

            for (int i = 0; i < curr.size(); i++) { // O(M) where M = word length
                char original = curr[i];
                for (char k = 'a'; k <= 'z'; k++) { // O(26)
                    curr[i] = k;
                    if (st.count(curr)) { // O(M) avg for hash
                        q.push({curr, steps + 1}); // O(1)
                        st.erase(curr); // O(M) avg
                    }
                }
                curr[i] = original;
            }
        }

        return 0;
    }
};`,
      timeComplexity: "O(N*M*26)",
      spaceComplexity: "O(N*M)",
      notes: `- BFS finds the shortest transformation path by exploring all 1-letter mutations level by level.
- Use an \`unordered_set\` for O(1) avg word lookup; erase words once enqueued to prevent revisiting.
- Try all 26 chars at each position — the first time \`endWord\` is dequeued, return \`steps + 1\`.
- N = wordList size, M = word length; total O(N * M * 26).`,
    },
    {
      id: "word-ladder-ii",
      title: "Word Ladder II",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-ladder-ii/",
      tags: ["striver-a2z"],
      question:
        "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. sk == endWord Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].",
      testCases: [
        {
          input:
            'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
          output:
            '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]',
          explanation:
            'There are 2 shortest transformation sequences:\n"hit" -> "hot" -> "dot" -> "dog" -> "cog"\n"hit" -> "hot" -> "lot" -> "log" -> "cog"',
        },
        {
          input:
            'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
          output: "[]",
          explanation:
            'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.',
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "number-of-islands",
      title: "Number of Islands",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
      tags: ["striver-a2z"],
      question:
        "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
      testCases: [
        {
          input:
            'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
          output: "1",
          explanation: "",
          matrices: [
            [
              [1, 1, 1, 1, 0],
              [1, 1, 0, 1, 0],
              [1, 1, 0, 0, 0],
              [0, 0, 0, 0, 0],
            ],
          ],
        },
        {
          input:
            'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
          output: "3",
          explanation: "",
          matrices: [
            [
              [1, 1, 0, 0, 0],
              [1, 1, 0, 0, 0],
              [0, 0, 1, 0, 0],
              [0, 0, 0, 1, 1],
            ],
          ],
        },
      ],
      code: `class Solution {
public:
    bool isValid(int i, int j, int n, int m, vector<vector<char>>& vv) {
        if (i >= 0 && i < n && j >= 0 && j < m && vv[i][j] == '1') {
            return true;
        }
        return false;
    }

    void dfs(int i, int j, int n, int m, vector<vector<char>>& vv) {
        vv[i][j] = '0';

        int vx[4] = {1, -1, 0, 0};
        int vy[4] = {0, 0, 1, -1};

        for (int k = 0; k < 4; k++) {
            int nx = i + vx[k];
            int ny = j + vy[k];

            if (isValid(nx, ny, n, m, vv)) {
                dfs(nx, ny, n, m, vv);
            }
        }
    }

    int numIslands(vector<vector<char>>& vv) {
        int n = vv.size();
        int m = vv[0].size();

        int ans = 0;
        for (int i = 0; i < n; i++) { // O(N*M) total
            for (int j = 0; j < m; j++) {
                if (vv[i][j] == '1') {
                    ans++;
                    dfs(i, j, n, m, vv);
                }
            }
        }

        return ans;
    }
};`,
      timeComplexity: "O(N*M)",
      spaceComplexity: "O(N*M)",
      notes: `- DFS flood fill: when a '1' is found, increment count and DFS to mark the entire island as '0'.
- Marking cells '0' in-place avoids a separate visited array.
- Each cell is visited at most twice (once in the scan, once by DFS) → O(N*M) total.`,
    },
    {
      id: "is-graph-bipartite",
      title: "Is Graph Bipartite?",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/is-graph-bipartite/",
      tags: ["striver-a2z"],
      question:
        "There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. More formally, for each v in graph[u], there is an undirected edge between node u and node v. The graph has the following properties: There are no self-edges (graph[u] does not contain u). There are no parallel edges (graph[u] does not contain duplicate values). If v is in graph[u], then u is in graph[v] (the graph is undirected). The graph may not be connected, meaning there may be two nodes u and v such that there is no path between them. A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B. Return true if and only if it is bipartite.",
      testCases: [
        {
          input: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
          output: "true",
          explanation:
            "The graph is bipartite because it can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.",
          graphs: [
            [
              [1, 2, 3],
              [0, 2],
              [0, 1, 3],
              [0, 2],
            ],
          ],
        },
        {
          input: "graph = [[1,3],[0,2],[1,3],[0,2]]",
          output: "false",
          explanation:
            "The graph is not bipartite because it cannot be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.",
          graphs: [
            [
              [1, 3],
              [0, 2],
              [1, 3],
              [0, 2],
            ],
          ],
        },
      ],
      code: `class Solution {

private:
    bool dfs(vector<vector<int>>& graph, vector<int>& colored, int start,
             int color) {
        colored[start] = color;

        for (int i : graph[start]) { // O(V + E) total across all calls
            if (colored[i] == -1) {
                bool result = dfs(graph, colored, i, (color ^ 1));
                if (!result)
                    return false;
            } else {
                if (colored[i] == colored[start]) {
                    return false;
                }
            }
        }

        return true;
    }

public:
    bool isBipartite(vector<vector<int>>& graph) {
        int N = graph.size();
        vector<int> colored(N, -1);

        for (int i = 0; i < N; i++) {
            if (colored[i] == -1) {
                bool result = dfs(graph, colored, i, 0);
                if (!result)
                    return false;
            }
        }

        return true;
    }
};`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      notes: `- 2-color the graph using DFS; a graph is bipartite iff it has no odd-length cycles.
- Use XOR (\`color ^ 1\`) to alternate between colors 0 and 1 as you go deeper.
- If a neighbor already has the same color as the current node, the graph is not bipartite.
- Run DFS from every unvisited node to handle disconnected graphs.`,
    },
    {
      id: "course-schedule",
      title: "Course Schedule",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      tags: ["striver-a2z"],
      question:
        "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return true if you can finish all courses. Otherwise, return false.",
      testCases: [
        {
          input: "numCourses = 2, prerequisites = [[1,0]]",
          output: "true",
          explanation:
            "There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.",
        },
        {
          input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
          output: "false",
          explanation:
            "There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.",
        },
      ],
      code: `class Solution {
public:
    bool canFinish(int V, vector<vector<int>>& vv) {
        vector<vector<int>> adj(V);
        vector<int> inDegree(V);
        for (auto i : vv) {
            int a = i[0];
            int b = i[1];

            adj[b].push_back(a);
            inDegree[a]++;
        }

        queue<int> q;
        for (int i = 0; i < V; i++) { // O(V)
            if (inDegree[i] == 0) {
                q.push(i); // O(1)
            }
        }

        int ct = 0;
        while (!q.empty()) { // O(V + E)
            int x = q.front();
            q.pop(); // O(1)
            ct++;

            for (int i : adj[x]) {
                inDegree[i]--;
                if (inDegree[i] == 0) {
                    q.push(i); // O(1)
                }
            }
        }

        return ct == V;
    }
};`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      notes: `- Kahn's algorithm (BFS topological sort): a cycle exists iff not all nodes are processed.
- Nodes with in-degree 0 are "ready" — no prerequisites. Process them first.
- Each processed node reduces neighbors' in-degrees; when a neighbor hits 0, enqueue it.
- If the processed count < V, at least one cycle remains → return false.`,
    },
    {
      id: "course-schedule-ii",
      title: "Course Schedule II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
      tags: ["striver-a2z"],
      question:
        "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
      testCases: [
        {
          input: "numCourses = 2, prerequisites = [[1,0]]",
          output: "[0,1]",
          explanation:
            "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].",
        },
        {
          input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
          output: "[0,2,1,3]",
          explanation:
            "There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.\nSo one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].",
        },
        {
          input: "numCourses = 1, prerequisites = []",
          output: "[0]",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    vector<int> findOrder(int V, vector<vector<int>>& vv) {
        vector<vector<int>> adj(V);
        vector<int> inDegree(V);

        for (auto i : vv) {
            int a = i[0];
            int b = i[1];
            adj[b].push_back(a);
            inDegree[a]++;
        }

        queue<int> q;
        for (int i = 0; i < V; i++) { // O(V)
            if (inDegree[i] == 0) {
                q.push(i); // O(1)
            }
        }

        vector<int> topo;
        while (!q.empty()) { // O(V + E)
            int node = q.front();
            q.pop(); // O(1)
            topo.push_back(node);
            for (int i : adj[node]) {
                inDegree[i]--;
                if (inDegree[i] == 0) {
                    q.push(i); // O(1)
                }
            }
        }

        if (topo.size() != V) {
            return {};
        } else {
            return topo;
        }
    }
};`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      notes: `- Same Kahn's topological sort as \`Course Schedule\` — just collect the topo order instead of counting.
- The resulting \`topo\` vector is a valid course ordering; if its size < V, a cycle exists → return [].
- Reversing prerequisites (b → a from [a, b]) naturally models "b must come before a".`,
    },
    {
      id: "find-eventual-safe-states",
      title: "Find Eventual Safe States",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/find-eventual-safe-states/",
      tags: ["striver-a2z"],
      question:
        "There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i]. A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node). Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.",
      testCases: [
        {
          input: "graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]",
          output: "[4]",
          explanation:
            "Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.",
          graphs: [[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]],
          graphsDirected: true,
        },
      ],
      code: `class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int V = graph.size();
        vector<vector<int>> adj(V);
        vector<int> inDegree(V, 0);
        for (int i = 0; i < V; i++) { // O(V + E)
            for (int it : graph[i]) {
                adj[it].push_back(i);
                inDegree[i]++;
            }
        }

        queue<int> q;
        for (int i = 0; i < V; i++) { // O(V)
            if (!inDegree[i]) {
                q.push(i); // O(1)
            }
        }

        vector<int> safeNodes;
        while (!q.empty()) { // O(V + E)
            int x = q.front();
            q.pop(); // O(1)
            safeNodes.push_back(x);

            for (int i : adj[x]) {
                inDegree[i]--;
                if (inDegree[i] == 0) {
                    q.push(i); // O(1)
                }
            }
        }

        sort(safeNodes.begin(), safeNodes.end()); // O(V log V)

        return safeNodes;
    }
};`,
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
      notes: `- Safe nodes are those not part of any cycle (all paths lead to a terminal node).
- Reverse the graph edges; terminal nodes become sources (in-degree 0) in the reversed graph.
- Run Kahn's topo sort on the reversed graph: nodes that get processed are safe.
- Sort the result since the answer must be in ascending order.`,
    },
    {
      id: "alien-dictionary",
      title: "Alien Dictionary",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
      tags: ["striver-a2z"],
      question: "",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "shortest-path-in-binary-matrix",
      title: "Shortest Path in Binary Matrix",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      tags: ["striver-a2z"],
      question:
        "Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1. A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that: All the visited cells of the path are 0. All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner). The length of a clear path is the number of visited cells of this path.",
      testCases: [
        {
          input: "grid = [[0,1],[1,0]]",
          output: "2",
          explanation: "The shortest clear path is [0,1,2,3,4].",
          matrices: [
            [
              [0, 1],
              [1, 0],
            ],
          ],
        },
        {
          input: "grid = [[0,0,0],[1,1,0],[1,1,0]]",
          output: "4",
          matrices: [
            [
              [0, 0, 0],
              [1, 1, 0],
              [1, 1, 0],
            ],
          ],
        },
        {
          input: "grid = [[1,0,0],[1,1,0],[1,1,0]]",
          output: "-1",
          explanation: "",
          matrices: [
            [
              [1, 0, 0],
              [1, 1, 0],
              [1, 1, 0],
            ],
          ],
        },
      ],
      code: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {

        int A = 0;
        int B = 0;

        int X = grid.size() - 1;
        int Y = grid.size() - 1;

        if (grid[0][0] == 1 || grid[X][Y] == 1)
            return -1;

        if (A == X && B == Y)
            return 1;

        queue<pair<int, pair<int, int>>> q;
        vector<vector<int>> dis(X + 1, vector<int>(Y + 1, INT_MAX));

        q.push({1, {A, B}});
        dis[A][B] = 1;

        vector<pair<int, int>> dir = {{0, 1},   {1, 0}, {-1, 0}, {0, -1},
                                      {-1, -1}, {1, 1}, {-1, 1}, {1, -1}};

        while (!q.empty()) { // O(N²)
            auto node = q.front();
            int dist = node.first;
            int currX = node.second.first;
            int currY = node.second.second;
            q.pop(); // O(1)
            for (auto [i, j] : dir) { // O(8)
                int newX = currX + i;
                int newY = currY + j;

                if (newX >= 0 && newY >= 0 && newX <= X && newY <= Y &&
                    grid[newX][newY] == 0 && dist + 1 < dis[newX][newY]) {
                    dis[newX][newY] = dist + 1;
                    if (newX == X && newY == Y) {
                        return dist + 1;
                    }
                    q.push({dist + 1, {newX, newY}});
                }
            }
        }

        return -1;
    }
};`,
      timeComplexity: "O(N²)",
      spaceComplexity: "O(N²)",
      notes: `- BFS on an N×N grid with 8-directional movement; BFS guarantees shortest path in unweighted grids.
- Use a distance array to avoid revisiting cells with worse-or-equal cost.
- Start from (0,0) with distance 1; return early when (N-1,N-1) is first reached.
- Special cases: if start or end cell is 1, return -1 immediately.`,
    },
    {
      id: "path-with-minimum-effort",
      title: "Path With Minimum Effort",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/path-with-minimum-effort/",
      tags: ["striver-a2z"],
      question:
        "You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort. A route's effort is the maximum absolute difference in heights between two consecutive cells of the route. Return the minimum effort required to travel from the top-left cell to the bottom-right cell.",
      testCases: [
        {
          input: "heights = [[1,2,2],[3,8,2],[5,3,5]]",
          output: "2",
          explanation:
            "The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.\nThis is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.",
          matrices: [
            [
              [1, 2, 2],
              [3, 8, 2],
              [5, 3, 5],
            ],
          ],
        },
        {
          input: "heights = [[1,2,3],[3,8,4],[5,3,5]]",
          output: "1",
          explanation:
            "The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].",
          matrices: [
            [
              [1, 2, 3],
              [3, 8, 4],
              [5, 3, 5],
            ],
          ],
        },
        {
          input:
            "heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]",
          output: "1",
          matrices: [
            [
              [1, 2, 1, 1, 1],
              [1, 2, 1, 2, 1],
              [1, 2, 1, 2, 1],
              [1, 2, 1, 2, 1],
              [1, 1, 1, 2, 1],
            ],
          ],
        },
      ],
      code: `
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int A = 0;
        int B = 0;
        int N = heights.size();
        int M = heights[0].size();

        int X = N - 1;
        int Y = M - 1;

        priority_queue<pair<int, pair<int, int>>,
                       vector<pair<int, pair<int, int>>>,
                       greater<pair<int, pair<int, int>>>>
            pq;
        vector<vector<int>> dis(N, vector<int>(M, INT_MAX));

        pq.push({0, {A, B}});
        dis[A][B] = 0;

        vector<pair<int, int>> dir = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};

        while (!pq.empty()) { // O(N*M * log(N*M))
            auto node = pq.top();
            int dist = node.first;
            int x = node.second.first;
            int y = node.second.second;
            pq.pop(); // O(log(N*M))

            for (auto [dx, dy] : dir) { // O(4)
                int nx = x + dx;
                int ny = y + dy;

                if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
                    int newDist =
                        max(dist, abs(heights[x][y] - heights[nx][ny]));

                    if (newDist < dis[nx][ny]) {
                        dis[nx][ny] = newDist;
                        pq.push({newDist, {nx, ny}});
                    }
                }
            }
        }

        return dis[X][Y];
    }
};`,
      timeComplexity: "O(N*M * log(N*M))",
      spaceComplexity: "O(N*M)",
      notes: `- Dijkstra on a grid: minimize the maximum absolute height difference along the path.
- Edge weight = \`max(current_effort, abs(heights[curr] - heights[next]))\` — bottleneck minimization.
- Min-heap orders cells by effort; only update and push if new effort < stored distance.
- Contrast with \`Shortest Path in Binary Matrix\` (unweighted BFS) vs this weighted Dijkstra.`,
    },
    {
      id: "cheapest-flights-within-k-stops",
      title: "Cheapest Flights Within K Stops",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      tags: ["striver-a2z"],
      question:
        "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.",
      testCases: [
        {
          input:
            "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
          output: "700",
          explanation:
            "The graph is shown above. The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700. Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.",
          graphs: [
            [
              [0, 1, 100],
              [1, 2, 100],
              [2, 0, 100],
              [1, 3, 600],
              [2, 3, 200],
            ],
          ],
          graphsDirected: true,
          graphsAsEdgeList: true,
        },
        {
          input:
            "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
          output: "200",
          explanation:
            "The graph is shown above. The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.",
          graphs: [
            [
              [0, 1, 100],
              [1, 2, 100],
              [0, 2, 500],
            ],
          ],
          graphsDirected: true,
          graphsAsEdgeList: true,
        },
        {
          input:
            "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0",
          output: "500",
          explanation:
            "The graph is shown above. The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.",
          graphs: [
            [
              [0, 1, 100],
              [1, 2, 100],
              [0, 2, 500],
            ],
          ],
          graphsDirected: true,
          graphsAsEdgeList: true,
        },
      ],
      code: `
#define NODE pair<int, pair<int, int>>

class Solution {
public:
    int findCheapestPrice(int N, vector<vector<int>>& v, int A, int B, int K) {
        priority_queue<NODE, vector<NODE>, greater<NODE>> pq;
        vector<int> dis(N, INT_MAX);

        vector<vector<pair<int, int>>> adj(N);
        for (auto i : v) {
            adj[i[0]].push_back({i[2], i[1]});
        }

        pq.push({0, {A, 0}});
        dis[A] = 0;

        while (!pq.empty()) { // O(V + E*K)
            auto [stops, it] = pq.top();
            auto [node, cost] = it;
            pq.pop(); // O(log(V*K))
            if (stops > K)
                continue;
            for (auto [curr, dist] : adj[node]) { // O(E) total
                if (cost + dist < dis[curr] && stops <= K) {
                    dis[curr] = cost + dist;
                    pq.push({stops + 1, {curr, cost + dist}});
                }
            }
        }

        if (dis[B] == INT_MAX)
            return -1;
        return dis[B];
    }
};`,
      timeComplexity: "O(V + E*K)",
      spaceComplexity: "O(V)",
      notes: `- Modified Dijkstra where state = (stops, node, cost); the heap is ordered by stops, not cost.
- Prune states with stops > K; the first time we reach dst within K stops is optimal.
- Unlike standard Dijkstra, we don't skip a node on revisit — a path with fewer stops but higher cost may still yield cheaper future paths within the stop limit.`,
    },
    {
      id: "network-delay-time",
      title: "Network Delay Time",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      tags: ["striver-a2z"],
      question:
        "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.",
      testCases: [
        {
          input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
          output: "2",
          explanation:
            "The graph is shown above. The optimal path from node 2 to node 4 is marked in red and has cost 1 + 1 = 2.",
          graphs: [
            [
              [2, 1, 1],
              [2, 3, 1],
              [3, 4, 1],
            ],
          ],
          graphsDirected: true,
          graphsAsEdgeList: true,
        },
        {
          input: "times = [[1,2,1]], n = 2, k = 1",
          output: "1",
          explanation: "",
        },
        {
          input: "times = [[1,2,1]], n = 2, k = 2",
          output: "-1",
          explanation: "",
        },
      ],
      code: `#define NODE pair<int, int>

class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {

        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto i : times) {
            int u = i[0], v = i[1], w = i[2];
            adj[u].push_back({v, w});
        }

        priority_queue<NODE, vector<NODE>, greater<NODE>> pq;
        vector<int> dis(n + 1, INT_MAX);

        pq.push({0, k});
        dis[k] = 0;

        while (!pq.empty()) { // O((V + E) log V)
            auto [time, node] = pq.top();
            pq.pop(); // O(log V)

            for (auto [newNode, newTime] : adj[node]) { // O(E) total
                if (newTime + time < dis[newNode]) {
                    dis[newNode] = newTime + time;
                    pq.push({newTime + time, newNode}); // O(log V)
                }
            }
        }

        int ans = *max_element(dis.begin() + 1, dis.end());
        return ans == INT_MAX ? -1 : ans;
    }
};`,
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V + E)",
      notes: `- Standard Dijkstra from source k; \`dis[i]\` = shortest time to reach node i.
- Answer = max of all \`dis[1..n]\`; if any is INT_MAX, return -1 (unreachable).
- Note: nodes are 1-indexed so \`dis\` has size n+1; skip index 0.`,
    },
    {
      id: "number-of-ways-to-arrive-at-destination",
      title: "Number of Ways to Arrive at Destination",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
      tags: ["striver-a2z"],
      question:
        "You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections. You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time. Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.",
      testCases: [
        {
          input:
            "n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]",
          output: "2",
          explanation:
            "The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes. The four ways to get there in 7 minutes are: - 0 ➝ 6, - 0 ➝ 4 ➝ 6, - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6, - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6",
          graphs: [
            [
              [0, 6, 7],
              [0, 1, 2],
              [1, 2, 3],
              [1, 3, 3],
              [6, 3, 3],
              [3, 5, 1],
              [6, 5, 1],
              [2, 5, 1],
              [0, 4, 5],
              [4, 6, 2],
            ],
          ],
          graphsDirected: true,
          graphsAsEdgeList: true,
        },
        {
          input: "n = 2, roads = [[1,0,10]]",
          output: "1",
          explanation:
            "There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.",
        },
      ],
      code: `#define NODE pair<long long, long long>

int START = 0;
int END;

int MOD = (int)(1e9 + 7);

class Solution {
public:
    int countPaths(int N, vector<vector<int>>& vv) {

        END = N - 1;

        vector<vector<pair<int, int>>> adj(N);
        for (auto i : vv) {
            int u = i[0], v = i[1], w = i[2];
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }

        priority_queue<NODE, vector<NODE>, greater<NODE>> pq;
        vector<long long> dis(N, LLONG_MAX);
        vector<long long> ways(N, 0);

        pq.push({0, START});
        dis[START] = 0;
        ways[START] = 1;

        while (!pq.empty()) { // O((V + E) log V)
            auto [wt, node] = pq.top();
            pq.pop(); // O(log V)
            for (auto [currNode, currWt] : adj[node]) { // O(E) total
                long long newDist = currWt + wt;
                if (newDist < dis[currNode]) {
                    dis[currNode] = currWt + wt;
                    pq.push({dis[currNode], currNode});
                    ways[currNode] = ways[node];
                } else if (currWt + wt == dis[currNode]) {
                    ways[currNode] = (ways[currNode] + ways[node]) % MOD;
                }
            }
        }

        return ways[END] % MOD;
    }
};`,
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V + E)",
      notes: `- Dijkstra augmented with a \`ways\` array counting shortest paths to each node.
- When a strictly shorter path is found: update \`dis\` and copy \`ways[node]\` to \`ways[currNode]\`.
- When an equal-length path is found: add \`ways[node]\` to \`ways[currNode]\` (modulo 1e9+7).
- Use \`long long\` for distances to prevent overflow with large weights.`,
    },
    {
      id: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
      title:
        "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
      tags: ["striver-a2z"],
      question:
        "There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold. Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number. Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.",
      testCases: [
        {
          input:
            "n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4",
          output: "3",
          explanation:
            "The figure above describes the graph. \nThe neighboring cities at a distanceThreshold = 4 for each city are:\nCity 0 -> [City 1, City 2] \nCity 1 -> [City 0, City 2, City 3] \nCity 2 -> [City 0, City 1, City 3] \nCity 3 -> [City 1, City 2] \nCities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.",
        },
        {
          input:
            "n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2",
          output: "0",
          explanation:
            "The figure above describes the graph. \nThe neighboring cities at a distanceThreshold = 2 for each city are:\nCity 0 -> [City 1] \nCity 1 -> [City 0, City 4] \nCity 2 -> [City 3, City 4] \nCity 3 -> [City 2, City 4]\nCity 4 -> [City 1, City 2, City 3] \nThe city 0 has 1 neighboring city at a distanceThreshold = 2.",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
  ],
}
