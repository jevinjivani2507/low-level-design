import { DsaTopic } from "../dsa-data"

export const binarySearch: DsaTopic = {
  topic: "Binary Search",
  questions: [
    {
      id: "template",
      title: "Template",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
      question: `Patterns
=> FFFTTT (First TRUE → Minimize)
  - Example: minimum capacity, minimum speed
  - Move:
    - valid(mid) → high = mid - 1
    - invalid(mid) → low = mid + 1
  - Answer = low (first TRUE)

=> TTTFFF (Last TRUE → Maximize)
  - Example: maximum distance
  - Move:
    - valid(mid) → low = mid + 1
    - invalid(mid) → high = mid - 1
  - Answer = high (last TRUE)

=> Ask:
  If I increase my answer, does it become easier or harder?
    - Easier → FFFTTT
    - Harder → TTTFFF`,
      testCases: [],
      code: `class Solution {
public:
    bool valid(vector<int>& nums, int mid) {
        // 0. CHECK if mid is a valid answer
        // return true / false
    }

    int template(vector<int>& nums) {
        int low = ...;   // minimum possible answer
        int high = ...;  // maximum possible answer

        while (low <= high) { // O(log N)
            int mid = low + (high - low) / 2;

            int ans = valid(nums, mid);

            // 1. CHECK validity
            if (condition) {

                high = mid - 1; // or low = mid + 1
                
            } else {

                // 2B. MOVE RIGHT (need bigger answer)
                low = mid + 1; // or high = mid - 1
            }
        }

        // 3. RETURN answer
        return low;  // or high (depends on problem)
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- Binary search over an answer space: ask "does mid satisfy?" and shrink halves.
- FFFTTT (first TRUE → minimize): valid → \`high = mid - 1\`; invalid → \`low = mid + 1\`; answer = \`low\`.
- TTTFFF (last TRUE → maximize): valid → \`low = mid + 1\`; invalid → \`high = mid - 1\`; answer = \`high\`.
- Always use \`mid = low + (high - low) / 2\` to avoid integer overflow.`,
    },
    {
      id: "search-insert-position",
      title: "Search Insert Position",
      difficulty: "Easy",
      tags: ["striver-a2z"],
      leetcodeUrl: "https://leetcode.com/problems/search-insert-position/",
      question:
        "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.",
      testCases: [
        {
          input: "nums = [1,3,5,6], target = 5",
          output: "2",
          explanation: "",
        },
        {
          input: "nums = [1,3,5,6], target = 2",
          output: "1",
          explanation: "",
        },
        {
          input: "nums = [1,3,5,6], target = 7",
          output: "4",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int searchInsert(vector<int>& nums, int x) {
        int N = nums.size();
        int l = 0;
        int r = N - 1;

        while (l <= r) { // O(log N)
            int mid = l + (r - l) / 2;
            if (nums[mid] >= x) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- Classic \`lower_bound\`: find the first index where \`nums[i] >= x\`.
- FFFTTT pattern — valid (\`nums[mid] >= x\`) shrinks right, invalid shrinks left.
- When loop ends, \`l\` points to the insert position (may equal \`N\` if x is larger than all).`,
    },
    {
      id: "find-first-and-last-position-of-element-in-sorted-array",
      title: "Find First and Last Position of Element in Sorted Array",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl:
        "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      question:
        "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.",
      testCases: [
        {
          input: "nums = [5,7,7,8,8,10], target = 8",
          output: "[3,4]",
          explanation: "",
        },
        {
          input: "nums = [5,7,7,8,8,10], target = 6",
          output: "[-1,-1]",
          explanation: "",
        },
        {
          input: "nums = [], target = 0",
          output: "[-1,-1]",
          explanation: "",
        },
      ],
      code: `class Solution {

private:
    int lower_bound(vector<int>& v, int x) {
        int N = v.size();
        int l = 0;
        int r = N - 1;

        int ans = N;

        while (l <= r) { // O(log N)
            int mid = l + (r - l) / 2;
            if (v[mid] >= x) {
                ans = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return ans;
    }

public:
    vector<int> searchRange(vector<int>& v, int x) {
        int N = v.size();
        if (N == 0)
            return {-1, -1};
        int first = lower_bound(v, x);

        if (first == N || v[first] != x) {
            return {-1, -1};
        }
        int last = lower_bound(v, x + 1);

        return {first, last - 1};
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- Use \`lower_bound\` twice: first = lower_bound(x), last = lower_bound(x+1) - 1.
- If \`first == N\` or \`v[first] != x\`, the target doesn't exist → return {-1, -1}.
- Each call is O(log N); avoids having to write a separate upper_bound helper.`,
    },
    {
      id: "search-in-rotated-sorted-array",
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium",
      tags: ["striver-a2z", "neetcode-150"],
      leetcodeUrl:
        "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      question:
        "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
      testCases: [
        {
          input: "nums = [4,5,6,7,0,1,2], target = 0",
          output: "4",
          explanation: "",
        },
        {
          input: "nums = [4,5,6,7,0,1,2], target = 3",
          output: "-1",
          explanation: "",
        },
        {
          input: "nums = [1], target = 0",
          output: "-1",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int search(vector<int>& v, int k) {
        int N = v.size();
        int l = 0;
        int r = N-1;

        while(l<=r){ // O(log N)
            int mid = l + (r-l)/2;
            if(v[mid]==k) return mid;

            if(v[l]<=v[mid]){
                if(v[l]<=k && k<=v[mid]){
                    r = mid-1;
                }else{
                    l = mid+1;
                }
            }else{
                if(v[mid]<=k && k<=v[r]){
                    l = mid+1;
                }else{
                    r = mid-1;
                }
            }
        }

        return -1;
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- At any mid, at least one half (\`[l..mid]\` or \`[mid..r]\`) is sorted — identify which.
- Check \`v[l] <= v[mid]\`: if true, left half is sorted; otherwise right half is sorted.
- Move into the sorted half only if target lies within its range; otherwise go the other way.
- Distinct values — no ambiguity between left/right halves.`,
    },
    {
      id: "search-in-rotated-sorted-array-ii",
      title: "Search in Rotated Sorted Array II",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl:
        "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
      question:
        "There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4]. Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums. You must decrease the overall operation steps as much as possible.",
      testCases: [
        {
          input: "nums = [2,5,6,0,0,1,2], target = 0",
          output: "true",
          explanation: "",
        },
        {
          input: "nums = [2,5,6,0,0,1,2], target = 3",
          output: "false",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    bool search(vector<int>& v, int k) {
        int N = v.size();
        int l = 0;
        int r = N-1;

        while(l<=r){ // O(log N) avg, O(N) worst
            int mid = l + (r-l)/2;
            if(v[mid]==k) return true;

            if(v[l]==v[mid] && v[mid]==v[r]){
                l++;
                r--;
            }else if(v[l]<=v[mid]){
                if(v[l]<=k && k<=v[mid]){
                    r = mid-1;
                }else{
                    l = mid+1;
                }
            }else{
                if(v[mid]<=k && k<=v[r]){
                    l = mid+1;
                }else{
                    r = mid-1;
                }
            }
        }

        return false;
    }
};`,
      timeComplexity: "O(log N) avg, O(N) worst",
      spaceComplexity: "O(1)",
      notes: `- Same as \`Search in Rotated Sorted Array\` but with duplicates breaking the sorted-half check.
- When \`v[l] == v[mid] == v[r]\`, we can't decide — shrink both ends by 1 and retry.
- Worst case degrades to O(N) when the array is all duplicates; average still O(log N).`,
    },
    {
      id: "find-minimum-in-rotated-sorted-array",
      title: "Find Minimum in Rotated Sorted Array",
      difficulty: "Medium",
      tags: ["striver-a2z", "neetcode-150"],
      leetcodeUrl:
        "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      question:
        "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become: [4,5,6,7,0,1,2] if it was rotated 4 times. [0,1,2,4,5,6,7] if it was rotated 7 times. Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]]. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
      testCases: [
        {
          input: "nums = [3,4,5,1,2]",
          output: "1",
          explanation: "The original array was [1,2,3,4,5] rotated 3 times.",
        },
        {
          input: "nums = [4,5,6,7,0,1,2]",
          output: "0",
          explanation:
            "The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.",
        },
        {
          input: "nums = [11,13,15,17]",
          output: "11",
          explanation:
            "The original array was [11,13,15,17] and it was rotated 4 times.",
        },
      ],
      code: `class Solution {
public:
    int findMin(vector<int>& v) {
        int N = v.size();
        int l = 0;
        int r = N - 1;

        int ans = INT_MAX;

        while (l <= r) { // O(log N)
            int mid = l + (r - l) / 2;
            if (v[l] <= v[mid]) {
                ans = min(ans, v[l]);
                l = mid + 1;
            } else {
                ans = min(ans, v[mid]);
                r = mid - 1;
            }
        }

        return ans;
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- One half is always sorted — take its leftmost value as a candidate min, then recurse into the other half.
- If \`v[l] <= v[mid]\` the left half is sorted → candidate \`v[l]\`, move \`l = mid + 1\`.
- Otherwise the right half (including mid) contains the minimum → candidate \`v[mid]\`, move \`r = mid - 1\`.`,
    },
    {
      id: "single-element-in-a-sorted-array",
      title: "Single Element in a Sorted Array",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl:
        "https://leetcode.com/problems/single-element-in-a-sorted-array/",
      question:
        "You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Return the single element that appears only once. Your solution must run in O(log n) time and O(1) space.",
      testCases: [
        {
          input: "nums = [1,1,2,3,3,4,4,8,8]",
          output: "2",
          explanation: "",
        },
        {
          input: "nums = [3,3,7,7,10,11,11]",
          output: "10",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int singleNonDuplicate(vector<int>& v) {
        int N = v.size();
        if(N==1) return v[0];
        if (v[0] != v[1]) return v[0];
        if (v[N-1] != v[N-2]) return v[N-1];


        int l = 0;
        int r = N-1;
        while(l<=r){ // O(log N)
            int mid = l + (r-l)/2;
            int isEven = mid%2==0;

            if(isEven){
                if(v[mid]==v[mid+1]){
                    l = mid+1;
                }else{
                    r = mid-1;
                }
            }else{
                if(v[mid]==v[mid-1]){
                    l = mid+1;
                }else{
                    r = mid-1;
                }
            }
        }

        return v[l];
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- In a fully-paired array, first of each pair sits at an even index, second at an odd index.
- Before the single element, pairs follow (even, odd); after it the parity flips.
- At \`mid\`: if \`mid\` is even and \`v[mid] == v[mid+1]\`, single is to the right; otherwise to the left.
- Handle N == 1 and the two end cases up front to avoid out-of-bounds in the loop.`,
    },
    {
      id: "find-peak-element",
      title: "Find Peak Element",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl: "https://leetcode.com/problems/find-peak-element/",
      question:
        "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array. You must write an algorithm that runs in O(log n) time.",
      testCases: [
        {
          input: "nums = [1,2,3,1]",
          output: "2",
          explanation:
            "3 is a peak element and your function should return the index number 2.",
        },
        {
          input: "nums = [1,2,1,3,5,6,4]",
          output: "5",
          explanation:
            "Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.",
        },
      ],
      code: `class Solution {
public:
    int findPeakElement(vector<int>& v) {
        int N = v.size();
        if (N == 1)
            return 0;
        if (N == 2)
            return v[0] > v[1] ? 0 : 1;
        if (v[0] > v[1])
            return 0;
        if (v[N - 2] < v[N - 1])
            return N - 1;
        int l = 1;
        int r = N - 2;

        while (l <= r) { // O(log N)
            int mid = l + (r - l) / 2;
            if (v[mid] > v[mid + 1]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- Compare \`v[mid]\` with \`v[mid+1]\`: descending → peak is at mid or left; ascending → peak is right.
- FFFTTT pattern where "valid" means \`v[mid] > v[mid+1]\` (start of descending slope).
- Handle N == 1, N == 2, and both ends first so the inner search stays within \`[1, N-2]\`.`,
    },
    {
      id: "koko-eating-bananas",
      title: "Koko Eating Bananas",
      difficulty: "Medium",
      tags: ["striver-a2z", "neetcode-150"],
      leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      question:
        "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours.",
      testCases: [
        {
          input: "piles = [3,6,7,11], h = 8",
          output: "4",
          explanation: "",
        },
        {
          input: "piles = [30,11,23,4,20], h = 5",
          output: "30",
          explanation: "",
        },
        {
          input: "piles = [30,11,23,4,20], h = 6",
          output: "23",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    long long calculateTotalHours(vector<int>& piles, int speed) { // O(N)
        long long totalH = 0;
        for (int bananas : piles) {
            totalH += (bananas + speed - 1) / speed;
        }
        return totalH;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int maxPile = *max_element(piles.begin(), piles.end()); // O(N)

        int low = 1, high = maxPile;

        while (low <= high) { // O(log M)
            int mid = (low + high) / 2;
            long long totalH = calculateTotalHours(piles, mid);

            if (totalH <= h) {
                high = mid - 1;
            }
            else {
                low = mid + 1;
            }
        }
        return low;
    }
};`,
      timeComplexity: "O(N log M)",
      spaceComplexity: "O(1)",
      notes: `- Binary search on the answer space (eating speed), not on the array.
- FFFTTT: bigger speed → fewer hours → easier to finish; minimize the first speed where \`totalH <= h\`.
- Search range: \`[1, max(piles)]\`; for each \`mid\` sum \`ceil(pile / mid)\` across piles.
- \`(bananas + speed - 1) / speed\` is integer ceiling division.`,
    },
    {
      id: "minimum-number-of-days-to-make-m-bouquets",
      title: "Minimum Number of Days to Make m Bouquets",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
      question:
        "You are given an integer array bloomDay, an integer m and an integer k. You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden. The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet. Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.",
      testCases: [
        {
          input: "bloomDay = [1,10,3,10,2], m = 3, k = 1",
          output: "3",
          explanation:
            "Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.\nWe need 3 bouquets each should contain 1 flower.\nAfter day 1: [x, _, _, _, _]   // we can only make one bouquet.\nAfter day 2: [x, _, _, _, x]   // we can only make two bouquets.\nAfter day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.",
        },
        {
          input: "bloomDay = [1,10,3,10,2], m = 3, k = 2",
          output: "-1",
          explanation:
            "We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.",
        },
        {
          input: "bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3",
          output: "12",
          explanation:
            "We need 2 bouquets each should have 3 flowers.\nHere is the garden after the 7 and 12 days:\nAfter day 7: [x, x, x, x, _, x, x]\nWe can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.\nAfter day 12: [x, x, x, x, x, x, x]\nIt is obvious that we can make two bouquets in different ways.",
        },
      ],
      code: `class Solution {
public:
    long long helper(vector<int>& v, int k, long long q){ // O(N)
        vector<long long> vv;
        long long ans = 0;
        for(int i : v) i<=q ? vv.push_back(1) : vv.push_back(0);
        int ct=0;
        for(long long i : vv){
            if(i==1) ct++;
            else{
                ans+=ct/k;
                ct=0;
            }

        }
        ans+=ct/k;
        return ans;
    }
    int minDays(vector<int>& v, int m, int k) {
        int n = v.size();
        long long tt = (long long)m*(long long)k;
        if(tt>n) return -1;

        long long l = INT_MAX;
        long long r = INT_MIN;
        for(int i : v){ // O(N)
            l = min((int)l,i);
            r = max((int)r,i);
        }

        while(l<=r){ // O(log R)
            long long mid = l + (r-l)/2;
            long long days = helper(v,k,mid);
            if((int)days>=m){
                r = mid-1;
            }else{
                l = mid+1;
            }
        }
        return (int)l;
    }
};`,
      timeComplexity: "O(N log R)",
      spaceComplexity: "O(1)",
      notes: `- Binary search on \`day\`; helper counts how many bouquets are possible by that day.
- FFFTTT: more days → more bloomed → more bouquets → minimize the first day where \`bouquets >= m\`.
- Early exit: if \`m * k > n\`, it's impossible → return -1.
- Helper marks bloomed flowers (\`v[i] <= day\`) and counts runs of k adjacent bloomed.`,
    },
    {
      id: "find-the-smallest-divisor-given-a-threshold",
      title: "Find the Smallest Divisor Given a Threshold",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl:
        "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
      question:
        "Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less than or equal to threshold. Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: 7/3 = 3 and 10/2 = 5). The test cases are generated so that there will be an answer.",
      testCases: [
        {
          input: "nums = [1,2,5,9], threshold = 6",
          output: "5",
          explanation:
            "We can get a sum to 17 (1+2+5+9) if the divisor is 1. \nIf the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).",
        },
        {
          input: "nums = [44,22,33,11,1], threshold = 5",
          output: "44",
          explanation: "",
        },
      ],
      code: `class Solution {
public:
    int helper(vector<int>& nums, int divider){ // O(N)
        int res = 0;
        for(int i:nums){
            res += (i+divider-1)/divider;
        }

        return res;
    }

    int smallestDivisor(vector<int>& nums, int threshold) {
        sort(nums.begin(),nums.end()); // O(N log N)

        int low = 1;
        int high = *max_element(nums.begin(),nums.end()); // O(N)

        while(low<=high){ // O(log R)
            int mid = low + (high-low)/2;

            int res = helper(nums,mid);

            if(res<=threshold){
                high = mid-1;
            }else{
                low = mid+1;
            }
        }

        return low;
    }
};`,
      timeComplexity: "O(N log R)",
      spaceComplexity: "O(1)",
      notes: `- Binary search on divisor; helper sums \`ceil(nums[i] / divisor)\` across the array.
- FFFTTT: bigger divisor → smaller sum → easier to stay under threshold; minimize.
- Search range: \`[1, max(nums)]\`. The initial \`sort\` is not required for correctness.`,
    },
    {
      id: "capacity-to-ship-packages-within-d-days",
      title: "Capacity To Ship Packages Within D Days",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl:
        "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
      question:
        "A conveyor belt has packages that must be shipped from one port to another within days days. The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.",
      testCases: [
        {
          input: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
          output: "15",
          explanation:
            "A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:\n1st day: 1, 2, 3, 4, 5\n2nd day: 6, 7\n3rd day: 8\n4th day: 9\n5th day: 10\n\nNote that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.",
        },
        {
          input: "weights = [3,2,2,4,1,4], days = 3",
          output: "6",
          explanation:
            "A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:\n1st day: 3, 2\n2nd day: 2, 4\n3rd day: 1, 4",
        },
        {
          input: "weights = [1,2,3,1,1], days = 4",
          output: "3",
          explanation: "1st day: 1\n2nd day: 2\n3rd day: 3\n4th day: 1, 1",
        },
      ],
      code: `class Solution {
public:
    int helper(vector<int>& weights, int weight){ // O(N)
        int curr = 0;
        int res = 1;
        for(int i:weights){
            if(i+curr<=weight){
                curr+=i;
            }else{
                res++;
                curr = i;
            }
        }

        return res;
    }

    int shipWithinDays(vector<int>& weights, int days) {
        int low = 0;
        int high = 0;

        for(int i : weights){ // O(N)
            low = max(low,i); high+=i;
        }


        while(low<=high){ // O(log S)
            int mid = low + (high-low)/2;
            int res = helper(weights,mid);

            if(res<=days){
                high = mid-1;
            }else{
                low = mid+1;
            }
        }

        return low;
    }
};`,
      timeComplexity: "O(N log S)",
      spaceComplexity: "O(1)",
      notes: `- Binary search on ship capacity; helper simulates greedy day-by-day loading.
- FFFTTT: bigger capacity → fewer days needed; minimize capacity where \`days_used <= days\`.
- Search range: \`[max(weights), sum(weights)]\` — the minimum feasible floor and ceiling.`,
    },
    {
      id: "kth-missing-positive-number",
      title: "Kth Missing Positive Number",
      difficulty: "Easy",
      tags: ["striver-a2z"],
      leetcodeUrl: "https://leetcode.com/problems/kth-missing-positive-number/",
      question:
        "Given an array arr of positive integers sorted in a strictly increasing order, and an integer k. Return the kth positive integer that is missing from this array.",
      testCases: [
        {
          input: "arr = [2,3,4,7,11], k = 5",
          output: "9",
          explanation:
            "The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.",
        },
        {
          input: "arr = [1,2,3,4], k = 2",
          output: "6",
          explanation:
            "The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.",
        },
      ],
      code: `class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int low = 0;
        int high = arr.size()-1;

        while(low<=high){ // O(log N)
            int mid = low + (high-low)/2;

            int missing = arr[mid] - (mid+1);
            
            if(missing<k){
                low = mid+1;
            }else{
                high = mid-1;
            }
        }

        return low + k;
    }
};`,
      timeComplexity: "O(log N)",
      spaceComplexity: "O(1)",
      notes: `- At index \`mid\`, missing count = \`arr[mid] - (mid + 1)\` (how many positives are skipped).
- FFFTTT on missing count: shrink right when \`missing >= k\`, left when \`missing < k\`.
- Answer is \`low + k\` — \`low\` points to the first index where enough numbers are missing.`,
    },
    {
      id: "aggressive-cows",
      title: "Aggressive Cows",
      difficulty: "Medium",
      tags: ["striver-a2z"],
      leetcodeUrl: "https://www.geeksforgeeks.org/problems/aggressive-cows/1",
      question:
        "You are given an array with unique elements of stalls[], which denote the positions of stalls. You are also given an integer k which denotes the number of aggressive cows. The task is to assign stalls to k cows such that the minimum distance between any two of them is the maximum possible.",
      testCases: [
        {
          input: "stalls = [1,2,4,8,9], k = 3",
          output: "3",
          explanation:
            "The first cow can be placed at stalls[0], the second cow can be placed at stalls[2] and the third cow can be placed at stalls[3]. The minimum distance between cows in this case is 3, which is the largest among all possible ways.",
        },
        {
          input: "stalls = [10, 1, 2, 7, 5], k = 3",
          output: "4",
          explanation:
            "The first cow can be placed at stalls[0], the second cow can be placed at stalls[1] and the third cow can be placed at stalls[4]. The minimum distance between cows in this case is 4, which is the largest among all possible ways.",
        },
        {
          input: "stalls = [2, 12, 11, 3, 26, 7], k = 5",
          output: "1",
          explanation:
            "There are 6 stalls and only 5 cows, we try to place the cows such that the minimum distance between any two cows is as large as possible. The minimum distance between cows in this case is 1, which is the largest among all possible ways.",
        },
      ],
      code: `class Solution {
  public:
    int helper(vector<int> stalls, int dist){
        int last = 0;
        int cows = 1;
        for(int i=1;i<stalls.size();i++){
            if(stalls[i]-stalls[last]>=dist){
                cows++;
                last = i;
            }
        }
        
        return cows;
    }
  
    int aggressiveCows(vector<int> &stalls, int k) {
        sort(stalls.begin(),stalls.end());
        int low = 1;
        int high = stalls.back() - stalls.front();
        
        while(low<=high){
            int mid = low + (high-low)/2;
            
            int cows = helper(stalls,mid);

            if(cows>=k){
                low = mid+1;
            }else{
                high = mid-1;
            }       
        }
        
        
        return high;
    }
};`,
      timeComplexity: "",
      spaceComplexity: "",
      notes: ``,
    },
    {
      id: "split-array-largest-sum",
      title: "Split Array Largest Sum",
      difficulty: "Hard",
      tags: ["striver-a2z"],
      leetcodeUrl: "https://leetcode.com/problems/split-array-largest-sum/",
      question:
        "Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split. A subarray is a contiguous part of the array.",
      testCases: [
        {
          input: "nums = [7,2,5,10,8], k = 2",
          output: "18",
          explanation:
            "There are four ways to split nums into two subarrays.\nThe best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.",
        },
        {
          input: "nums = [1,2,3,4,5], k = 2",
          output: "9",
          explanation:
            "There are four ways to split nums into two subarrays.\nThe best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.",
        },
      ],
      code: `class Solution {
public:
    int helper(vector<int>& nums, int maxSum){ // O(N)
        int parts = 1;
        int sum = 0;
        for(int i:nums){
            if(sum+i<=maxSum){
                sum+=i;
            }else{
                parts++;
                sum = i;
            }
        }


        return parts;
    }
    int splitArray(vector<int>& nums, int k) {
        int low = *max_element(nums.begin(),nums.end()); // O(N)
        int high = accumulate(nums.begin(),nums.end(),0); // O(N)

        while(low<=high){ // O(log S)
            int mid = low + (high-low)/2;

            int parts = helper(nums,mid);

            if(parts<=k){
                high = mid-1;
            }else{
                low = mid+1;
            }
        }

        return low;
    }
};`,
      timeComplexity: "O(N log S)",
      spaceComplexity: "O(1)",
      notes: `- Binary search on the answer: the minimum possible "largest subarray sum".
- FFFTTT: larger maxSum → fewer parts needed; minimize maxSum where \`parts <= k\`.
- Search range: \`[max(nums), sum(nums)]\` — single element floor, whole-array ceiling.
- Same pattern as \`Capacity To Ship Packages Within D Days\`.`,
    },
    {
      id: "median-of-two-sorted-arrays",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["striver-a2z", "neetcode-150"],
      leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      question:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
      testCases: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation: "merged array = [1,2,3] and median is 2.",
        },
        {
          input: "nums1 = [1,2], nums2 = [3,4]",
          output: "2.50000",
          explanation:
            "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
        },
      ],
      code: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& v1, vector<int>& v2) {
        int N = v1.size();
        int M = v2.size();
        if(M<N) return findMedianSortedArrays(v2,v1); // ensure v1 is smaller

        int low = 0;
        int high = N;

        int K = (N+M+1)/2;

        while(low<=high){ // O(log min(N,M))
            int cut1 = low + (high-low)/2;
            int cut2 = K-cut1;

            int l1 = cut1==0 ? INT_MIN : v1[cut1-1];
            int l2 = cut2==0 ? INT_MIN : v2[cut2-1];

            int r1 = cut1==N ? INT_MAX : v1[cut1];
            int r2 = cut2==M ? INT_MAX : v2[cut2];

            if(l1<=r2 && l2<=r1){
                return (N+M)%2 ? max(l1,l2) : (((max(l1,l2) + min(r1,r2))/2.0));
            }else{
                if(l1>r2){
                    high = cut1-1;
                }else{
                    low = cut1+1;
                }
            }

        }

        return 0.0;
    }
};`,
      timeComplexity: "O(log (min(N,M)))",
      spaceComplexity: "O(1)",
      notes: `- Binary search on the smaller array for a cut \`cut1\`; \`cut2 = K - cut1\` is derived.
- Goal: left partition has \`K = (N+M+1)/2\` elements; all left elements ≤ all right elements.
- Check \`l1 <= r2 && l2 <= r1\`: if true, median found; else move cut1 toward the violating side.
- Use \`INT_MIN\` / \`INT_MAX\` sentinels when a cut is at array boundary.`,
    },
    {
      id: "search-a-2d-matrix",
      title: "Search a 2D Matrix",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
      question:
        "You are given an m x n integer matrix matrix with the following two properties: Each row is sorted in non-decreasing order. The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.",
      testCases: [
        {
          input:
            "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 8",
          output: "true",
          explanation:
            "Treat the matrix as one sorted array; binary search finds 8.",
          matrices: [
            [
              [1, 4, 7, 11],
              [2, 5, 8, 12],
              [3, 6, 9, 16],
              [10, 13, 14, 17],
            ],
          ],
        },
        {
          input:
            "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 20",
          output: "false",
          matrices: [
            [
              [1, 4, 7, 11],
              [2, 5, 8, 12],
              [3, 6, 9, 16],
              [10, 13, 14, 17],
            ],
          ],
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "search-a-2d-matrix-ii",
      title: "Search a 2D Matrix II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
      question:
        "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties: Integers in each row are sorted in ascending from left to right. Integers in each column are sorted in ascending from top to bottom.",
      testCases: [],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
    {
      id: "find-a-peak-element-ii",
      title: "Find a Peak Element II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/find-a-peak-element-ii/",
      question:
        "A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbors to the left, right, top, and bottom. Given a 0-indexed m x n matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] and return the length 2 array [i,j]. You may assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell. You must write an algorithm that runs in O(m log(n)) or O(n log(m)) time.",
      testCases: [
        {
          input: "mat = [[1,4],[3,2]]",
          output: "[0,1]",
          explanation:
            "Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers.",
        },
        {
          input: "mat = [[10,20,15],[21,30,14],[7,16,32]]",
          output: "[1,1]",
          explanation:
            "Both 30 and 32 are peak elements so [1,1] and [2,2] are both acceptable answers.",
        },
      ],
      code: "",
      timeComplexity: "",
      spaceComplexity: "",
      notes: "",
    },
  ],
}
