import { DsaTopic } from "../dsa-data"

export const greedy: DsaTopic = {
  topic: "Greedy",
  questions: [
    {
      id: "jump-game-ii",
      title: "Jump Game II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
      tags: ["neetcode-150"],
      question:
        "Given an array nums where nums[i] is the max jump length from index i, return the minimum number of jumps to reach the last index. You can always reach it.",
      testCases: [
        {
          input: "nums = [2,3,1,1,4]",
          output: "2",
          explanation: "Jump 1 to index 1, then 3 to the last index.",
        },
        { input: "nums = [2,3,0,1,4]", output: "2" },
      ],
      code: `class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, curEnd = 0, farthest = 0;

        for (int i = 0; i + 1 < (int)nums.size(); i++) { // O(N)
            farthest = max(farthest, i + nums[i]);
            if (i == curEnd) {           // must jump now to go further
                jumps++;
                curEnd = farthest;
            }
        }

        return jumps;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- BFS-by-levels on the array: each "level" is the range reachable with j jumps.
- Track the farthest reach within the current level; jump when you hit its end.
- Stop before the last index so you don't over-count a final jump.`,
    },
    {
      id: "gas-station",
      title: "Gas Station",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/gas-station/",
      tags: ["neetcode-150"],
      question:
        "There are n gas stations in a circle. gas[i] is fuel at station i and cost[i] is fuel needed to reach the next. Return the starting index to complete the circuit once, or -1 if impossible.",
      testCases: [
        {
          input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
          output: "3",
          explanation: "Start at index 3 to make the full loop.",
        },
        { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1" },
      ],
      code: `class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total = 0, tank = 0, start = 0;

        for (int i = 0; i < (int)gas.size(); i++) { // O(N)
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) {   // can't reach i+1 from current start
                start = i + 1;
                tank = 0;
            }
        }

        return total >= 0 ? start : -1;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- If total gas ≥ total cost a solution exists and is unique.
- Whenever the tank goes negative, no station up to i can be the start → restart at i+1.
- Single pass: the running \`start\` after the loop is the answer.`,
    },
    {
      id: "hand-of-straights",
      title: "Hand of Straights",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/hand-of-straights/",
      tags: ["neetcode-150"],
      question:
        "Given an array hand of card values and an integer groupSize, return true if the cards can be rearranged into groups of groupSize consecutive cards.",
      testCases: [
        {
          input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          output: "true",
          explanation: "[1,2,3],[2,3,4],[6,7,8].",
        },
        {
          input: "hand = [1,2,3,4,5], groupSize = 4",
          output: "false",
        },
      ],
      code: `class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        map<int, int> count; // ordered: smallest key first
        for (int c : hand) count[c]++; // O(N log N)

        while (!count.empty()) { // O(N)
            int start = count.begin()->first;
            for (int i = start; i < start + groupSize; i++) { // O(groupSize log N)
                auto it = count.find(i);
                if (it == count.end()) return false; // missing consecutive card
                if (--it->second == 0) count.erase(it);
            }
        }

        return true;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Greedy: always build a group starting from the smallest remaining card.
- An ordered map gives the current minimum in O(1) and erases empty counts.
- If any consecutive card is missing while forming a group, it's impossible.`,
    },
    {
      id: "merge-triplets-to-form-target-triplet",
      title: "Merge Triplets to Form Target Triplet",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
      tags: ["neetcode-150"],
      question:
        "Given triplets and a target triplet, you may repeatedly pick two triplets and update one to the elementwise max. Return true if you can form the target.",
      testCases: [
        {
          input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
          output: "true",
        },
        {
          input: "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]",
          output: "false",
          explanation:
            "No triplet can contribute a 2 without exceeding target.",
        },
      ],
      code: `class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        bool a = false, b = false, c = false;

        for (auto& t : triplets) { // O(N)
            // usable only if no component exceeds the target
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                if (t[0] == target[0]) a = true;
                if (t[1] == target[1]) b = true;
                if (t[2] == target[2]) c = true;
            }
        }

        return a && b && c;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Only triplets whose every element ≤ target are safe to merge in.
- Among those, check each target position can be hit exactly by some triplet.
- Max-merge never decreases a value, so exceeding target once is unrecoverable.`,
    },
    {
      id: "partition-labels",
      title: "Partition Labels",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/partition-labels/",
      tags: ["neetcode-150"],
      question:
        "Given a string s, partition it into as many parts as possible so that each letter appears in at most one part. Return the sizes of these parts in order.",
      testCases: [
        {
          input: 's = "ababcbacadefegdehijhklij"',
          output: "[9,7,8]",
        },
        { input: 's = "eccbbbbdec"', output: "[10]" },
      ],
      code: `class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<int> last(26, 0);
        for (int i = 0; i < (int)s.size(); i++) last[s[i] - 'a'] = i; // O(N)

        vector<int> res;
        int start = 0, end = 0;
        for (int i = 0; i < (int)s.size(); i++) { // O(N)
            end = max(end, last[s[i] - 'a']); // extend to last occurrence
            if (i == end) {                   // no letter reaches past here
                res.push_back(end - start + 1);
                start = i + 1;
            }
        }

        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Precompute each letter's last index; a part must extend to the max last-index seen.
- Close a partition when the scan index reaches that running end.
- Fixed 26-entry table → O(1) extra space.`,
    },
    {
      id: "valid-parenthesis-string",
      title: "Valid Parenthesis String",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/valid-parenthesis-string/",
      tags: ["neetcode-150"],
      question:
        "Given a string s of '(', ')' and '*', where '*' can be '(' , ')' or empty, return true if s can be a valid parentheses string.",
      testCases: [
        { input: 's = "(*)"', output: "true" },
        { input: 's = "(*))"', output: "true" },
        { input: 's = ")("', output: "false" },
      ],
      code: `class Solution {
public:
    bool checkValidString(string s) {
        int lo = 0, hi = 0; // min and max possible open-paren count

        for (char c : s) { // O(N)
            if (c == '(') { lo++; hi++; }
            else if (c == ')') { lo--; hi--; }
            else { lo--; hi++; } // '*' → could close, stay, or open
            if (hi < 0) return false; // too many ')' even treating '*' as '('
            if (lo < 0) lo = 0;       // never let the min drop below 0
        }

        return lo == 0; // some assignment balances exactly
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      notes: `- Track a range [lo, hi] of how many '(' could still be open.
- '*' widens the range; if hi goes negative there are unmatched ')'.
- Clamp lo at 0 and accept if lo can reach 0 at the end.`,
    },
  ],
}
