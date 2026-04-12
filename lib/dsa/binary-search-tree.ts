import { DsaTopic } from "../dsa-data"

export const binarySearchTree: DsaTopic = {
  topic: "Binary Search Tree",
  questions: [
    {
      id: "search-in-a-binary-search-tree",
      title: "Search in a Binary Search Tree",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/search-in-a-binary-search-tree/",
      tags: ["striver-a2z"],
      question:
        "You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.",
      testCases: [
        {
          input: "root = [4,2,7,1,3], val = 2",
          output: "[2,1,3]",
          explanation: "",
          trees: [[4, 2, 7, 1, 3]],
        },
        {
          input: "root = [4,2,7,1,3], val = 5",
          output: "null",
          explanation: "",
          trees: [[4, 2, 7, 1, 3]],
        },
      ],
      code: `class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root != NULL && root->val != val) { // O(H)
            root = root->val > val ? root->left : root->right;
        }
        return root;
    }
};`,
      type: "TREE",
      timeComplexity: "O(H)",
      spaceComplexity: "O(1)",
      notes: `- Iteratively exploit the BST invariant: go left if val < root, right if val > root.
- Terminates when root is NULL (not found) or root->val == val (found).
- O(H) where H = log N on a balanced BST, O(N) worst case on a skewed tree.`,
    },
    {
      id: "insert-into-a-binary-search-tree",
      title: "Insert into a Binary Search Tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
      tags: ["striver-a2z"],
      question:
        "You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST. Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.",
      testCases: [
        {
          input: "root = [40,20,60,10,30,50,70], val = 25",
          output: "[40,20,60,10,30,50,70,null,null,25]",
          explanation: "",
          trees: [
            [40, 20, 60, 10, 30, 50, 70],
            [40, 20, 60, 10, 30, 50, 70, null, null, 25],
          ],
        },
        {
          input: "root = [4,2,7,1,3,null,null,null,null,null,null], val = 5",
          output: "[4,2,7,1,3,5]",
          explanation: "",
          trees: [
            [4, 2, 7, 1, 3, null, null, null, null, null, null],
            [4, 2, 7, 1, 3, 5],
          ],
        },
      ],
      code: `class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (root == NULL) {
            return new TreeNode(val);
        }

        TreeNode* curr = root;

        while (true) { // O(H)
            int rootVal = curr->val;
            if (rootVal < val) {
                if (curr->right == NULL) {
                    curr->right = new TreeNode(val);
                    break;
                } else {
                    curr = curr->right;
                }
            } else {
                if (curr->left == NULL) {
                    curr->left = new TreeNode(val);
                    break;
                } else {
                    curr = curr->left;
                }
            }
        }

        return root;
    }
};`,
      type: "TREE",
      timeComplexity: "O(H)",
      spaceComplexity: "O(1)",
      notes: `- Always insert a new node as a leaf — BST structure ensures correct position.
- Traverse left/right following BST invariant until an empty slot is found.
- O(H) time: log N balanced, N worst case (skewed tree).`,
    },
    {
      id: "delete-node-in-a-bst",
      title: "Delete Node in a BST",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/delete-node-in-a-bst/",
      tags: ["striver-a2z"],
      question:
        "Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST. Basically, the deletion can be divided into two stages: Search for a node to remove. If the node is found, delete the node.",
      testCases: [
        {
          input: "root = [5,3,6,2,4,null,7], key = 3",
          output: "[5,4,6,2,null,null,7]",
          explanation: "",
          trees: [
            [5, 3, 6, 2, 4, null, 7],
            [5, 4, 6, 2, null, null, 7],
          ],
        },
        {
          input: "root = [5,3,6,2,4,null,7], key = 0",
          output: "[5,3,6,2,4,null,7]",
          explanation: "",
          trees: [
            [5, 3, 6, 2, 4, null, 7],
            [5, 3, 6, 2, 4, null, 7],
          ],
        },
        {
          input: "root = [], key = 0",
          output: "[]",
          explanation: "",
          trees: [[]],
        },
      ],
      code: `class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (root == NULL)
            return root;
        int val = root->val;
        if (key < val) {
            root->left = deleteNode(root->left, key);
        } else if (key > val) {
            root->right = deleteNode(root->right, key);
        } else {
            if (root->left == NULL && root->right == NULL) {
                return NULL;
            }

            if (root->left == NULL) {
                return root->right;
            }

            if (root->right == NULL) {
                return root->left;
            }

            TreeNode* temp = root->left;
            while (temp->right != NULL) // O(H)
                temp = temp->right;
            root->val = temp->val;
            root->left = deleteNode(root->left, temp->val);
        }

        return root;
    }
};`,
      timeComplexity: "O(H)",
      spaceComplexity: "O(H)",
      notes: `- Three deletion cases: leaf → return NULL; one child → return that child; two children → replace with inorder predecessor.
- Inorder predecessor = rightmost node of the left subtree (largest value smaller than root).
- Recursive approach makes each case concise; stack depth is O(H).`,
    },
    {
      id: "kth-smallest-element-in-a-bst",
      title: "Kth Smallest Element in a BST",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      tags: ["striver-a2z"],
      question:
        "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
      testCases: [
        {
          input: "root = [3,1,4,null,2], k = 1",
          output: "1",
          explanation: "",
          trees: [[3, 1, 4, null, 2]],
        },
        {
          input: "root = [5,3,6,2,4,null,7], k = 3",
          output: "3",
          explanation: "",
          trees: [[5, 3, 6, 2, 4, null, 7]],
        },
      ],
      code: `class Solution {
public:
    void inorder(TreeNode* root, int& ans, int& ct, int k) {
        if (root == NULL) {
            return;
        }

        inorder(root->left, ans, ct, k);
        ct++;
        if (ct == k) {
            ans = root->val;
            return;
        }
        inorder(root->right, ans, ct, k);
    }

    int kthSmallest(TreeNode* root, int k) {
        int ct = 0;
        int ans;
        inorder(root, ans, ct, k);
        return ans;
    }
};`,
      timeComplexity: "O(H + k)",
      spaceComplexity: "O(H)",
      notes: `- Inorder traversal of a BST yields nodes in sorted ascending order.
- Increment a counter on each visit; stop and record when counter reaches k.
- O(H + k) time: traverse height to reach leftmost node, then k steps along inorder.`,
    },
    {
      id: "validate-binary-search-tree",
      title: "Validate Binary Search Tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
      tags: ["striver-a2z"],
      question:
        "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node's key. The right subtree of a node contains only nodes with keys strictly greater than the node's key. Both the left and right subtrees must also be binary search trees.",
      testCases: [
        {
          input: "root = [2,1,3]",
          output: "true",
          explanation: "",
          trees: [[2, 1, 3]],
        },
        {
          input: "root = [5,1,4,null,null,3,6]",
          output: "false",
          explanation: "",
          trees: [[5, 1, 4, null, null, 3, 6]],
        },
      ],
      type: "TREE",
      code: `class Solution {

private:
    bool validate(TreeNode* root, long minValue, long maxValue) {
        if (root == NULL)
            return true;
        int rootValue = root->val;
        if (rootValue >= maxValue || rootValue <= minValue) {
            return false;
        }

        return validate(root->left, minValue, rootValue) &&
               validate(root->right, rootValue, maxValue);
    }

public:
    bool isValidBST(TreeNode* root) {
        if (root == NULL)
            return true;
        return validate(root, LONG_MIN, LONG_MAX);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Checking only parent–child pairs is insufficient; propagate a valid (min, max) range down the tree.
- Left subtree values must be strictly < current node; right subtree values must be strictly > current node.
- Use \`long\` bounds to handle INT_MIN / INT_MAX edge cases correctly.`,
    },
    {
      id: "lowest-common-ancestor-of-a-binary-search-tree",
      title: "Lowest Common Ancestor of a Binary Search Tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      tags: ["striver-a2z"],
      question:
        "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”",
      testCases: [
        {
          input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
          output: "6",
          explanation: "",
          trees: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]],
        },
        {
          input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
          output: "2",
          explanation: "",
          trees: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]],
        },
        {
          input: "root = [2,null,3], p = 2, q = 3",
          output: "2",
          explanation: "",
          trees: [[2, null, 3]],
        },
      ],
      type: "TREE",
      code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if((root->val > p->val) && (root->val > q->val)){
            return lowestCommonAncestor(root->left,p,q);
        }
        if((root->val < p->val) && (root->val < q->val)) {
            return lowestCommonAncestor(root->right,p,q);
        }

        return root;
    }
};`,
      timeComplexity: "O(H)",
      spaceComplexity: "O(H)",
      notes: `- Exploit BST ordering: if both p and q are smaller, LCA is in the left subtree; if both larger, go right.
