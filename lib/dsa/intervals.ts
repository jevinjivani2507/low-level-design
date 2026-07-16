import { DsaTopic } from "../dsa-data"

export const intervals: DsaTopic = {
  topic: "Intervals",
  questions: [
    {
      id: "insert-interval",
      title: "Insert Interval",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
      tags: ["blind-75"],
      question:
        "Given a list of non-overlapping intervals sorted by start and a new interval, insert it and merge any overlaps. Return the resulting list of non-overlapping intervals.",
      testCases: [
        {
          input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
          output: "[[1,5],[6,9]]",
        },
        {
          input:
            "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
          output: "[[1,2],[3,10],[12,16]]",
        },
      ],
      code: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals,
                               vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();

        // 1. intervals entirely before newInterval
        while (i < n && intervals[i][1] < newInterval[0]) { // O(N)
            res.push_back(intervals[i++]);
        }

        // 2. merge all overlapping intervals into newInterval
        while (i < n && intervals[i][0] <= newInterval[1]) { // O(N)
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);

        // 3. intervals entirely after newInterval
        while (i < n) res.push_back(intervals[i++]); // O(N)

        return res;
    }
};`,
      timeComplexity: "O(N)",
      spaceComplexity: "O(N)",
      notes: `- Three phases: copy intervals ending before the new one, merge overlaps, copy the rest.
- Overlap test: an interval overlaps if its start ≤ newInterval's end.
- Input is pre-sorted, so a single linear pass suffices — no sort needed.`,
    },
    {
      id: "merge-intervals",
      title: "Merge Intervals",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
      tags: ["blind-75"],
      question:
        "Given an array of intervals, merge all overlapping intervals and return the non-overlapping intervals that cover all the input ranges.",
      testCases: [
        {
          input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          output: "[[1,6],[8,10],[15,18]]",
          explanation: "[1,3] and [2,6] overlap → [1,6].",
        },
        {
          input: "intervals = [[1,4],[4,5]]",
          output: "[[1,5]]",
        },
      ],
      code: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end()); // O(N log N) by start
        vector<vector<int>> res;

        for (auto& iv : intervals) { // O(N)
            if (res.empty() || res.back()[1] < iv[0]) {
                res.push_back(iv); // no overlap → new interval
            } else {
                res.back()[1] = max(res.back()[1], iv[1]); // extend
            }
        }

        return res;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Sort by start, then sweep: overlap if the next start ≤ current merged end.
- On overlap, extend the last interval's end to the max of the two.
- Sorting dominates the runtime; the merge pass is linear.`,
    },
    {
      id: "non-overlapping-intervals",
      title: "Non-overlapping Intervals",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
      tags: ["blind-75"],
      question:
        "Given an array of intervals, return the minimum number of intervals you must remove so that the rest are non-overlapping.",
      testCases: [
        {
          input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
          output: "1",
          explanation: "Remove [1,3] to make the rest non-overlapping.",
        },
        {
          input: "intervals = [[1,2],[1,2],[1,2]]",
          output: "2",
        },
      ],
      code: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(),
             [](auto& a, auto& b) { return a[1] < b[1]; }); // O(N log N) by end

        int count = 0, end = INT_MIN;
        for (auto& iv : intervals) { // O(N)
            if (iv[0] >= end) end = iv[1]; // keep it, advance end
            else count++;                  // overlaps → remove
        }

        return count;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(1)",
      notes: `- Greedy: sort by end time and always keep the interval that finishes earliest.
- If an interval starts before the last kept end, it overlaps → remove it.
- Keeping earliest-ending intervals leaves the most room for the rest.`,
    },
    {
      id: "meeting-rooms",
      title: "Meeting Rooms",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/",
      tags: ["blind-75"],
      question:
        "Given an array of meeting time intervals, determine if a person could attend all meetings (no two meetings overlap). LeetCode Premium.",
      testCases: [
        {
          input: "intervals = [[0,30],[5,10],[15,20]]",
          output: "false",
          explanation: "[0,30] overlaps [5,10].",
        },
        {
          input: "intervals = [[7,10],[2,4]]",
          output: "true",
        },
      ],
      code: `class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end()); // O(N log N) by start

        for (int i = 1; i < intervals.size(); i++) { // O(N)
            if (intervals[i][0] < intervals[i - 1][1]) return false; // overlap
        }

        return true;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(1)",
      notes: `- Sort by start; adjacent meetings overlap if the next starts before the previous ends.
- Any overlap means the person can't attend all meetings.
- Sorting dominates; the check is a single linear pass.`,
    },
    {
      id: "meeting-rooms-ii",
      title: "Meeting Rooms II",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
      tags: ["blind-75"],
      question:
        "Given an array of meeting time intervals, return the minimum number of conference rooms required. LeetCode Premium.",
      testCases: [
        {
          input: "intervals = [[0,30],[5,10],[15,20]]",
          output: "2",
          explanation: "[0,30] overlaps both others, needing a second room.",
        },
        {
          input: "intervals = [[7,10],[2,4]]",
          output: "1",
        },
      ],
      code: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        int n = intervals.size();
        vector<int> starts(n), ends(n);
        for (int i = 0; i < n; i++) { // O(N)
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        sort(starts.begin(), starts.end()); // O(N log N)
        sort(ends.begin(), ends.end());     // O(N log N)

        int rooms = 0, res = 0, j = 0;
        for (int i = 0; i < n; i++) { // O(N)
            if (starts[i] < ends[j]) rooms++;   // meeting starts before one ends
            else j++;                            // a room freed up, reuse it
            res = max(res, rooms);
        }

        return res;
    }
};`,
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      notes: `- Separate and sort start and end times; sweep both with two pointers.
- A start before the earliest unfreed end needs a new room; otherwise reuse one.
- The running max of concurrent meetings is the number of rooms needed.`,
    },
  ],
}
