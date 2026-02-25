from collections import deque


def level_order_array_tree(arr):
    if not arr:
        return []
    levels = []
    q = deque([(0, 0)])
    while q:
        idx, depth = q.popleft()
        if idx >= len(arr) or arr[idx] is None:
            continue
        if depth == len(levels):
            levels.append([])
        levels[depth].append(arr[idx])
        q.append((2*idx+1, depth+1))
        q.append((2*idx+2, depth+1))
    return levels


def flood_fill(image, sr, sc, color):
    old = image[sr][sc]
    if old == color:
        return image
    rows, cols = len(image), len(image[0])
    q = deque([(sr, sc)])
    image[sr][sc] = color
    while q:
        r, c = q.popleft()
        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and image[nr][nc] == old:
                image[nr][nc] = color
                q.append((nr, nc))
    return image


def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    seen = set()
    def dfs(r, c):
        stack = [(r,c)]
        while stack:
            x,y = stack.pop()
            if (x,y) in seen or x<0 or y<0 or x>=rows or y>=cols or grid[x][y] != "1":
                continue
            seen.add((x,y))
            stack.extend([(x+1,y),(x-1,y),(x,y+1),(x,y-1)])
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1" and (r,c) not in seen:
                count += 1
                dfs(r,c)
    return count


def can_finish_courses(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indeg = [0] * num_courses
    for a, b in prerequisites:
        graph[b].append(a)
        indeg[a] += 1
    q = deque(i for i, d in enumerate(indeg) if d == 0)
    done = 0
    while q:
        node = q.popleft()
        done += 1
        for nxt in graph[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                q.append(nxt)
    return done == num_courses


def ladder_length(begin, end, word_list):
    words = set(word_list)
    if end not in words:
        return 0
    q = deque([(begin,1)])
    while q:
        word, dist = q.popleft()
        if word == end:
            return dist
        for i in range(len(word)):
            for ch in 'abcdefghijklmnopqrstuvwxyz':
                cand = word[:i] + ch + word[i+1:]
                if cand in words:
                    words.remove(cand)
                    q.append((cand, dist+1))
    return 0


def serialize_deserialize_roundtrip(arr):
    data = ','.join('#' if x is None else str(x) for x in arr)
    back = [None if x == '#' else int(x) for x in data.split(',')]
    return back == arr
