import { DsaTopic } from "../dsa-data"

export const trie: DsaTopic = {
  topic: "Trie",
  questions: [
    {
      id: "implement-trie-prefix-tree",
      title: "Implement Trie (Prefix Tree)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Implement a Trie with insert(word), search(word) (exact match), and startsWith(prefix) (any word with that prefix).",
      testCases: [
        {
          input:
            'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")',
          output: "true, false, true, true",
          explanation:
            '"app" is only a prefix until inserted, so search is false then true.',
        },
      ],
      code: `class Trie {
    struct Node {
        Node* children[26] = {};
        bool isEnd = false;
    };
    Node* root;

    Node* find(const string& s) {
        Node* cur = root;
        for (char c : s) { // O(L)
            if (!cur->children[c - 'a']) return nullptr;
            cur = cur->children[c - 'a'];
        }
        return cur;
    }

public:
    Trie() { root = new Node(); }

    void insert(string word) {
        Node* cur = root;
        for (char c : word) { // O(L)
            if (!cur->children[c - 'a']) cur->children[c - 'a'] = new Node();
            cur = cur->children[c - 'a'];
        }
        cur->isEnd = true;
    }

    bool search(string word) {
        Node* node = find(word);
        return node && node->isEnd; // must be a full word, not just a prefix
    }

    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }
};`,
      timeComplexity: "O(L) per op",
      spaceComplexity: "O(total chars)",
      notes: `- Each node holds 26 child links and an \`isEnd\` flag marking a complete word.
- \`search\` requires \`isEnd\`; \`startsWith\` only needs the path to exist.
- All operations are O(L) in the word/prefix length, independent of word count.`,
    },
    {
      id: "add-and-search-word-data-structure-design",
      title: "Design Add and Search Words Data Structure",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Design a data structure with addWord(word) and search(word), where search may contain '.' as a wildcard that matches any single letter.",
      testCases: [
        {
          input:
            'addWord("bad"), addWord("dad"), addWord("mad"), search("pad"), search("bad"), search(".ad"), search("b..")',
          output: "false, true, true, true",
          explanation: "'.ad' matches bad/dad/mad; 'b..' matches bad.",
        },
      ],
      code: `class WordDictionary {
    struct Node {
        Node* children[26] = {};
        bool isEnd = false;
    };
    Node* root;

    bool dfs(Node* node, const string& word, int i) {
        if (!node) return false;
        if (i == (int)word.size()) return node->isEnd;

        char c = word[i];
        if (c == '.') { // wildcard: try every child
            for (int k = 0; k < 26; k++) // O(26) branch
                if (dfs(node->children[k], word, i + 1)) return true;
            return false;
        }
        return dfs(node->children[c - 'a'], word, i + 1);
    }

public:
    WordDictionary() { root = new Node(); }

    void addWord(string word) {
        Node* cur = root;
        for (char c : word) { // O(L)
            if (!cur->children[c - 'a']) cur->children[c - 'a'] = new Node();
            cur = cur->children[c - 'a'];
        }
        cur->isEnd = true;
    }

    bool search(string word) { return dfs(root, word, 0); }
};`,
      timeComplexity: "O(L) add, O(26^dots · L) search",
      spaceComplexity: "O(total chars)",
      notes: `- Standard trie for add; search is a DFS so wildcards can branch.
- On '.', recurse into all 26 children; on a letter, follow the single edge.
- Worst case (all dots) fans out 26 ways per position, hence the exponential search bound.`,
    },
    {
      id: "word-search-ii",
      title: "Word Search II",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an m × n board of characters and a list of words, return all words that can be formed from sequentially adjacent cells (each cell used once per word).",
      testCases: [
        {
          input:
            'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
          output: '["oath","eat"]',
        },
      ],
      code: `class Solution {
    struct Node {
        Node* children[26] = {};
        string word; // non-empty at the node ending a word
    };

    void dfs(vector<vector<char>>& board, int i, int j,
             Node* node, vector<string>& res) {
        if (i < 0 || j < 0 || i >= (int)board.size() || j >= (int)board[0].size())
            return;
        char c = board[i][j];
        if (c == '#' || !node->children[c - 'a']) return;

        node = node->children[c - 'a'];
        if (!node->word.empty()) {           // found a complete word
            res.push_back(node->word);
            node->word.clear();              // dedupe: emit each word once
        }

        board[i][j] = '#';                   // mark visited
        dfs(board, i + 1, j, node, res);
        dfs(board, i - 1, j, node, res);
        dfs(board, i, j + 1, node, res);
        dfs(board, i, j - 1, node, res);
        board[i][j] = c;                     // restore on backtrack
    }

public:
    vector<string> findWords(vector<vector<char>>& board,
                             vector<string>& words) {
        Node* root = new Node();
        for (string& w : words) { // build trie, O(total chars)
            Node* cur = root;
            for (char c : w) {
                if (!cur->children[c - 'a']) cur->children[c - 'a'] = new Node();
                cur = cur->children[c - 'a'];
            }
            cur->word = w;
        }

        vector<string> res;
        for (int i = 0; i < (int)board.size(); i++) // O(M)
            for (int j = 0; j < (int)board[0].size(); j++) // O(N)
                dfs(board, i, j, root, res);
        return res;
    }
};`,
      timeComplexity: "O(M × N × 4^L)",
      spaceComplexity: "O(total chars)",
      notes: `- Build a trie of all words so one board DFS matches every word at once.
- Store the full word at its terminal node; clear it after emitting to dedupe.
- Far faster than running Word Search once per word — shared prefixes are walked once.`,
    },
  ],
}
