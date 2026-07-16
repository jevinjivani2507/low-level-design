import { DsaTopic } from "../dsa-data"

export const string: DsaTopic = {
  topic: "String",
  questions: [
    {
      id: "valid-anagram",
      title: "Valid Anagram",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given two strings s and t, return true if t is an anagram of s (same characters with the same counts), otherwise false.",
      testCases: [
        { input: 's = "anagram", t = "nagaram"', output: "true" },
        { input: 's = "rat", t = "car"', output: "false" },
      ],
      code: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;

        vector<int> cnt(26, 0);
        for (char c : s) cnt[c - 'a']++;          // O(N)
        for (char c : t) {                         // O(N)
            if (--cnt[c - 'a'] < 0) return false;  // more of c in t than s
        }

        return true;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Count each letter in s, then decrement while scanning t.
- Any count dropping below zero means a mismatch in frequency.
- Fixed 26-slot array → O(1) space; different lengths fail fast.`,
    },
    {
      id: "group-anagrams",
      title: "Group Anagrams",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array of strings, group the anagrams together. Return the groups in any order.",
      testCases: [
        {
          input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
          output: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
        },
        {
          input: 'strs = [""]',
          output: '[[""]]',
        },
      ],
      code: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;

        for (string& s : strs) { // O(N)
            string key = s;
            sort(key.begin(), key.end()); // O(K log K)
            groups[key].push_back(s);     // O(1) avg
        }

        vector<vector<string>> res;
        for (auto& [k, v] : groups) res.push_back(v);
        return res;
    }
};`,
      timeComplexity: "O(N × K log K)",
      spaceComplexity: "O(N × K)",
      notes: `- Anagrams share the same sorted string — use it as the map key.
- Bucket each word under its sorted form; group values are the answer.
- K = word length; a frequency-count key avoids the sort for O(N × K).`,
    },
    {
      id: "valid-palindrome",
      title: "Valid Palindrome",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given a string s, return true if it is a palindrome considering only alphanumeric characters and ignoring case.",
      testCases: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" reads the same both ways.',
        },
        { input: 's = "race a car"', output: "false" },
      ],
      code: `class Solution {
public:
    bool isPalindrome(string s) {
        int i = 0, j = s.size() - 1;

        while (i < j) { // O(N)
            while (i < j && !isalnum(s[i])) i++; // skip non-alphanumeric
            while (i < j && !isalnum(s[j])) j--;
            if (tolower(s[i]) != tolower(s[j])) return false;
            i++; j--;
        }

        return true;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Two pointers from both ends, skipping non-alphanumeric characters.
- Compare lowercased characters; any mismatch means not a palindrome.
- In-place comparison avoids building a cleaned copy of the string.`,
    },
    {
      id: "longest-palindromic-substring",
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-palindromic-substring/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given a string s, return the longest substring of s that is a palindrome.",
      testCases: [
        {
          input: 's = "babad"',
          output: '"bab"',
          explanation: '"aba" is also a valid answer.',
        },
        { input: 's = "cbbd"', output: '"bb"' },
      ],
      code: `class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        int start = 0, maxLen = 1;

        auto expand = [&](int l, int r) {
            while (l >= 0 && r < (int)s.size() && s[l] == s[r]) { l--; r++; }
            if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
        };

        for (int i = 0; i < (int)s.size(); i++) { // O(N)
            expand(i, i);     // odd-length center
            expand(i, i + 1); // even-length center
        }

        return s.substr(start, maxLen);
    }
};`,
      timeComplexity: "O(N²)",
      spaceComplexity: "O(1)",
      notes: `- Expand around each center (N odd + N even centers), tracking the longest.
- After expansion the palindrome length is \`r - l - 1\` (pointers overshoot by one).
- O(1) space vs the O(N²) DP table; Manacher's algorithm gives O(N) if needed.`,
    },
    {
      id: "palindromic-substrings",
      title: "Palindromic Substrings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given a string s, return the number of palindromic substrings in it. Substrings at different positions count separately.",
      testCases: [
        {
          input: 's = "abc"',
          output: "3",
          explanation: 'Three single-character palindromes: "a","b","c".',
        },
        {
          input: 's = "aaa"',
          output: "6",
          explanation: '"a","a","a","aa","aa","aaa".',
        },
      ],
      code: `class Solution {
public:
    int countSubstrings(string s) {
        int count = 0;

        auto expand = [&](int l, int r) {
            while (l >= 0 && r < (int)s.size() && s[l] == s[r]) {
                l--; r++; count++; // each valid expansion is one palindrome
            }
        };

        for (int i = 0; i < (int)s.size(); i++) { // O(N)
            expand(i, i);     // odd-length center
            expand(i, i + 1); // even-length center
        }

        return count;
    }
};`,
      timeComplexity: "O(N²)",
      spaceComplexity: "O(1)",
      notes: `- Same expand-around-center idea; count every successful expansion.
- Two centers per index cover odd- and even-length palindromes.
- Each center expands O(N) in the worst case → O(N²) total.`,
    },
    {
      id: "encode-and-decode-strings",
      title: "Encode and Decode Strings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/encode-and-decode-strings/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Design an algorithm to encode a list of strings into a single string, sent over the network and decoded back to the original list. LeetCode Premium.",
      testCases: [
        {
          input: 'strs = ["lint","code"]',
          output: '["lint","code"]',
          explanation: 'Encodes to "4#lint4#code" then decodes back.',
        },
        {
          input: 'strs = ["we","say",":","yes"]',
          output: '["we","say",":","yes"]',
        },
      ],
      code: `class Codec {
public:
    string encode(vector<string>& strs) {
        string res;
        for (string& s : strs) { // O(N)
            res += to_string(s.size()) + "#" + s; // length-prefix each string
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;
        int i = 0;
        while (i < (int)s.size()) { // O(N)
            int j = i;
            while (s[j] != '#') j++;             // read the length digits
            int len = stoi(s.substr(i, j - i));
            res.push_back(s.substr(j + 1, len)); // O(len)
            i = j + 1 + len;
        }
        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Length-prefix each string: "len#content" — the delimiter alone is ambiguous.
- Decode reads digits up to '#', then slices exactly that many characters.
- Works for any content (including '#' or digits) since length drives the parse.`,
    },
  ],
}
