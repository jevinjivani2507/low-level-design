import { DsaTopic } from "../dsa-data"

export const stack: DsaTopic = {
  topic: "Stack",
  questions: [
    {
      id: "valid-parentheses",
      title: "Valid Parentheses",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given a string s containing only the characters ()[]{}, determine if it is valid: brackets must close in the correct order and every opener has a matching closer.",
      testCases: [
        { input: 's = "()[]{}"', output: "true" },
        {
          input: 's = "(]"',
          output: "false",
          explanation: "'(' is closed by ']', a mismatch.",
        },
        { input: 's = "([)]"', output: "false" },
      ],
      code: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> match = {{')', '('}, {']', '['}, {'}', '{'}};

        for (char c : s) { // O(N)
            if (c == '(' || c == '[' || c == '{') {
                st.push(c); // O(1)
            } else {
                if (st.empty() || st.top() != match[c]) return false; // O(1) avg
                st.pop();
            }
        }

        return st.empty(); // leftover openers → invalid
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Push openers; on a closer, the stack top must be its matching opener.
- Mismatch or empty stack on a closer → invalid immediately.
- Must end empty — leftover openers mean unclosed brackets.`,
    },
  ],
}
