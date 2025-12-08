export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type ProblemCategory =
  | "Array"
  | "String"
  | "Linked List"
  | "Tree"
  | "Graph"
  | "Dynamic Programming"
  | "Sorting"
  | "Searching"
  | "Stack"
  | "Queue"
  | "Hash Table"
  | "Two Pointers"
  | "Sliding Window"
  | "Binary Search"
  | "Recursion"
  | "Backtracking"
  | "Greedy"
  | "Math";

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: DifficultyLevel;
  category: ProblemCategory[];
  description: string;
  examples: TestCase[];
  constraints: string[];
  hints?: string[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  solution?: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    code: {
      javascript?: string;
      python?: string;
      java?: string;
    };
  };
  companies?: string[];
  relatedTopics?: string[];
  acceptance?: number;
  submissions?: number;
}

export const dsaProblems: DSAProblem[] = [
  {
    id: "1",
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists.",
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Try using a hash table.",
      "What if you stored the complement (target - current number) in a hash table as you iterate through the array?",
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
    
}`,
      python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your code here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`,
    },
    solution: {
      approach:
        "Use a hash map to store the complement of each number. As we iterate through the array, we check if the current number exists in the hash map. If it does, we have found our pair.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: {
        javascript: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        python: `def two_sum(nums, target):
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
        
        seen[num] = i
    
    return []`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[] {};
    }
}`,
      },
    },
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Apple"],
    relatedTopics: ["Hash Table", "Array"],
    acceptance: 49.5,
    submissions: 15420000,
  },
  {
    id: "2",
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: ["String", "Two Pointers"],
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a **palindrome**, or \`false\` otherwise.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: [
      "1 <= s.length <= 2 * 10⁵",
      "s consists only of printable ASCII characters.",
    ],
    hints: [
      "Use two pointers, one from the start and one from the end.",
      "Skip non-alphanumeric characters and compare lowercase versions of characters.",
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // Write your code here
    
}`,
      python: `def is_palindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your code here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Write your code here
        
    }
}`,
    },
    solution: {
      approach:
        "Use two pointers approach. Start from both ends and move towards the center, skipping non-alphanumeric characters and comparing lowercase versions.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: {
        javascript: `function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}`,
        python: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True`,
      },
    },
    companies: ["Amazon", "Microsoft", "Apple", "Facebook"],
    relatedTopics: ["Two Pointers", "String"],
    acceptance: 44.2,
    submissions: 8930000,
  },
  {
    id: "3",
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: ["Array", "Dynamic Programming"],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 <= nums.length <= 10⁵", "-10⁴ <= nums[i] <= 10⁴"],
    hints: [
      "Think about using Kadane's algorithm.",
      "At each position, you either extend the current subarray or start a new one.",
      "Keep track of the maximum sum seen so far.",
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    // Write your code here
    
}`,
      python: `def max_sub_array(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Write your code here
    pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        
    }
}`,
    },
    solution: {
      approach:
        "Use Kadane's algorithm. Maintain a running sum and update the maximum. If the running sum becomes negative, reset it to 0.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: {
        javascript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
        python: `def max_sub_array(nums):
    max_sum = current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
        java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}`,
      },
    },
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Apple"],
    relatedTopics: ["Array", "Dynamic Programming", "Divide and Conquer"],
    acceptance: 50.8,
    submissions: 12340000,
  },
];

export function getProblemBySlug(slug: string): DSAProblem | undefined {
  return dsaProblems.find((problem) => problem.slug === slug);
}

export function getProblemsByDifficulty(
  difficulty: DifficultyLevel
): DSAProblem[] {
  return dsaProblems.filter((problem) => problem.difficulty === difficulty);
}

export function getProblemsByCategory(category: ProblemCategory): DSAProblem[] {
  return dsaProblems.filter((problem) => problem.category.includes(category));
}
