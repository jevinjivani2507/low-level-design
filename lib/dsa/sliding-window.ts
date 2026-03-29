import { DsaTopic } from "../dsa-data"

export const slidingWindow: DsaTopic = {
  topic: "Sliding Window",
  questions: [
    {
      id: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
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

        while (right < N) {
            if (mp.count(s[right])) {
                left = max(left, mp[s[right]] + 1);
            }

            ans = max(ans, right - left + 1);
            mp[s[right]] = right;
            right++;
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "max-consecutive-ones-iii",
      title: "Max Consecutive Ones III",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/max-consecutive-ones-iii/",
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

        while (r < N) {
            if (nums[r] == 0)
                zero++;
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
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "fruit-into-baskets",
      title: "Fruit Into Baskets",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/fruit-into-baskets/",
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

        while (right < N) {
            freq[fruits[right]]++;

            while (freq.size() > 2) {
                freq[fruits[left]]--;

                if (freq[fruits[left]] == 0) {
                    freq.erase(fruits[left]);
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
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "longest-repeating-character-replacement",
      title: "Longest Repeating Character Replacement",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-repeating-character-replacement/",
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

        while (right < N) {
            freq[s[right] - 'A']++;
            maxCount = max(maxCount, freq[s[right] - 'A']);

            while ((right - left + 1) - maxCount > k) {
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
      notes: "",
    },
    {
      id: "binary-subarrays-with-sum",
      title: "Binary Subarrays With Sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/binary-subarrays-with-sum/",
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

        while(right < N){
            currSum += nums[right];

            while(currSum > goal){
                currSum -= nums[left];
                left++;
            }

            ans += (right - left + 1);
            right++;
        }

        return ans;
    }
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        return maxSubarraysSum(nums,  goal) - maxSubarraysSum(nums,  goal-1);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "count-number-of-nice-subarrays",
      title: "Count Number of Nice Subarrays",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/count-number-of-nice-subarrays/",
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

        while(right < N){
            if(nums[right] % 2 == 1) {
                oddCount++;
            }

            while(oddCount > k){
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
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "number-of-substrings-containing-all-three-characters",
      title: "Number of Substrings Containing All Three Characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
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

        while(right < N){
            freq[s[right] - 'a']++;

            while(freq[0] > 0 && freq[1] > 0 && freq[2] > 0){

                ans += (N - right);

                freq[s[left] - 'a']--;
                left++;
            }

            right++;
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "maximum-points-you-can-obtain-from-cards",
      title: "Maximum Points You Can Obtain from Cards",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
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

        for (int i = 0; i < k; i++) {
                leftSum += cardPoints[i];
        }

        int score = leftSum;

        while (k--) {
            leftSum -= cardPoints[left];
            rightSum += cardPoints[right];

            left--;
            right--;

            score = max(score, leftSum + rightSum);
        }

        return score;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "longest-substring-with-at-most-k-distinct-characters",
      title: "Longest Substring with At Most K Distinct Characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
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
        
        while(right < N){
            mp[s[right]]++;
            
            while(mp.size()>k){
                mp[s[left]]--;
                if(mp[s[left]] == 0){
                    mp.erase(s[left]);
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
      notes: "",
    },
    {
      id: "subarrays-with-k-different-integers",
      title: "Subarrays with K Different Integers",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/subarrays-with-k-different-integers/",
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

        while(right < N){
            freq[nums[right]]++;

            while(freq.size() > k){
                freq[nums[left]]--;

                if(freq[nums[left]] == 0){
                    freq.erase(nums[left]);
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
      notes: "",
    },
    {
      id: "minimum-window-substring",
      title: "Minimum Window Substring",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
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
        for(char i : t) {
            freq[i]++;
        }

        int idx = -1;
        int len = INT_MAX;
        int ct = 0;

        while(right < N){
            freq[s[right]]--;
            if(freq[s[right]]>=0){
                ct++;
            }

            while(ct == t.size()){
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

        return idx == -1 ? "" : s.substr(idx,len);
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "permutation-in-string",
      title: "Permutation in String",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
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
        
        for(char c : s1) {
            freq[c - 'a']++;
        }

        while(right < N){
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
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: "",
    },
    {
      id: "sliding-window-maximum",
      title: "Sliding Window Maximum",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
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

        for(int right = 0; right < N; right++) {
            if(!dq.empty() && dq.front() <= right - k){
                dq.pop_front();
            }

            while(!dq.empty() && nums[dq.back()] <= nums[right]){
                dq.pop_back();
            }

            dq.push_back(right);

            if(right >= k-1) {
                ans.push_back(nums[dq.front()]);
            }
        }

        return ans;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: "",
    },
  ],
}
