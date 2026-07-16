import { DsaTopic } from "../dsa-data"

export const mathGeometry: DsaTopic = {
  topic: "Math & Geometry",
  questions: [
    {
      id: "happy-number",
      title: "Happy Number",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/happy-number/",
      tags: ["neetcode-150"],
      question:
        "A happy number repeatedly replaced by the sum of the squares of its digits eventually reaches 1. Given n, return true if it is happy, otherwise false (it loops).",
      testCases: [
        {
          input: "n = 19",
          output: "true",
          explanation: "1²+9²=82 → 8²+2²=68 → 100 → 1.",
        },
        { input: "n = 2", output: "false" },
      ],
      code: `class Solution {
public:
    int next(int n) {
        int sum = 0;
        while (n) { int d = n % 10; sum += d * d; n /= 10; }
        return sum;
    }

    bool isHappy(int n) {
        unordered_set<int> seen;
        while (n != 1 && !seen.count(n)) { // O(log n) per step
            seen.insert(n);
            n = next(n);
        }
        return n == 1;
    }
};`,
      timeComplexity: "O(log n) per step",
      spaceComplexity: "O(log n)",
      notes: `- Repeatedly map n to the sum of squares of its digits.
- A set detects a cycle → not happy; reaching 1 → happy.
- Floyd's slow/fast pointer replaces the set for O(1) space.`,
    },
    {
      id: "plus-one",
      title: "Plus One",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/plus-one/",
      tags: ["neetcode-150"],
      question:
        "Given a large integer represented as a digit array (most significant first), increment it by one and return the resulting digit array.",
      testCases: [
        { input: "digits = [1,2,3]", output: "[1,2,4]" },
        {
          input: "digits = [9,9,9]",
          output: "[1,0,0,0]",
          explanation: "Carry propagates and adds a new leading digit.",
        },
      ],
      code: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) { // O(N)
            if (digits[i] < 9) { digits[i]++; return digits; } // no carry
            digits[i] = 0; // 9 → 0, carry continues left
        }
        digits.insert(digits.begin(), 1); // all nines → prepend 1
        return digits;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Walk from the least significant digit; increment and stop at the first digit < 9.
- A 9 becomes 0 and carries left.
- Only all-nines needs a new leading 1 (e.g. 999 → 1000).`,
    },
    {
      id: "powx-n",
      title: "Pow(x, n)",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/powx-n/",
      tags: ["neetcode-150"],
      question:
        "Implement pow(x, n), which computes x raised to the power n (n can be negative).",
      testCases: [
        { input: "x = 2.00000, n = 10", output: "1024.00000" },
        {
          input: "x = 2.00000, n = -2",
          output: "0.25000",
          explanation: "2^-2 = 1/4 = 0.25.",
        },
      ],
      code: `class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;
        if (N < 0) { x = 1 / x; N = -N; } // handle negative exponent

        double res = 1;
        while (N) { // O(log n)
            if (N & 1) res *= x; // multiply in the current power of x
            x *= x;              // square the base
            N >>= 1;
        }
        return res;
    }
};`,
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      notes: `- Fast exponentiation: square the base and consume exponent bits.
- Multiply into the result only when the current bit is set.
- Use a 64-bit N so negating INT_MIN doesn't overflow.`,
    },
    {
      id: "multiply-strings",
      title: "Multiply Strings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/multiply-strings/",
      tags: ["neetcode-150"],
      question:
        "Given two non-negative integers as strings num1 and num2, return their product as a string, without using big-integer libraries or converting to int directly.",
      testCases: [
        { input: 'num1 = "2", num2 = "3"', output: '"6"' },
        { input: 'num1 = "123", num2 = "456"', output: '"56088"' },
      ],
      code: `class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        int m = num1.size(), n = num2.size();
        vector<int> pos(m + n, 0); // digit buckets

        for (int i = m - 1; i >= 0; i--) { // O(M)
            for (int j = n - 1; j >= 0; j--) { // O(N)
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int sum = mul + pos[i + j + 1]; // add into low position
                pos[i + j + 1] = sum % 10;
                pos[i + j] += sum / 10;         // carry to high position
            }
        }

        string res;
        for (int p : pos)
            if (!(res.empty() && p == 0)) res.push_back(p + '0'); // skip leading zeros
        return res;
    }
};`,
      timeComplexity: "O(M × N)",
      spaceComplexity: "O(M + N)",
      notes: `- Digits i and j of the inputs contribute to positions i+j and i+j+1 of the product.
- Accumulate into a size m+n bucket array, carrying tens leftward.
- Strip leading zeros at the end; handle the "0" factor up front.`,
    },
    {
      id: "detect-squares",
      title: "Detect Squares",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/detect-squares/",
      tags: ["neetcode-150"],
      question:
        "Design a data structure that adds points and, given a query point, counts axis-aligned squares having that point as one corner and three existing points as the others.",
      testCases: [
        {
          input:
            "add([3,10]), add([11,2]), add([3,2]), count([11,10]), count([14,8])",
          output: "1, 0",
          explanation:
            "Query [11,10] forms one square with [3,10],[11,2],[3,2].",
        },
      ],
      code: `class DetectSquares {
    unordered_map<int, unordered_map<int, int>> cnt; // x -> (y -> count)
    vector<pair<int, int>> pts;

public:
    void add(vector<int> point) { // O(1) avg
        cnt[point[0]][point[1]]++;
        pts.push_back({point[0], point[1]});
    }

    int count(vector<int> point) {
        int px = point[0], py = point[1], res = 0;

        for (auto& [x, y] : pts) { // O(N)
            // p must be a diagonal corner: equal |dx|,|dy| and not on an axis with query
            if (abs(x - px) != abs(y - py) || x == px || y == py) continue;
            res += cnt[px][y] * cnt[x][py]; // the other two corners
        }
        return res;
    }
};`,
      timeComplexity: "O(N) per count",
      spaceComplexity: "O(N)",
      notes: `- Store point counts in a nested map plus a list of all points.
- For each stored point treat it as the diagonal corner; a valid square needs |dx| == |dy|.
- Multiply the counts of the two remaining corners \`(px,y)\` and \`(x,py)\`.`,
    },
  ],
}
