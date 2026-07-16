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
    {
      id: "min-stack",
      title: "Min Stack",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/min-stack/",
      tags: ["neetcode-150"],
      question:
        "Design a stack supporting push, pop, top, and retrieving the minimum element — all in O(1).",
      testCases: [
        {
          input:
            "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
          output: "-3, then 0, then -2",
        },
      ],
      code: `class MinStack {
    stack<int> st;
    stack<int> mins; // running minimum aligned with st

public:
    void push(int val) { // O(1)
        st.push(val);
        mins.push(mins.empty() ? val : min(val, mins.top()));
    }
    void pop() { st.pop(); mins.pop(); } // O(1)
    int top() { return st.top(); }
    int getMin() { return mins.top(); }
};`,
      timeComplexity: "O(1) per op",
      spaceComplexity: "O(N)",
      notes: `- Keep a parallel stack whose top is always the min of the main stack.
- On push, store min(val, previous min); pop both together.
- getMin is just the auxiliary stack's top — no scanning.`,
    },
    {
      id: "evaluate-reverse-polish-notation",
      title: "Evaluate Reverse Polish Notation",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      tags: ["neetcode-150"],
      question:
        "Evaluate an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /; operands are integers. Division truncates toward zero.",
      testCases: [
        {
          input: 'tokens = ["2","1","+","3","*"]',
          output: "9",
          explanation: "((2 + 1) * 3) = 9.",
        },
        {
          input: 'tokens = ["4","13","5","/","+"]',
          output: "6",
          explanation: "(4 + (13 / 5)) = 6.",
        },
      ],
      code: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;

        for (string& t : tokens) { // O(N)
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stoi(t));
            }
        }

        return st.top();
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Push operands; on an operator, pop the top two and push the result.
- Order matters for - and /: the first popped value is the right operand.
- Final stack holds exactly one value — the answer.`,
    },
    {
      id: "generate-parentheses",
      title: "Generate Parentheses",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
      tags: ["neetcode-150"],
      question:
        "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
      testCases: [
        {
          input: "n = 3",
          output: '["((()))","(()())","(())()","()(())","()()()"]',
        },
        { input: "n = 1", output: '["()"]' },
      ],
      code: `class Solution {
public:
    void backtrack(int open, int close, int n,
                   string& cur, vector<string>& res) {
        if ((int)cur.size() == 2 * n) { res.push_back(cur); return; }

        if (open < n) { // can still open
            cur.push_back('('); backtrack(open + 1, close, n, cur, res); cur.pop_back();
        }
        if (close < open) { // can close only if it stays balanced
            cur.push_back(')'); backtrack(open, close + 1, n, cur, res); cur.pop_back();
        }
    }

    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string cur;
        backtrack(0, 0, n, cur, res);
        return res;
    }
};`,
      timeComplexity: "O(4^n / √n)",
      spaceComplexity: "O(n)",
      notes: `- Backtrack tracking open and close counts placed so far.
- Add '(' while open < n; add ')' only while close < open to stay valid.
- Count of results is the nth Catalan number.`,
    },
    {
      id: "daily-temperatures",
      title: "Daily Temperatures",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
      tags: ["neetcode-150"],
      question:
        "Given daily temperatures, return an array where answer[i] is the number of days until a warmer temperature, or 0 if none.",
      testCases: [
        {
          input: "temperatures = [73,74,75,71,69,72,76,73]",
          output: "[1,1,4,2,1,1,0,0]",
        },
        {
          input: "temperatures = [30,40,50,60]",
          output: "[1,1,1,0]",
        },
      ],
      code: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st; // indices of days with decreasing temperature

        for (int i = 0; i < n; i++) { // O(N)
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int j = st.top(); st.pop();
                res[j] = i - j; // warmer day found
            }
            st.push(i);
        }

        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Monotonic decreasing stack of indices waiting for a warmer day.
- When today is warmer, pop and record the day gap for each resolved index.
- Each index is pushed and popped once → linear time.`,
    },
    {
      id: "car-fleet",
      title: "Car Fleet",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/car-fleet/",
      tags: ["neetcode-150"],
      question:
        "Cars head to a target at given positions and speeds; a faster car catching a slower one forms a fleet moving at the slower speed. Return the number of fleets that arrive.",
      testCases: [
        {
          input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
          output: "3",
        },
        {
          input: "target = 10, position = [3], speed = [3]",
          output: "1",
        },
      ],
      code: `class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        vector<pair<int, double>> cars(n); // {position, time to target}
        for (int i = 0; i < n; i++)
            cars[i] = {position[i], (double)(target - position[i]) / speed[i]};
        sort(cars.begin(), cars.end()); // O(N log N) by position

        int fleets = 0;
        double cur = 0; // arrival time of the current lead fleet
        for (int i = n - 1; i >= 0; i--) { // closest-to-target first
            if (cars[i].second > cur) { // can't catch the fleet ahead
                fleets++;
                cur = cars[i].second;
            }
        }

        return fleets;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Sort by position; process from the car nearest the target backward.
- A car whose arrival time exceeds the lead fleet's starts a new fleet.
- Cars with smaller/equal time merge into the fleet ahead.`,
    },
    {
      id: "largest-rectangle-in-histogram",
      title: "Largest Rectangle in Histogram",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      tags: ["neetcode-150"],
      question:
        "Given an array of bar heights (each width 1), return the area of the largest rectangle that fits within the histogram.",
      testCases: [
        {
          input: "heights = [2,1,5,6,2,3]",
          output: "10",
          explanation: "Bars [5,6] give the rectangle 5 × 2 = 10.",
        },
        { input: "heights = [2,4]", output: "4" },
      ],
      code: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size(), maxArea = 0;
        stack<int> st; // indices with increasing heights

        for (int i = 0; i <= n; i++) { // O(N) — sentinel 0 at i == n
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()]; st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }

        return maxArea;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Monotonic increasing stack; a shorter bar resolves all taller bars behind it.
- Popped bar's width spans from the previous smaller bar to the current index.
- A trailing 0-height sentinel flushes the stack at the end.`,
    },
  ],
}
