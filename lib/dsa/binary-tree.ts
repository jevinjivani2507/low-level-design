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
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
      tags: ["neetcode-150", "striver-a2z"],
    },
    {
      id: "binary-tree-postorder-traversal",
      title: "Binary Tree Postorder Traversal",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-postorder-traversal/",
      question:
        "Given the root of a binary tree, return the postorder traversal of its nodes' values.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      question:
        "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
      testCases: [
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
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = [1,null,2]",
          output: "2",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "balanced-binary-tree",
      title: "Balanced Binary Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
      question: "Given a binary tree, determine if it is height-balanced.",
      testCases: [
        {
          input: "root = []",
          output: "true",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = [1,2]",
          output: "1",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "binary-tree-maximum-path-sum",
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      question:
        "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "same-tree",
      title: "Same Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/same-tree/",
      question:
        "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "vertical-order-traversal-of-a-binary-tree",
      title: "Vertical Order Traversal of a Binary Tree",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
      question:
        "Given the root of a binary tree, calculate the vertical order traversal of the binary tree. For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of the tree is at (0, 0). The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values. Return the vertical order traversal of the binary tree.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "binary-tree-right-side-view",
      title: "Binary Tree Right Side View",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/binary-tree-right-side-view/",
      question:
        "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "symmetric-tree",
      title: "Symmetric Tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/symmetric-tree/",
      question:
        "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = [1,2], p = 1, q = 2",
          output: "1",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "maximum-width-of-binary-tree",
      title: "Maximum Width of Binary Tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/maximum-width-of-binary-tree/",
      question:
        "Given the root of a binary tree, return the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels. The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation. It is guaranteed that the answer will in the range of a 32-bit signed integer.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = [1], target = 1, k = 3",
          output: "[]",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = []",
          output: "0",
          explanation: "",
        },
        {
          input: "root = [1]",
          output: "1",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "construct-binary-tree-from-preorder-and-inorder-traversal",
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
      question:
        "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
      testCases: [
        {
          input: "preorder = [-1], inorder = [-1]",
          output: "[-1]",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "inorder = [-1], postorder = [-1]",
          output: "[-1]",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = []",
          output: "[]",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
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
          input: "root = []",
          output: "[]",
          explanation: "",
        },
        {
          input: "root = [0]",
          output: "[0]",
          explanation: "",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
  ],
}
