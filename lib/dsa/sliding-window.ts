import { DsaTopic } from "../dsa-data"

export const slidingWindow: DsaTopic = {
  topic: "Sliding Window",
  questions: [
    {
      id: "template",
      title: "Template",
      difficulty: "Easy",
      leetcodeUrl: "",
      question: `Sliding window means using two pointers to form a window: expand with \`right\`, and if it breaks the condition, shrink with \`left\` until it's valid again.
At each valid step, update your answer.`,
      testCases: [],
      code: `class Solution {
public:
    int template(string s) {
        int n = s.size();

        int left = 0, right = 0;

        // 0. INITIALIZE variables
        int ans = 0;
        unordered_map<char, int> freq; // or any structure

        while (right < n) { // O(N)

            // 1. INCLUDE current right element
            freq[s[right]]++;

            // 2. SHRINK window until valid
            // if -> in future dont have good answer
            // while -> in future we can have good answer with smaller window
            while (/* window is invalid */) { // O(N) amortized
                // undo what right pointer did
                freq[s[left]]--;

                // increment left
                left++;
            }

            // 3. UPDATE answer (valid window)
            if (condition) {
                ans = max(ans, right - left + 1);
            }

            // 4. INCREMENT right
            right++;
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- 4-step pattern: init variables → include right → shrink left until valid → update answer.
- Use \`if\` to shrink once when future windows can't improve; \`while\` when a smaller window may help later.
- Undo exactly what the right pointer did when advancing left.
- Outer \`while (right < n)\` drives expansion; \`right++\` always at end of loop.`,
    },
    {
      id: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      tags: ["striver-a2z", "neetcode-150"],
      question:
        "Given a string s, find the length of the longest substring without duplicate characters.",
      testCases: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation:
            'The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.',
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation: 'The answer is "b", with the length of 1.',
        },
        {
          input: 's = "pwwkew"',
          output: "3",
          explanation:
            'The answer is "wke", with the length of 3.\nNotice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
        },
      ],
      code: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int N = s.size();
        int left = 0;
        int right = 0;

        int ans = 0;
        unordered_map<char, int> mp;

        while (right < N) { // O(N)
            if (mp.count(s[right])) { // O(1) avg
                left = max(left, mp[s[right]] + 1);
            }

            ans = max(ans, right - left + 1);
            mp[s[right]] = right; // O(1) avg
            right++;
        }

        return ans;
    }
};`,
      codeLineHighlights: [
        { line: 13, tone: "green" },
        { line: 17, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Store each char's last seen index in map; on repeat, jump \`left = max(left, mp[s[right]] + 1)\`.
- Use \`max\` so left never moves backward (duplicate may be outside the current window).
- Update the map after adjusting left; window length = \`right - left + 1\`.`,
    },
    {
      id: "max-consecutive-ones-iii",
      title: "Max Consecutive Ones III",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/",
      tags: ["striver-a2z"],
      question:
        "Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.",
      testCases: [
        {
          input: "nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2",
          output: "6",
          explanation:
            "[1,1,1,0,0,1,1,1,1,1,1]\nBolded numbers were flipped from 0 to 1. The longest subarray is underlined.",
        },
        {
          input: "nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3",
          output: "10",
          explanation:
            "[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]\nBolded numbers were flipped from 0 to 1. The longest subarray is underlined.",
        },
      ],
      code: `class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int N = nums.size();

        int l = 0;
        int r = 0;

        int ans = 0;
        int zero = 0;

        while (r < N) { // O(N)
            if (nums[r] == 0) {
                zero++;
            }
            
            if (zero > k) {
                if (nums[l] == 0) {
                    zero--;
                }
                l++;
            }

            int len = r - l + 1;
            ans = max(ans, len);
            r++;
        }

        return ans;
    }
};`,
      codeLineHighlights: [
        { line: 10, tone: "green" },
        { line: 14, tone: "green" },
        { line: 19, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Count zeros in window; when \`zero > k\`, shrink with \`if\` (not \`while\`) to slide the window.
- Using \`if\` ensures the window never shrinks below the best seen so far — size only grows or stays same.
- Pattern: longest subarray with at most k zeros; generalizes to \`Longest Repeating Character Replacement\`.`,
    },
    {
      id: "fruit-into-baskets",
      title: "Fruit Into Baskets",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/",
      tags: ["striver-a2z"],
      question:
        "You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces. You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow: You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold. Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets. Once you reach a tree with fruit that cannot fit in your baskets, you must stop. Given the integer array fruits, return the maximum number of fruits you can pick.",
      testCases: [
        {
          input: "fruits = [1,2,1]",
          output: "3",
          explanation: "We can pick from all 3 trees.",
        },
        {
          input: "fruits = [0,1,2,2]",
          output: "3",
          explanation:
            "We can pick from trees [1,2,2].\nIf we had started at the first tree, we would only pick from trees [0,1].",
        },
        {
          input: "fruits = [1,2,3,2,2]",
          output: "4",
          explanation:
            "We can pick from trees [2,3,2,2].\nIf we had started at the first tree, we would only pick from trees [1,2].",
        },
      ],
      code: `class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        int N = fruits.size();

        int left = 0;
        int right = 0;

        int ans = 0;
        unordered_map<int, int> freq;

        while (right < N) { // O(N)
            freq[fruits[right]]++; // O(1) avg

            while (freq.size() > 2) { // O(N) amortized
                freq[fruits[left]]--; // O(1) avg

                if (freq[fruits[left]] == 0) {
                    freq.erase(fruits[left]); // O(1) avg
                }

                left++;
            }

            int len = right - left + 1;
            ans = max(ans, len);

            right++;
        }

        return ans;
    }
};`,
      codeLineHighlights: [
        { line: 10, tone: "green" },
        { line: 15, tone: "green" },
        { line: 18, tone: "green" },
        { line: 19, tone: "green" },
        { line: 20, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Longest subarray with at most 2 distinct values — generalize with k for the K-distinct variant.
- Use \`while\` to shrink (not \`if\`) because a smaller window can lead to a longer valid window later.
- Erase a fruit type from the map only when its count drops to 0 to correctly track distinct count.
- Pattern: same as \`Longest Substring with At Most K Distinct Characters\` with k=2.`,
    },
    {
      id: "longest-repeating-character-replacement",
      title: "Longest Repeating Character Replacement",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-repeating-character-replacement/",
      tags: ["striver-a2z", "neetcode-150"],
      question:
        "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.",
      testCases: [
        {
          input: 's = "ABAB", k = 2',
          output: "4",
          explanation: "Replace the two 'A's with two 'B's or vice versa.",
        },
        {
          input: 's = "AABABBA", k = 1',
          output: "4",
          explanation:
            "Replace the one 'A' in the middle with 'B' and form \"AABBBBA\".\nThe substring \"BBBB\" has the longest repeating letters, which is 4.\nThere may exists other ways to achieve this answer too.",
        },
      ],
      code: `class Solution {
public:
    int characterReplacement(string s, int k) {
        int N = s.size();
        int left = 0, right = 0;

        vector<int> freq(26, 0);
        int maxLen = 0;
        int maxCount = 0;

        while (right < N) { // O(N)
            freq[s[right] - 'A']++;
            maxCount = max(maxCount, freq[s[right] - 'A']);

            while ((right - left + 1) - maxCount > k) { // O(1)
                freq[s[left] - 'A']--;
                left++;
            }

            maxLen = max(maxLen, (right - left + 1));
            right++;
        }

        return maxLen;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Condition: \`(window_size - maxCount) > k\` means more than k replacements needed — shrink.
- \`maxCount\` only increases (never recomputed down) — safe because we only care about max window size.
- Use \`if\` (not \`while\`) to shrink — window slides without decreasing, same as \`Max Consecutive Ones III\`.
- \`freq\` is a fixed-size array of 26 ints; index with \`s[i] - 'A'\`.`,
      codeLineHighlights: [
        { line: 13, tone: "green" },
        { line: 15, tone: "green" },
      ],
    },
    {
      id: "binary-subarrays-with-sum",
      title: "Binary Subarrays With Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/binary-subarrays-with-sum/",
      tags: ["striver-a2z"],
      question:
        "Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal. A subarray is a contiguous part of the array.",
      testCases: [
        {
          input: "nums = [1,0,1,0,1], goal = 2",
          output: "4",
          explanation:
            "The 4 subarrays are bolded and underlined below:\n[1,0,1,0,1]\n[1,0,1,0,1]\n[1,0,1,0,1]\n[1,0,1,0,1]",
        },
        {
          input: "nums = [0,0,0,0,0], goal = 0",
          output: "15",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int maxSubarraysSum(vector<int>& nums, int goal){
        int N = nums.size();
        int left = 0, right = 0;

        int ans = 0;
        int currSum = 0;

        if(goal < 0) {
            return 0;
        }

        while(right < N){ // O(N)
            currSum += nums[right];

            while(currSum > goal){
                currSum -= nums[left];
                left++;
            }

            // all subarray will have sum <= goal
            ans += (right - left + 1); // O(1)

            right++;
        }

        return ans;
    }
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        return maxSubarraysSum(nums,  goal) - maxSubarraysSum(nums,  goal-1);
    }
};`,
      codeLineHighlights: [{ line: 23, tone: "green" }],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Can't use a single window for "exactly goal" — zeros mean we can't decide which pointer to move.
- Trick: count(sum ≤ goal) − count(sum ≤ goal−1) = count(sum == goal).
- Helper counts subarrays with sum ≤ k; each valid \`right\` adds \`right - left + 1\` subarrays.
- Same helper pattern as \`Count Number of Nice Subarrays\`.`,
    },
    {
      id: "count-number-of-nice-subarrays",
      title: "Count Number of Nice Subarrays",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/count-number-of-nice-subarrays/",
      tags: ["striver-a2z"],
      question:
        "Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it. Return the number of nice sub-arrays.",
      testCases: [
        {
          input: "nums = [1,1,2,1,1], k = 3",
          output: "2",
          explanation:
            "The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].",
        },
        {
          input: "nums = [2,4,6], k = 1",
          output: "0",
          explanation: "There are no odd numbers in the array.",
        },
        {
          input: "nums = [2,2,2,1,2,2,1,2,2,2], k = 2",
          output: "16",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int helper(vector<int>& nums, int k){
        int N = nums.size();
        int left = 0, right = 0;

        int ans = 0;
        int oddCount = 0;

        while(right < N){ // O(N)
            if(nums[right] % 2 == 1) {
                oddCount++;
            }

            while(oddCount > k){ // O(N) amortized
                if(nums[left] % 2 == 1) {
                    oddCount--;
                }
                left++;
            }

            ans += (right - left + 1);
            right++;
        }

        return ans;
    }

    int numberOfSubarrays(vector<int>& nums, int k) {
        return helper(nums, k) - helper(nums, k-1);
    }
};`,
      codeLineHighlights: [{ line: 22, tone: "green" }],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Count subarrays with exactly k odd numbers using: helper(k) − helper(k−1).
- Same two-helper trick as \`Binary Subarrays With Sum\` — convert "exactly k" to "at most k".
- Treat odd numbers as 1, even as 0; reduces to a sum-at-most problem.`,
    },
    {
      id: "number-of-substrings-containing-all-three-characters",
      title: "Number of Substrings Containing All Three Characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
      tags: ["striver-a2z"],
      question:
        "Given a string s consisting only of characters a, b and c. Return the number of substrings containing at least one occurrence of all these characters a, b and c.",
      testCases: [
        {
          input: 's = "abcabc"',
          output: "10",
          explanation:
            'The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).',
        },
        {
          input: 's = "aaacb"',
          output: "3",
          explanation:
            'The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".',
        },
        {
          input: 's = "abc"',
          output: "1",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int numberOfSubstrings(string s) {
        int N = s.size();
        int left = 0, right = 0;

        vector<int> freq(3, 0);
        int ans = 0;

        while(right < N){ // O(N)
            freq[s[right] - 'a']++;

            while(freq[0] > 0 && freq[1] > 0 && freq[2] > 0){ // O(N) amortized

                ans += (N - right);

                freq[s[left] - 'a']--;
                left++;
            }

            right++;
        }

        return ans;
    }
};`,
      codeLineHighlights: [
        { line: 13, tone: "green" },
        { line: 15, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- When window has all 3 chars, every rightward extension stays valid — add \`N - right\` at once.
- Shrink from left inside the \`while\` to count all minimal valid windows before moving right.
- Counting \`N - right\` per shrink step is O(1) instead of iterating all extensions.`,
    },
    {
      id: "maximum-points-you-can-obtain-from-cards",
      title: "Maximum Points You Can Obtain from Cards",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
      tags: ["striver-a2z"],
      question:
        "There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints. In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards. Your score is the sum of the points of the cards you have taken. Given the integer array cardPoints and the integer k, return the maximum score you can obtain.",
      testCases: [
        {
          input: "cardPoints = [1,2,3,4,5,6,1], k = 3",
          output: "12",
          explanation:
            "After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.",
        },
        {
          input: "cardPoints = [2,2,2], k = 2",
          output: "4",
          explanation:
            "Regardless of which two cards you take, your score will always be 4.",
        },
        {
          input: "cardPoints = [9,7,7,9,7,7,9], k = 7",
          output: "55",
          explanation:
            "You have to take all the cards. Your score is the sum of points of all cards.",
        },
      ],
      code: `class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int N = cardPoints.size();

        int left = k-1, right = N - 1;
        int leftSum = 0, rightSum = 0;

        for (int i = 0; i < k; i++) { // O(k)
                leftSum += cardPoints[i];
        }

        int score = leftSum;

        while (k--) { // O(k)
            leftSum -= cardPoints[left];
            rightSum += cardPoints[right];

            left--;
            right--;

            score = max(score, leftSum + rightSum);
        }

        return score;
    }
};`,
      codeLineHighlights: [
        { line: 9, tone: "green" },
        { line: 16, tone: "green" },
        { line: 17, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Invert the problem: picking k cards from two ends = removing a contiguous subarray of size N−k.
- Start with sum of first k cards (all from left), then slide: remove leftmost, add rightmost.
- Track max \`leftSum + rightSum\` across all k+1 splits; \`left\` and \`right\` pointers move inward together.`,
    },
    {
      id: "longest-substring-with-at-most-k-distinct-characters",
      title: "Longest Substring with At Most K Distinct Characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
      tags: ["striver-a2z"],
      question: `You are given a string s consisting only lowercase alphabets and an integer k. Your task is to find the length of the longest substring that contains exactly k distinct characters.

Note : If no such substring exists, return -1. 

`,
      testCases: [
        {
          input: 's = "aabacbebebe", k = 3',
          output: "7",
          explanation:
            "The longest substring with exactly 3 distinct characters is 'cbebebe', which includes 'c', 'b', and 'e'.",
        },
        {
          input: 's = "aaaa", k = 2',
          output: "-1",
          explanation: "There's no substring with 2 distinct characters.",
        },
        {
          input: 's = "aabaaab", k = 2',
          output: "7",
          explanation:
            "The entire string 'aabaaab' has exactly 2 unique characters 'a' and 'b', making it the longest valid substring. ",
        },
      ],
      code: `class Solution {
  public:
    int longestKSubstr(string &s, int k) {
        int N = s.size();
        int left = 0, right = 0;
        
        unordered_map<char, int> mp;
        int ans = -1;
        
        while(right < N){ // O(N)
            mp[s[right]]++; // O(1) avg

            while(mp.size()>k){ // O(N) amortized
                mp[s[left]]--; // O(1) avg
                if(mp[s[left]] == 0){
                    mp.erase(s[left]); // O(1) avg
                }
                left++;
            }
            
            int len = right - left + 1;
            if(mp.size()==k){
                ans = max(ans, len);
            }
            
            right++;
        }
        
        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Longest window with at most k distinct chars tracked via frequency map.
- Shrink with \`while\` when \`map.size() > k\`; erase entry when its count hits 0.
- Update answer only when \`map.size() == k\` (exactly k distinct, not just at-most).
- Same pattern as \`Fruit Into Baskets\` with k=2 generalized to arbitrary k.`,
    },
    {
      id: "subarrays-with-k-different-integers",
      title: "Subarrays with K Different Integers",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/subarrays-with-k-different-integers/",
      tags: ["striver-a2z"],
      question:
        "Given an integer array nums and an integer k, return the number of good subarrays of nums. A good array is an array where the number of different integers in that array is exactly k. For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3. A subarray is a contiguous part of an array.",
      testCases: [
        {
          input: "nums = [1,2,1,2,3], k = 2",
          output: "7",
          explanation:
            "Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]",
        },
        {
          input: "nums = [1,2,1,3,4], k = 3",
          output: "3",
          explanation:
            "Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].",
        },
      ],
      code: `class Solution {
public:
    int helper(vector<int>& nums, int k) {
        int N = nums.size();
        int left = 0, right = 0;

        unordered_map<int, int> freq;
        int ans = 0;

        while(right < N){ // O(N)
            freq[nums[right]]++; // O(1) avg

            while(freq.size() > k){ // O(N) amortized
                freq[nums[left]]--; // O(1) avg

                if(freq[nums[left]] == 0){
                    freq.erase(nums[left]); // O(1) avg
                }
                
                left++;
            }

            
            if(freq.size() <= k){
                ans += (right - left + 1);
            }

            right++;
        }

        return ans;
    }

    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return helper(nums,k) - helper(nums,k-1);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      codeLineHighlights: [
        { line: 14, tone: "green" },
        { line: 15, tone: "green" },
        { line: 16, tone: "green" },
        { line: 35, tone: "green" },
      ],
      notes: `- Exactly k distinct = at-most k distinct minus at-most (k−1) distinct.
- Helper counts subarrays with at most k distinct; each valid step adds \`right - left + 1\`.
- Combines the two-helper trick from \`Binary Subarrays With Sum\` with the k-distinct window from \`Fruit Into Baskets\`.`,
    },
    {
      id: "minimum-window-substring",
      title: "Minimum Window Substring",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
      tags: ["striver-a2z", "neetcode-150"],
      question:
        'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "". The testcases will be generated such that the answer is unique.',
      testCases: [
        {
          input: 's = "ADOBECODEBANC", t = "ABC"',
          output: '"BANC"',
          explanation:
            "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t.",
        },
        {
          input: 's = "a", t = "a"',
          output: '"a"',
          explanation: "The entire string s is the minimum window.",
        },
        {
          input: 's = "a", t = "aa"',
          output: '""',
          explanation:
            "Both 'a's from t must be included in the window.\nSince the largest window of s only has one 'a', return empty string.",
        },
      ],
      code: `class Solution {
public:
    string minWindow(string s, string t) {
        int N = s.size();
        int left = 0, right = 0;

        unordered_map<char, int> freq;
        for(char i : t) { // O(M) where M = t.size()
            freq[i]++; // O(1) avg
        }

        int idx = -1;
        int len = INT_MAX;
        int ct = 0;

        while(right < N){ // O(N)
            freq[s[right]]--; // O(1) avg
            if(freq[s[right]]>=0){
                ct++;
            }

            while(ct == t.size()){ // O(N) amortized
                if((right - left + 1) < len){
                    idx = left;
                    len = right - left + 1;
                }
                

                freq[s[left]]++;
                if(freq[s[left]] > 0) {
                    ct--;
                }
                left++;
            }

            right++;
        }

        return idx == -1 ? "" : s.substr(idx,len); // O(len)
    }
};`,
      codeLineHighlights: [
        { line: 12, tone: "green" },
        { line: 13, tone: "green" },
        { line: 23, tone: "green" },
        { line: 24, tone: "green" },
        { line: 25, tone: "green" },
        { line: 30, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Preload \`freq\` with chars from \`t\`; decrement as window includes them.
- \`ct\` counts satisfied chars (freq ≥ 0); shrink when \`ct == t.size()\` to minimize window.
- Track best window with \`idx\` (start index) and \`len\`; return \`s.substr(idx, len)\`.
- Inner \`while\` shrinks greedily to find the smallest valid window before moving right.`,
    },
    {
      id: "permutation-in-string",
      title: "Permutation in String",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
      tags: ["neetcode-150"],
      question:
        "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.",
      testCases: [
        {
          input: 's1 = "ab", s2 = "eidbaooo"',
          output: "true",
          explanation: 's2 contains one permutation of s1 ("ba").',
        },
        {
          input: 's1 = "ab", s2 = "eidboaoo"',
          output: "false",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int N = s2.size();

        int left = 0, right = 0;

        vector<int> freq(26), freq2(26);
        
        for(char c : s1) { // O(M) where M = s1.size()
            freq[c - 'a']++;
        }

        while(right < N){ // O(N)
            freq2[s2[right] - 'a']++;

            if((right - left + 1) > s1.size()) {
                freq2[s2[left] - 'a']--;
                left++;
            }
            
            if(freq == freq2) {
                return true;
            }

            right++;
        }

        return false;
    }
};`,
      codeLineHighlights: [
        { line: 8, tone: "green" },
        { line: 17, tone: "green" },
      ],
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Fixed-size window of length \`s1.size()\` slides over \`s2\`; compare frequency vectors each step.
- Shrink by removing \`s2[left]\` when window exceeds \`s1.size()\`, not by a condition.
- Vector comparison \`freq == freq2\` is O(26) = O(1) since alphabet is fixed size.`,
    },
    {
      id: "sliding-window-maximum",
      title: "Sliding Window Maximum",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
      tags: ["neetcode-150"],
      question:
        "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
      testCases: [
        {
          input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          output: "[3,3,5,5,6,7]",
          explanation:
            "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7",
        },
        {
          input: "nums = [1], k = 1",
          output: "[1]",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int N = nums.size();
        deque<int> dq;
        vector<int> ans;

        for(int right = 0; right < N; right++) { // O(N)
            if(!dq.empty() && dq.front() <= right - k){
                dq.pop_front(); // O(1)
            }

            while(!dq.empty() && nums[dq.back()] <= nums[right]){ // O(N) amortized
                dq.pop_back(); // O(1)
            }

            dq.push_back(right); // O(1)

            if(right >= k-1) {
                ans.push_back(nums[dq.front()]);
            }
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Monotonic deque stores *indices* in decreasing order of their element values.
- Pop front if the index is outside the current window (\`dq.front() <= right - k\`).
- Pop back while the back element is ≤ current — it can never be the window's max.
- Front of deque is always the index of the current window maximum.`,
    },
    {
      id: "two-sum-ii-input-array-is-sorted",
      title: "Two Sum II - Input Array Is Sorted",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      question:
        "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers index1 and index2, each incremented by one, as an integer array [index1, index2] of length 2. The tests are generated such that there is exactly one solution. You may not use the same element twice. Your solution must use only constant extra space.",
      tags: ["neetcode-150"],
      testCases: [
        {
          input: "numbers = [2,7,11,15], target = 9",
          output: "[1,2]",
          explanation:
            "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].",
        },
        {
          input: "numbers = [2,3,4], target = 6",
          output: "[1,3]",
          explanation:
            "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].",
        },
        {
          input: "numbers = [-1,0], target = -1",
          output: "[1,2]",
          explanation:
            "The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].",
        },
      ],
      code: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int N = numbers.size();

        int left = 0, right = N - 1;

        int sum = 0;

        while (left < right) { // O(N)
            sum = numbers[right] + numbers[left];
            if (sum == target) {
                return {left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }

        }

        return {-1, -1};
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      codeLineHighlights: [
        { line: 12, tone: "green" },
        { line: 14, tone: "green" },
        { line: 16, tone: "green" },
      ],
      notes: `- Classic two-pointer on sorted array: if sum < target move left++, if sum > target move right--.
- Sorted order guarantees correctness — no need to check all pairs.
- Returns 1-indexed positions; add 1 to both pointers before returning.`,
    },
    {
      id: "3sum",
      title: "3Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/3sum/",
      tags: ["neetcode-150"],
      question:
        "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
      testCases: [
        {
          input: "nums = [-1,0,1,2,-1,-4]",
          output: "[[-1,-1,2],[-1,0,1]]",
          explanation:
            "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.",
        },
        {
          input: "nums = [0,1,1]",
          output: "[]",
          explanation: "The only possible triplet does not sum up to 0.",
        },
        {
          input: "nums = [0,0,0]",
          output: "[[0,0,0]]",
          explanation: "The only possible triplet sums up to 0.",
        },
      ],
      code: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end()); // O(N log N)

        for (int i = 0; i < nums.size(); i++) { // O(N)
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }

            int j = i + 1;
            int k = nums.size() - 1;

            while (j < k) { // O(N) per i
                int total = nums[i] + nums[j] + nums[k];

                if (total > 0) {
                    k--;
                } else if (total < 0) {
                    j++;
                } else {
                    res.push_back({nums[i], nums[j], nums[k]});
                    j++;

                    while (nums[j] == nums[j - 1] && j < k) { // O(N) amortized
                        j++;
                    }
                }
            }
        }
        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      codeLineHighlights: [
        { line: 5, tone: "green" },
        { line: 26, tone: "green" },
      ],
      notes: `- Sort first O(N log N), then fix each \`i\` and run two-pointer (\`j\`, \`k\`) on the remainder.
- Skip duplicate \`nums[i]\` with \`if (i > 0 && nums[i] == nums[i-1]) continue\` to avoid repeat triplets.
- Skip duplicate \`nums[j]\` after finding a triplet to avoid repeat results in the inner loop.`,
    },
    {
      id: "container-with-most-water",
      title: "Container With Most Water",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
      tags: ["neetcode-150"],
      question:
        "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.",
      testCases: [
        {
          input: "height = [1,8,6,2,5,4,8,3,7]",
          output: "49",
          explanation: "",
        },
        {
          input: "height = [1,1]",
          output: "1",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int maxArea = 0;

        while (left <= right) { // O(N)
            int currentArea = min(height[left], height[right]) * (right - left);
            maxArea = max(maxArea, currentArea);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      codeLineHighlights: [
        { line: 9, tone: "green" },
        { line: 10, tone: "green" },
      ],
      notes: `- Two pointers from both ends; move the pointer with the shorter height inward each step.
- Area = \`min(height[left], height[right]) * (right - left)\`; update max each step.
- Moving the taller pointer inward can only decrease area — always move the shorter one.`,
    },
    {
      id: "trapping-rain-water",
      title: "Trapping Rain Water",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
      tags: ["neetcode-150"],
      question:
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      testCases: [
        {
          input: "height = [4,2,0,3,2,5]",
          output: "9",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int trap(vector<int>& height) {
        int N = height.size();
        vector<int> l(N), r(N);
        l[0] = height[0];
        r[N - 1] = height[N - 1];
        for (int i = 1; i < N; i++) { // O(N)
            l[i] = max(l[i - 1], height[i]);
        }
        for (int i = N - 2; i >= 0; i--) { // O(N)
            r[i] = max(r[i + 1], height[i]);
        }
        int ans = 0;
        for (int i = 0; i < N; i++) { // O(N)
            ans += min(l[i], r[i]) - height[i];
        }
        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      codeLineHighlights: [
        { line: 5, tone: "green" },
        { line: 9, tone: "green" },
        { line: 12, tone: "green" },
        { line: 16, tone: "green" },
      ],
      notes: `- Precompute \`l[i]\` = max height to the left of i, \`r[i]\` = max height to the right.
- Water trapped at bar i = \`min(l[i], r[i]) - height[i]\`.
- Three O(N) passes: build l[], build r[], accumulate water. O(N) space for the two arrays.`,
    },
  ],
}