- The first node where p and q diverge (or one equals root) is the LCA.
- Simpler than the general binary tree LCA because BST ordering eliminates need to search both sides.
- Compare with \`Lowest Common Ancestor of a Binary Tree\` which requires checking both subtrees.`,
    },
    {
      id: "construct-binary-search-tree-from-preorder-traversal",
      title: "Construct Binary Search Tree from Preorder Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
      tags: ["striver-a2z"],
      question:
        "Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root. It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases. A binary search tree is a binary tree where for every node, any descendant of Node.left has a value strictly less than Node.val, and any descendant of Node.right has a value strictly greater than Node.val. A preorder traversal of a binary tree displays the value of the node first, then traverses Node.left, then traverses Node.right.",
      testCases: [
        {
          input: "preorder = [8,5,1,7,10,12]",
          output: "[8,5,10,1,7,null,12]",
          explanation: "",
          trees: [[8, 5, 10, 1, 7, null, 12]],
        },
        {
          input: "preorder = [1,3]",
          output: "[1,null,3]",
          explanation: "",
          trees: [[1, null, 3]],
        },
      ],
      code: `class Solution {
public:
    TreeNode* solve(int& idx, int l, int r, vector<int>& inorder,
                    vector<int>& preorder, unordered_map<int, int>& mp) {
        if (l > r)
            return NULL;

        int value = preorder[idx];
        int i = mp[value];
        idx++;

        TreeNode* root = new TreeNode(value);

        root->left = solve(idx, l, i - 1, inorder, preorder, mp);
        root->right = solve(idx, i + 1, r, inorder, preorder, mp);

        return root;
    }

    TreeNode* bstFromPreorder(vector<int>& preorder) {
        int N = preorder.size();
        vector<int> inorder(preorder.begin(), preorder.end());
        sort(inorder.begin(), inorder.end()); // O(N log N)

        unordered_map<int, int> mp;
        for (int i = 0; i < N; i++) { // O(N)
            mp[inorder[i]] = i; // O(1) avg
        }

        int idx = 0;

        return solve(idx, 0, N - 1, inorder, preorder, mp);
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Sort preorder to get inorder; use an index map for O(1) root lookup in inorder.
- Recursive divide-and-conquer: root from preorder[idx], split inorder around it into left and right subtrees.
- Same approach as \`Construct Binary Tree from Preorder and Inorder Traversal\`.`,
    },
    {
      id: "binary-search-tree-iterator",
      title: "Binary Search Tree Iterator",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl: "https://leetcode.com/problems/binary-search-tree-iterator/",
      question:
        "Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST): BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST. boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. int next() Moves the pointer to the right, then returns the number at the pointer. Notice that by initializing the pointer to a non-existent smallest number, the first call to next() will return the smallest element in the BST. You may assume that next() calls will always be valid. That is, there will be at least a next number in the in-order traversal when next() is called.",
      testCases: [
        {
          input: `["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]`,
          output: "[null, 3, 7, true, 9, true, 15, true, 20, false]",
          explanation: "",
          trees: [[7, 3, 15, null, null, 9, 20]],
        },
      ],
      code: `class BSTIterator {
public:
    vector<int> v;
    int i = 0;
    int N;
    BSTIterator(TreeNode* root) {
        inorder(root);
        N = v.size();
    }

    void inorder(TreeNode* root) { // O(N) total
        if (root == NULL) {
            return;
        }
        inorder(root->left);
        v.push_back(root->val);
        inorder(root->right);
    }

    int next() {
        int val = v[i];
        i++;
        return val;
    }

    bool hasNext() { return i < N; }
};`,
      type: "TREE",
      timeComplexity: "O(N) init",
      spaceComplexity: "O(N)",
      notes: `- Flatten the BST into a sorted vector via inorder traversal at construction time.
- \`next()\` and \`hasNext()\` are then O(1) — just index into the precomputed vector.
- Trade-off: O(N) space to achieve O(1) amortized operations (vs O(H) space with a controlled stack).`,
    },
    {
      id: "two-sum-iv-input-is-a-bst",
      title: "Two Sum IV - Input is a BST",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
      tags: ["striver-a2z"],
      question:
        "Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST such that their sum is equal to k, or false otherwise.",
      testCases: [
        {
          input: "root = [5,3,6,2,4,null,7], k = 9",
          output: "true",
          explanation: "",
          trees: [[5, 3, 6, 2, 4, null, 7]],
        },
        {
          input: "root = [5,3,6,2,4,null,7], k = 28",
          output: "false",
          explanation: "",
          trees: [[5, 3, 6, 2, 4, null, 7]],
        },
      ],
      code: `class Solution {
private:
    bool solve(TreeNode* root, int k, unordered_set<int> &st){
        if(root==NULL){
            return false;
        }
        if(st.count(k-root->val)){ // O(1) avg
            return true;
        }

        st.insert(root->val); // O(1) avg

        return solve(root->left,k,st) || solve(root->right,k,st);
    }
public:
    bool findTarget(TreeNode* root, int k) {
        unordered_set<int> st;
        return solve(root,k,st);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Same as Two Sum I: use a hash set to check if the complement (k - val) was seen before.
- DFS traversal visits every node once; BST ordering is not needed here.
- An alternative BST-specific approach uses the iterator + two-pointer technique in O(N) time O(H) space.`,
    },
    {
      id: "recover-binary-search-tree",
      title: "Recover Binary Search Tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/recover-binary-search-tree/",
      tags: ["striver-a2z"],
      question:
        "You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.",
      testCases: [
        {
          input: "root = [1,3,null,null,2]",
          output: "[3,1,null,null,2]",
          explanation: "",
          trees: [[1, 3, null, null, 2]],
        },
        {
          input: "root = [3,1,4,null,null,2]",
          output: "[2,1,4,null,null,3]",
          explanation: "",
          trees: [[3, 1, 4, null, null, 2]],
        },
      ],
      code: `class Solution {
public:
    TreeNode *first = NULL, *second = NULL, *prev = NULL;

    void inorder(TreeNode* root) {
        if (!root)
            return;

        inorder(root->left);

        if (prev && prev->val > root->val) {
            if (!first)
                first = prev;
            second = root;
        }
        prev = root;

        inorder(root->right);
    }

    void recoverTree(TreeNode* root) {
        inorder(root);
        swap(first->val, second->val);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(H)",
      notes: `- Inorder traversal of a valid BST is strictly ascending — two swapped nodes cause exactly 1 or 2 violations.
- First violation: \`prev->val > curr->val\` — record \`first = prev\`.
- Second violation (if adjacent swap, only 1 violation): record \`second = curr\` each time a violation is found.
- Swap the values of \`first\` and \`second\` at the end to restore the BST.`,
    },
    {
      id: "maximum-sum-bst-in-binary-tree",
      title: "Maximum Sum BST in Binary Tree",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/",
      tags: ["striver-a2z"],
      question:
        "Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST). Assume a BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.",
      testCases: [
        {
          input: "root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]",
          output: "20",
          explanation:
            "Maximum sum in a valid Binary search tree is obtained in root node with key equal to 3.",
        },
        {
          input: "root = [4,3,null,1,2]",
          output: "2",
          explanation:
            "Maximum sum in a valid Binary search tree is obtained in a single root node with key equal to 2.",
        },
        {
          input: "root = [-4,-2,-5]",
          output: "0",
          explanation: "All values are negatives. Return an empty BST.",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: `- Post-order DFS: process left and right subtrees first, then check if current subtree is a valid BST.
- Each recursive call returns (isBST, minVal, maxVal, sum) for its subtree.
- Current node forms a valid BST subtree only if left.isBST, right.isBST, left.max < root < right.min.
- Track global max sum; update whenever a valid BST subtree is found.`,
    },
  ],
}
