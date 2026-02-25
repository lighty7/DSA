from collections import Counter


def max_average_subarray(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i-k]
        best = max(best, window)
    return best / k


def find_anagrams(s, p):
    need = Counter(p)
    window = Counter()
    out = []
    k = len(p)
    for i, ch in enumerate(s):
        window[ch] += 1
        if i >= k:
            left = s[i-k]
            window[left] -= 1
            if window[left] == 0:
                del window[left]
        if window == need:
            out.append(i-k+1)
    return out


def character_replacement(s, k):
    counts = Counter()
    left = max_count = ans = 0
    for right, ch in enumerate(s):
        counts[ch] += 1
        max_count = max(max_count, counts[ch])
        while right - left + 1 - max_count > k:
            counts[s[left]] -= 1
            left += 1
        ans = max(ans, right - left + 1)
    return ans


def check_inclusion(s1, s2):
    need = Counter(s1)
    window = Counter()
    k = len(s1)
    for i, ch in enumerate(s2):
        window[ch] += 1
        if i >= k:
            old = s2[i-k]
            window[old] -= 1
            if window[old] == 0:
                del window[old]
        if window == need:
            return True
    return False


def min_window_substring(s, t):
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
            if end == 0 or right-left < end-start:
                start, end = left, right
            need[s[left]] += 1
            missing += 1
            left += 1
    return s[start:end]


def find_substring_concat(s, words):
    if not s or not words:
        return []
    word_len = len(words[0])
    total_len = word_len * len(words)
    target = Counter(words)
    out = []
    for i in range(word_len):
        left = i
        seen = Counter()
        count = 0
        for right in range(i, len(s)-word_len+1, word_len):
            w = s[right:right+word_len]
            if w in target:
                seen[w] += 1
                count += 1
                while seen[w] > target[w]:
                    lw = s[left:left+word_len]
                    seen[lw] -= 1
                    left += word_len
                    count -= 1
                if count == len(words):
                    out.append(left)
            else:
                seen.clear()
                count = 0
                left = right + word_len
    return out
