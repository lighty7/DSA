from collections import Counter


def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []


def is_anagram(s, t):
    return Counter(s) == Counter(t)


def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    prefix = 1
    for i in range(n):
        out[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        out[i] *= suffix
        suffix *= nums[i]
    return out


def longest_consecutive(nums):
    st = set(nums)
    best = 0
    for n in st:
        if n - 1 not in st:
            cur = n
            length = 1
            while cur + 1 in st:
                cur += 1
                length += 1
            best = max(best, length)
    return best


def trap_rain_water(height):
    l, r = 0, len(height) - 1
    left_max = right_max = 0
    ans = 0
    while l < r:
        if height[l] < height[r]:
            left_max = max(left_max, height[l])
            ans += left_max - height[l]
            l += 1
        else:
            right_max = max(right_max, height[r])
            ans += right_max - height[r]
            r -= 1
    return ans


def min_window_substring(s, t):
    if not t or not s:
        return ""
    need = Counter(t)
    missing = len(t)
    left = start = end = 0
    for right, ch in enumerate(s, 1):
        if need[ch] > 0:
            missing -= 1
        need[ch] -= 1
        if missing == 0:
            while left < right and need[s[left]] < 0:
                need[s[left]] += 1
                left += 1
            if end == 0 or right - left < end - start:
                start, end = left, right
            need[s[left]] += 1
            missing += 1
            left += 1
    return s[start:end]
