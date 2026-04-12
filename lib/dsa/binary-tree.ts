import { DsaTopic } from "../dsa-data"

export const binaryTree: DsaTopic = {
  topic: "Binary Tree",
  questions: [
    {
      id: "binary-tree-preorder-traversal",
      title: "Binary Tree Preorder Traversal",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-preorder-traversal/",
      question:
        "Given the root of a binary tree, return the preorder traversal of its nodes' values.",
      testCases: [
        {
          input: "root = [1,null,2,3]",
          output: "[1,2,3]",
          explanation: "",
          trees: [[1, null, 2, 3]],
        },
        {
          input: "root = [1,2,3,4,5,null,8,null,null,6,7,9]",
          output: "[1,2,3,4,5,8,6,7,9]",
          explanation: "",
          trees: [[1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    void preorder(TreeNode* root, vector<int> &arr){
        if(root == nullptr){
            return;
        }

        arr.push_back(root->val);
        preorder(root->left, arr);
        preorder(root->right, arr);
    }

    vector<int> preorderTraversal(TreeNode* root) {

        vector<int> arr;

        if(root == NULL){
            return arr;
        }

        preorder(root, arr);

        return arr;
    }
};`,
      codeLineHighlights: [
        { line: 5, tone: "green" },
        { line: 6, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Visit root → recurse left → recurse right (Root, Left, Right).
- Call stack depth equals the tree height H; O(N) worst case on a skewed tree.
- Compare: preorder visits root first; inorder = Left, Root, Right; postorder = Left, Right, Root.`,
      tags: ["striver-a2z"],
    },
    {
      id: "binary-tree-inorder-traversal",
      title: "Binary Tree Inorder Traversal",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      question:
        "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      testCases: [
        {
          input: "root = [1,null,2,3]",
          output: "[1,3,2]",
          explanation: "",
          trees: [[1, null, 2, 3]],
        },
        {
          input: "root = [1,2,3,4,5,null,8,null,null,6,7,9]",
          output: "[1,2,4,5,3,6,7,8,9]",
          explanation: "",
          trees: [[1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:

    void inorder(TreeNode* root, vector<int> &arr){
        if(root == nullptr){
            return;
        }

        inorder(root->left, arr);
        arr.push_back(root->val);
        inorder(root->right, arr);
    }

    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> arr;

        if(root == NULL){
            return arr;
        }

        inorder(root, arr);

        return arr;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Visit left subtree → root → right subtree (Left, Root, Right).
- Inorder of a BST gives nodes in sorted ascending order — useful for BST validation and kth-smallest.
- Same recursive structure as preorder and postorder; just reorder the three operations.`,
      tags: ["striver-a2z"],
    },
    {
      id: "binary-tree-postorder-traversal",
      title: "Binary Tree Postorder Traversal",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      question:
        "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
      testCases: [
        {
          input: "root = [1,null,2,3]",
          output: "[3,2,1]",
          explanation: "",
          trees: [[1, null, 2, 3]],
        },
        {
          input: "root = [1,2,3,4,5,null,8,null,null,6,7,9]",
          output: "[3,2,1]",
          explanation: "",
          trees: [[1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    void postorder(TreeNode* root, vector<int> &arr){
        if(root == nullptr){
            return;
        }

        postorder(root->left, arr);
        postorder(root->right, arr);
        arr.push_back(root->val);
    }

    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> arr;

        if(root == NULL){
            return arr;
        }

        postorder(root, arr);

        return arr;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Visit left subtree → right subtree → root (Left, Right, Root).
- Postorder is natural for bottom-up problems: compute children before parent (e.g., tree height, diameter).
- Used in \`Balanced Binary Tree\`, \`Diameter of Binary Tree\`, \`Binary Tree Maximum Path Sum\`.`,
      tags: ["striver-a2z"],
    },
    {
      id: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      question:
        "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      type: "TREE",
      testCases: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[3],[9,20],[15,7]]",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "root = [1]",
          output: "[[1]]",
          explanation: "",
          trees: [[1]],
        },
        {
          input: "root = []",
          output: "[]",
          explanation: "",
          trees: [[]],
        },
      ],
      code: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if (root == NULL) {
            return ans;
        }

        queue<TreeNode*> q;

        q.push(root);

        while (!q.empty()) { // O(N)
            int n = q.size();
            vector<int> level;
            while (n--) { // O(N) amortized
                TreeNode* node = q.front();
                q.pop(); // O(1)

                if (node->left != NULL) {
                    q.push(node->left); // O(1)
                }

                if (node->right != NULL) {
                    q.push(node->right); // O(1)
                }

                level.push_back(node->val);
            }
            ans.push_back(level);
        }
        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- BFS with a queue; snapshot \`q.size()\` at the start of each iteration to process one level at a time.
- Each node is enqueued and dequeued exactly once → O(N) total.
- Foundation for many BFS variants: zigzag, right-side-view, level averages, etc.`,
      tags: ["striver-a2z"],
    },
    {
      id: "maximum-depth-of-binary-tree",
      title: "Maximum Depth of Binary Tree",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      question:
        "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
      testCases: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "3",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "root = [1,null,2]",
          output: "2",
          explanation: "",
          trees: [[1, null, 2]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if(root==NULL){
            return 0;
        }

        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Recursive post-order: depth of a node = 1 + max(left depth, right depth).
- Base case: NULL node has depth 0.
- Classic divide-and-conquer — the pattern is reused in \`Balanced Binary Tree\` and \`Diameter of Binary Tree\`.`,
      tags: ["striver-a2z"],
    },
    {
      id: "balanced-binary-tree",
      title: "Balanced Binary Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
      question: "Given a binary tree, determine if it is height-balanced.",
      type: "TREE",
      testCases: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "true",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "root = [1,2,2,3,3,null,null,4,4]",
          output: "false",
          explanation: "",
          trees: [[1, 2, 2, 3, 3, null, null, 4, 4]],
        },
        {
          input: "root = []",
          output: "true",
          explanation: "",
        },
      ],
      code: `class Solution {
private:
    int helper(TreeNode* root) {
        if (root == NULL) {
            return 0;
        }

        int lh = helper(root->left);
        int rh = helper(root->right);

        if (lh == -1 || rh == -1 || abs(lh - rh) > 1) {
            return -1;
        }

        return 1 + max(lh, rh);
    }

public:
    bool isBalanced(TreeNode* root) { return helper(root) != -1; }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Use -1 as a sentinel to propagate "unbalanced" up the tree — avoids recomputing heights.
- A naive O(N²) solution calls height() at every node; this post-order DFS is O(N) by doing it in one pass.
- A node is unbalanced if either child returned -1 or the height difference exceeds 1.`,
      tags: ["striver-a2z"],
    },
    {
      id: "diameter-of-binary-tree",
      title: "Diameter of Binary Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
      question:
        "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.",
      testCases: [
        {
          input: "root = [1,2,3,4,5]",
          output: "3",
          explanation: "",
          trees: [[1, 2, 3, 4, 5]],
        },
        {
          input: "root = [1,2]",
          output: "1",
          explanation: "",
          trees: [[1, 2]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int ans = 0;
        helper(root, ans);
        return ans;
    }

    int helper(TreeNode* root, int& ans) {
        if (root == NULL) {
            return 0;
        }

        int lh = helper(root->left, ans);
        int rh = helper(root->right, ans);

        ans = max(ans, lh + rh);

        return 1 + max(lh, rh);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Diameter through a node = left height + right height; track the global max via a reference parameter.
- The helper returns the height (longest path going down), not the diameter.
- Same pattern as \`Binary Tree Maximum Path Sum\` — compute the "through-root" value locally, propagate the "chain" value upward.`,
      tags: ["striver-a2z"],
    },
    {
      id: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      question:
        "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
      testCases: [
        {
          input: "root = [1,2,3]",
          output: "6",
          explanation: "",
          trees: [[1, 2, 3]],
        },
        {
          input: "root = [-10,9,20,null,null,15,7]",
          output: "42",
          explanation: "",
          trees: [[-10, 9, 20, null, null, 15, 7]],
        },
      ],
      code: `class Solution {
public:
    int helper(TreeNode* root, int& ans) {
        if (root == NULL) {
            return 0;
        }

        int left = max(0, helper(root->left, ans));
        int right = max(0, helper(root->right, ans));

        ans = max(ans, left + right + root->val);

        return root->val + max(left, right);
    }

    int maxPathSum(TreeNode* root) {
        int ans = INT_MIN;
        helper(root, ans);
        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Clamp negative child contributions to 0 with \`max(0, ...)\` — a negative branch is never worth including.
- At each node, the "through-root" path = left + root->val + right; update global ans.
- Return only the best single-branch path (root + max(left, right)) for the parent to use.
- Initialize ans to INT_MIN to handle all-negative trees.`,
      tags: ["striver-a2z"],
    },
    {
      id: "same-tree",
      title: "Same Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/same-tree/",
      question:
        "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
      testCases: [
        {
          input: "p = [1,2,3], q = [1,2,3]",
          output: "true",
          explanation: "",
          trees: [
            [1, 2, 3],
            [1, 2, 3],
          ],
        },
        {
          input: "p = [1,2,3], q = [1,2,null,3]",
          output: "false",
          explanation: "",
          trees: [
            [1, 2, 3],
            [1, 2, null, 3],
          ],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (p == NULL || q == NULL) {
            return p == q;
        }

        return p->val == q->val && isSameTree(p->left, q->left) &&
               isSameTree(p->right, q->right);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Simultaneously recurse both trees; if both NULL they match, if only one is NULL they don't.
- Short-circuit evaluation means we stop as soon as a mismatch is found.
- Identical structure to \`Symmetric Tree\` — just change how left/right subtrees are paired.`,
      tags: ["striver-a2z"],
    },
    {
      id: "binary-tree-zigzag-level-order-traversal",
      title: "Binary Tree Zigzag Level Order Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
      question:
        "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).",
      testCases: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[3],[20,9],[15,7]]",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "root = [1]",
          output: "[[1]]",
          explanation: "",
        },
        {
          input: "root = []",
          output: "[]",
          explanation: "",
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if (root == NULL)
            return ans;
        queue<TreeNode*> q;
        q.push(root);

        bool flag = true;

        while (!q.empty()) { // O(N)
            int N = q.size();
            vector<int> level(N);
            for (int i = 0; i < N; i++) { // O(N) amortized
                TreeNode* node = q.front();
                q.pop(); // O(1)
                int val = node->val;
                if (flag) {
                    level[i] = val;
                } else {
                    level[N - i - 1] = val;
                }

                if (node->left)
                    q.push(node->left); // O(1)
                if (node->right)
                    q.push(node->right); // O(1)
            }
            flag = !flag;
            ans.push_back(level);
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- BFS level order with a boolean flag toggled each level to control fill direction.
- Pre-allocate \`level\` vector of size N; write forward (flag=true) or backward (flag=false) by index.
- Avoids reversing the vector — write directly to the correct position using \`level[N-i-1]\`.`,
      tags: ["striver-a2z"],
    },
    {
      id: "vertical-order-traversal-of-a-binary-tree",
      title: "Vertical Order Traversal of a Binary Tree",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      question:
        "Given the root of a binary tree, calculate the vertical order traversal of the binary tree. For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of the tree is at (0, 0). The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values. Return the vertical order traversal of the binary tree.",
      testCases: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[9],[3,15],[20],[7]]",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "root = [1]",
          output: "[[1]]",
          explanation: "",
          trees: [[1]],
        },
        {
          input: "root = []",
          output: "[]",
          explanation: "",
          trees: [[]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        vector<vector<int>> ans;
        if (root == NULL){
            return ans;
        }

        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        map<int, vector<vector<int>>> mp;

        while (!q.empty()) { // O(N)
            int level = 0;
            int N = q.size();

            while (N--) { // O(N) amortized
                auto [node, col] = q.front();
                q.pop(); // O(1)

                mp[col].push_back({col, level, node->val}); // O(log N)

                if (node->left)
                    q.push({node->left, col - 1}); // O(1)
                if (node->right)
                    q.push({node->right, col + 1}); // O(1)
            }

            level++;
        }

        for (auto i : mp) { // O(C) where C = number of columns
            sort(i.second.begin(), i.second.end()); // O(N log N) total
            vector<int> v;
            for (auto j : i.second) {
                v.push_back(j[2]);
            }
            ans.push_back(v);
        }

        return ans;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Assign each node a column index (root=0, left child=col-1, right child=col+1) via BFS.
- Use a \`map<int, ...>\` (ordered by column) so columns are iterated left to right.
- Within each column, nodes at the same (row, col) must be sorted by value — hence the per-column sort.
- Overall O(N log N) due to sorting; O(N) if no same-position ties.`,
      tags: ["striver-a2z"],
    },
    {
      id: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
      question:
        "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
      testCases: [
        {
          input: "root = [1,2,3,null,5,null,4]",
          output: "[1,3,4]",
          explanation: "",
          trees: [[1, 2, 3, null, 5, null, 4]],
        },
        {
          input: "root = [1,2,3,4,null,null,null,5]",
          output: "[1,2,4,5]",
          explanation: "",
          trees: [[1, 2, 3, 4, null, null, null, 5]],
        },
        {
          input: "root = []",
          output: "[]",
          explanation: "",
          trees: [[]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        queue<TreeNode*> q;
        vector<int> result;
        if (root == NULL) {
            return {};
        }
        q.push(root);
        while (!q.empty()) { // O(N)
            int n = q.size();
            TreeNode* node;
            while (n--) { // O(N) amortized
                node = q.front();
                q.pop(); // O(1)
                if (node->left != NULL) {
                    q.push(node->left); // O(1)
                }
                if (node->right != NULL) {
                    q.push(node->right); // O(1)
                }
            }
            result.push_back(node->val);
        }
        return result;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- BFS level order; at the end of processing each level, the last dequeued node is the rightmost.
- No special reversal needed — \`node\` naturally holds the last node after the inner loop.
- For left-side view, collect the first node of each level instead of the last.`,
      tags: ["striver-a2z"],
    },
    {
      id: "symmetric-tree",
      title: "Symmetric Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
      question:
        "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
      type: "TREE",
      testCases: [
        {
          input: "root = [1,2,2,null,3,null,3]",
          output: "true",
          explanation: "",
          trees: [[1, 2, 2, null, 3, null, 3]],
        },
        {
          input: "root = []",
          output: "true",
          explanation: "",
          trees: [[]],
        },
      ],
      code: `class Solution {
public:
    bool helper(TreeNode* left, TreeNode* right) {
        if (left == NULL || right == NULL) {
            return left == right;
        }

        return left->val == right->val && helper(left->right, right->left) &&
               helper(left->left, right->right);
    }

    bool isSymmetric(TreeNode* root) { return helper(root->left, root->right); }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- A tree is symmetric if the left subtree mirrors the right subtree.
- Mirror check: left-outer with right-outer, left-inner with right-inner (cross-pair the children).
- Same structure as \`Same Tree\` but the recursive calls swap left/right for the mirroring.`,
      tags: ["striver-a2z"],
    },
    {
      id: "lowest-common-ancestor-of-a-binary-tree",
      title: "Lowest Common Ancestor of a Binary Tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
      question:
        "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”",
      testCases: [
        {
          input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
          output: "3",
          explanation: "",
          trees: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]],
        },
        {
          input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
          output: "5",
          explanation: "",
          trees: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]],
        },
        {
          input: "root = [1,2], p = 1, q = 2",
          output: "1",
          explanation: "",
          trees: [[1, 2]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(root==NULL || root==p || root==q){
            return root;
        }

        TreeNode* left = lowestCommonAncestor(root->left,p,q);
        TreeNode* right = lowestCommonAncestor(root->right,p,q);

        if(left==NULL){
            return right;
        }else if(right==NULL){
            return left;
        }else{
            return root;
        }
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- If root is NULL, p, or q — return root (base case / found a target).
- If only one side returns non-null, the LCA is in that subtree.
- If both sides return non-null, the current root is the LCA (p and q are in different subtrees).
- Compare with \`LCA of a BST\` which uses BST ordering to avoid searching both subtrees.`,
      tags: ["striver-a2z"],
    },
    {
      id: "maximum-width-of-binary-tree",
      title: "Maximum Width of Binary Tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/maximum-width-of-binary-tree/",
      question:
        "Given the root of a binary tree, return the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels. The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation. It is guaranteed that the answer will in the range of a 32-bit signed integer.",
      testCases: [
        {
          input: "root = [1,3,2,5,3,null,9]",
          output: "4",
          explanation: "",
          trees: [[1, 3, 2, 5, 3, null, 9]],
        },
        {
          input: "root = [1,3,2,5,null,null,9,6,null,7]",
          output: "7",
          explanation: "",
          trees: [[1, 3, 2, 5, null, null, 9, 6, null, 7]],
        },
        {
          input: "root = [1,3,2,5]",
          output: "7",
          explanation: "",
          trees: [[1, 3, 2, 5]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root)
            return 0;
        int maxWidth = 0;

        queue<pair<TreeNode*, int>> q;

        q.push({root, 0});

        while (!q.empty()) { // O(N)
            int size = q.size();
            int minIndex = q.front().second;

            int first = 0;
            int last = 0;

            for (int i = 0; i < size; i++) { // O(N) amortized
                int currIndex = q.front().second - minIndex;
                TreeNode* node = q.front().first;

                q.pop(); // O(1)

                if (i == 0)
                    first = currIndex;
                if (i == size - 1)
                    last = currIndex;

                if (node->left)
                    q.push({node->left, (long long)2 * currIndex + 1}); // O(1)
                if (node->right)
                    q.push({node->right, (long long)2 * currIndex + 2}); // O(1)
            }

            maxWidth = max(maxWidth, last - first + 1);
        }

        return maxWidth;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Assign each node a 1-indexed position: left child = 2*i+1, right child = 2*i+2 (complete binary tree numbering).
- Width of a level = last index - first index + 1 (includes virtual null nodes between endpoints).
- Subtract \`minIndex\` at each level to prevent integer overflow on deep/skewed trees.
- Use \`long long\` for child indices to avoid overflow before the subtraction.`,
      tags: ["striver-a2z"],
    },
    {
      id: "all-nodes-distance-k-in-binary-tree",
      title: "All Nodes Distance K in Binary Tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
      question:
        "Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node. You can return the answer in any order.",
      testCases: [
        {
          input: "root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2",
          output: "[7,4,1]",
          explanation: "",
          trees: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]],
        },
        {
          input: "root = [1], target = 1, k = 3",
          output: "[]",
          explanation: "",
          trees: [[1]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        unordered_map<TreeNode*, TreeNode*> mp;
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) { // O(N)
            int N = q.size();
            while (N--) { // O(N) amortized
                TreeNode* node = q.front();
                q.pop(); // O(1)

                if (node->left) {
                    q.push(node->left); // O(1)
                    mp[node->left] = node; // O(1) avg
                }
                if (node->right) {
                    q.push(node->right); // O(1)
                    mp[node->right] = node; // O(1) avg
                }
            }
        }

        q.push(target);
        map<TreeNode*, bool> visited;
        visited[target] = true; // O(log N)
        while (!q.empty() && k > 0) { // O(N)
            int N = q.size();
            k--;
            while (N--) { // O(N) amortized
                TreeNode* node = q.front();
                q.pop(); // O(1)
                TreeNode* leftNode = node->left;
                TreeNode* rightNode = node->right;
                TreeNode* parentNode = mp[node]; // O(1) avg

                if (leftNode && !visited[leftNode]) { // O(log N)
                    q.push(leftNode); // O(1)
                    visited[leftNode] = true; // O(log N)
                }
                if (rightNode && !visited[rightNode]) { // O(log N)
                    q.push(rightNode); // O(1)
                    visited[rightNode] = true; // O(log N)
                }
                if (parentNode && !visited[parentNode]) { // O(log N)
                    q.push(parentNode); // O(1)
                    visited[parentNode] = true; // O(log N)
                }
            }
        }

        vector<int> ans;
        while (!q.empty()) { // O(N)
            TreeNode* node = q.front();
            q.pop(); // O(1)
            ans.push_back(node->val);
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Two-phase approach: BFS to build a parent map (makes edges bidirectional), then BFS from target for k steps.
- Parent map lets us traverse upward — without it, we can only go down.
- \`visited\` map prevents revisiting nodes; BFS naturally explores all nodes at distance k simultaneously.`,
      tags: ["striver-a2z"],
    },
    {
      id: "count-complete-tree-nodes",
      title: "Count Complete Tree Nodes",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/count-complete-tree-nodes/",
      question:
        "Given the root of a complete binary tree, return the number of the nodes in the tree. According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h. Design an algorithm that runs in less than O(n) time complexity.",
      testCases: [
        {
          input: "root = [1,2,3,4,5,6]",
          output: "6",
          explanation: "",
          trees: [[1, 2, 3, 4, 5, 6]],
        },
        {
          input: "root = []",
          output: "0",
          explanation: "",
          trees: [[]],
        },
        {
          input: "root = [1]",
          output: "1",
          explanation: "",
          trees: [[1]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    int countNodes(TreeNode* root) {
        if (root == NULL)
            return 0;

        int lh = leftHeight(root);
        int rh = rightHeight(root);

        if (lh == rh)
            return (1 << lh) - 1;

        return 1 + countNodes(root->left) + countNodes(root->right);
    }

    int leftHeight(TreeNode* node) {
        int height = 0;

        while (node) { // O(log N)
            node = node->left;
            height++;
        }

        return height;
    }

    int rightHeight(TreeNode* node) {
        int height = 0;

        while (node) { // O(log N)
            node = node->right;
            height++;
        }

        return height;
    }
};`,
      timeComplexity: "O(log² N)",
      spaceComplexity: "O(log N)",
      notes: `- If left height == right height, the subtree is a perfect binary tree with exactly \`2^h - 1\` nodes.
- Otherwise, recurse on both children — but this only happens O(log N) times (at the "incomplete" path).
- Each recursion computes heights in O(log N), giving O(log N × log N) = O(log² N) overall.
- Naive O(N) traversal works but misses the complete-tree property; this beats it for large N.`,
    },
    {
      id: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
      type: "TREE",
      question:
        "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
      testCases: [
        {
          input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
          output: "[3,9,20,null,null,15,7]",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "preorder = [-1], inorder = [-1]",
          output: "[-1]",
          explanation: "",
          trees: [[-1]],
        },
      ],
      code: `class Solution {

private:
    TreeNode* solve(vector<int>& preorder, vector<int>& inorder, int start,
                    int end, int& idx, unordered_map<int, int>& mp) {
        if (start > end) {
            return NULL;
        }

        int rootVal = preorder[idx];

        int i = mp[rootVal];

        idx++;
        TreeNode* root = new TreeNode(rootVal);
        root->left = solve(preorder, inorder, start, i - 1, idx, mp);
        root->right = solve(preorder, inorder, i + 1, end, idx, mp);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int N = inorder.size();
        unordered_map<int, int> mp;

        for (int i = 0; i < N; i++) { // O(N)
            mp[inorder[i]] = i; // O(1) avg
        }

        int idx = 0;

        return solve(preorder, inorder, 0, N - 1, idx, mp);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Preorder[0] is always the root; find it in inorder to split into left/right subtrees.
- Use an \`unordered_map\` for O(1) inorder index lookup — reduces overall time from O(N²) to O(N).
- Recurse with shrinking [start, end] bounds in inorder; advance \`idx\` in preorder each call.`,
      tags: ["striver-a2z"],
    },
    {
      id: "construct-binary-tree-from-inorder-and-postorder-traversal",
      title: "Construct Binary Tree from Inorder and Postorder Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
      question:
        "Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.",
      testCases: [
        {
          input: "inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]",
          output: "[3,9,20,null,null,15,7]",
          explanation: "",
          trees: [[3, 9, 20, null, null, 15, 7]],
        },
        {
          input: "inorder = [-1], postorder = [-1]",
          output: "[-1]",
          explanation: "",
          trees: [[-1]],
        },
      ],
      type: "TREE",
      code: `class Solution {

private:
    TreeNode* build(vector<int>& inorder, vector<int>& postorder, int start,
                    int end, int& idx) {
        if (start > end) {
            return NULL;
        }

        int rootVal = postorder[idx];

        int i = start;
        while (i <= end) { // O(N) per call → O(N²) total
            if (inorder[i] == rootVal) {
                break;
            }
            i++;
        }

        idx--;
        TreeNode* root = new TreeNode(rootVal);
        root->right = build(inorder, postorder, i + 1, end, idx);
        root->left = build(inorder, postorder, start, i - 1, idx);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        int N = inorder.size();
        int idx = N - 1;

        return build(inorder, postorder, 0, N - 1, idx);
    }
};`,
      timeComplexity: "O(N²)",
      spaceComplexity: "O(H)",
      notes: `- Postorder's last element is always the root; iterate from the end of the array.
- Linear scan in inorder to find the root position — O(N) per call, O(N²) overall.
- Optimise to O(N) by using an \`unordered_map\` for inorder lookups (as done in the preorder version).
- Must build right subtree before left because \`idx\` decrements and postorder is [left][right][root].`,
      tags: ["striver-a2z"],
    },
    {
      id: "serialize-and-deserialize-binary-tree",
      title: "Serialize and Deserialize Binary Tree",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
      question:
        "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure. Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.",
      testCases: [
        {
          input: "root = [1,2,3,null,null,4,5]",
          output: "[1,2,3,null,null,4,5]",
          explanation: "",
          trees: [[1, 2, 3, null, null, 4, 5]],
        },
        {
          input: "root = []",
          output: "[]",
          explanation: "",
        },
      ],
      code: `class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root)
            return "";
        string s = "";
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) { // O(N)
            TreeNode* curNode = q.front();
            q.pop(); // O(1)
            if (curNode == nullptr) {
                s += "#,";
            } else {
                s += to_string(curNode->val) + ",";
                q.push(curNode->left); // O(1)
                q.push(curNode->right); // O(1)
            }
        }
        return s;
    }

    TreeNode* deserialize(string data) {
        if (data.empty())
            return nullptr;
        stringstream s(data);
        string str;
        getline(s, str, ',');
        TreeNode* root = new TreeNode(stoi(str));
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) { // O(N)
            TreeNode* node = q.front();
            q.pop(); // O(1)
            getline(s, str, ',');
            if (str != "#") {
                TreeNode* leftNode = new TreeNode(stoi(str));
                node->left = leftNode;
                q.push(leftNode); // O(1)
            }
            getline(s, str, ',');
            if (str != "#") {
                TreeNode* rightNode = new TreeNode(stoi(str));
                node->right = rightNode;
                q.push(rightNode); // O(1)
            }
        }
        return root;
    }
};
`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- BFS serialization with '#' as a null sentinel; comma-delimited for easy parsing with \`getline\`.
- Deserialize by reading tokens in the same BFS order and assigning left/right children from the queue.
- Null nodes are encoded but not enqueued, so the queue only holds actual nodes.
- Level-order format matches LeetCode's own tree serialization.`,
      tags: ["striver-a2z"],
    },
    {
      id: "flatten-binary-tree-to-linked-list",
      title: "Flatten Binary Tree to Linked List",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
      question:
        'Given the root of a binary tree, flatten the tree into a "linked list": The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null. The "linked list" should be in the same order as a pre-order traversal of the binary tree.',
      testCases: [
        {
          input: "root = [1,2,5,3,4,null,6]",
          output: "[1,null,2,null,3,null,4,null,5,null,6]",
          explanation: "",
          trees: [
            [1, 2, 5, 3, 4, null, 6],
            [1, null, 2, null, 3, null, 4, null, 5, null, 6],
          ],
        },
        {
          input: "root = []",
          output: "[]",
          explanation: "",
          trees: [[]],
        },
        {
          input: "root = [0]",
          output: "[0]",
          explanation: "",
          trees: [[0]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    TreeNode* prev = NULL;
    void flatten(TreeNode* root) {
        if(root == NULL){
                return;
        }
        flatten(root->right);
        flatten(root->left);
        root->right = prev;
        root->left = NULL;
        prev = root;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Reverse postorder (right → left → root): build the linked list from back to front using a \`prev\` pointer.
- At each node, set \`right = prev\` and \`left = NULL\`, then advance \`prev = root\`.
- This is the O(H) space recursive approach; an O(1) space iterative approach uses the "Morris" technique.
- The resulting order is preorder (root, left, right) because we process in the reverse of that.`,
      tags: ["striver-a2z"],
    },
  ],
}
