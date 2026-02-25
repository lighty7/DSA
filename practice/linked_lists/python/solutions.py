import heapq


def reverse_list_array(values):
    return list(reversed(values))


def merge_sorted_arrays(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out


def remove_nth_from_end_array(values, n):
    idx = len(values) - n
    return values[:idx] + values[idx + 1:]


def reorder_list_array(values):
    out = []
    i, j = 0, len(values) - 1
    while i <= j:
        if i == j:
            out.append(values[i])
            break
        out.append(values[i]); out.append(values[j])
        i += 1; j -= 1
    return out


def reverse_k_group_array(values, k):
    out = []
    for i in range(0, len(values), k):
        chunk = values[i:i+k]
        out.extend(reversed(chunk) if len(chunk) == k else chunk)
    return out


def merge_k_sorted_arrays(lists):
    heap = []
    for arr_idx, arr in enumerate(lists):
        if arr:
            heapq.heappush(heap, (arr[0], arr_idx, 0))
    out = []
    while heap:
        val, aidx, i = heapq.heappop(heap)
        out.append(val)
        if i + 1 < len(lists[aidx]):
            heapq.heappush(heap, (lists[aidx][i+1], aidx, i+1))
    return out
