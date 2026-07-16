import { DsaTopic } from "../dsa-data"

export const bitManipulation: DsaTopic = {
  topic: "Bit Manipulation",
  questions: [
    {
      id: "sum-of-two-integers",
      title: "Sum of Two Integers",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sum-of-two-integers/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given two integers a and b, return their sum without using the + or - operators.",
      testCases: [
        { input: "a = 1, b = 2", output: "3" },
        { input: "a = 2, b = 3", output: "5" },
      ],
      code: `class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) { // O(1) — at most 32 iterations
            unsigned carry = (unsigned)(a & b) << 1; // common bits shift left
            a = a ^ b;   // add without carry
            b = carry;   // carry becomes the next addend
        }
        return a;
    }
};`,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      notes: `- XOR adds bit-by-bit ignoring carry; AND-then-shift computes the carry.
- Loop until there is no carry left; bounded by the 32-bit width.
- Use \`unsigned\` for the carry shift to avoid signed-overflow UB.`,
    },
    {
      id: "number-of-1-bits",
      title: "Number of 1 Bits",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Write a function that takes an unsigned integer and returns the number of set bits (its Hamming weight).",
      testCases: [
        { input: "n = 11 (0b1011)", output: "3" },
        { input: "n = 128 (0b10000000)", output: "1" },
      ],
      code: `class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) { // O(k) where k = number of set bits
            n &= (n - 1); // clear the lowest set bit
            count++;
        }
        return count;
    }
};`,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      notes: `- \`n & (n - 1)\` clears the lowest set bit, so the loop runs once per 1-bit.
- Faster than checking all 32 bits when the number is sparse.
- Bounded by 32 iterations, so O(1) for a fixed word size.`,
    },
    {
      id: "counting-bits",
      title: "Counting Bits",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an integer n, return an array ans of length n + 1 where ans[i] is the number of set bits in i.",
      testCases: [
        {
          input: "n = 2",
          output: "[0,1,1]",
          explanation: "0→0, 1→1, 2→1.",
        },
        {
          input: "n = 5",
          output: "[0,1,1,2,1,2]",
        },
      ],
      code: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1, 0);

        for (int i = 1; i <= n; i++) { // O(N)
            dp[i] = dp[i >> 1] + (i & 1); // bits of i/2 plus its last bit
        }

        return dp;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- \`i\` has the same set bits as \`i >> 1\` plus its own lowest bit \`(i & 1)\`.
- DP over already-computed smaller values gives O(N) vs O(N log N) popcount per number.
- \`dp[i >> 1]\` is always computed before \`dp[i]\` since i/2 < i.`,
    },
    {
      id: "missing-number",
      title: "Missing Number",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/missing-number/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Given an array nums containing n distinct numbers taken from the range [0, n], return the one number that is missing from the range.",
      testCases: [
        {
          input: "nums = [3,0,1]",
          output: "2",
          explanation: "n = 3, so the range is [0,3]; 2 is missing.",
        },
        {
          input: "nums = [0,1]",
          output: "2",
        },
      ],
      code: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int res = n; // start with the index n that has no element

        for (int i = 0; i < n; i++) { // O(N)
            res ^= i ^ nums[i]; // XOR every index with every value
        }

        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- XOR all indices 0..n with all values; paired numbers cancel, leaving the missing one.
- Seed \`res = n\` to cover the extra index that has no matching element.
- Overflow-safe alternative to the sum formula n(n+1)/2 - sum(nums).`,
    },
    {
      id: "reverse-bits",
      title: "Reverse Bits",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/reverse-bits/",
      tags: ["blind-75", "neetcode-150"],
      question:
        "Reverse the bits of a given 32-bit unsigned integer and return the result.",
      testCases: [
        {
          input: "n = 43261596 (0b00000010100101000001111010011100)",
          output: "964176192 (0b00111001011110000010100101000000)",
        },
        {
          input: "n = 4294967293",
          output: "3221225471",
        },
      ],
      code: `class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;

        for (int i = 0; i < 32; i++) { // O(1) — fixed 32 bits
            res = (res << 1) | (n & 1); // append n's lowest bit to res
            n >>= 1;
        }

        return res;
    }
};`,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      notes: `- Shift \`res\` left and OR in the current lowest bit of \`n\`, 32 times.
- Effectively pours bits from n into res in reverse order.
- Fixed 32-iteration loop → constant time and space.`,
    },
  ],
}
