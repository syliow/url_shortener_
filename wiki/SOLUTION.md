# Short URL Generation Solution

## The Approach

I'm using **Base62 encoding** on database IDs to generate short URLs.

Base62 uses: `0-9` + `a-z` + `A-Z` = 62 characters total

**How it works:**

1. User creates a URL → database assigns an ID (1, 2, 3...)
2. Add 1 billion to the ID
3. Convert to Base62
4. Result: `15FTGf`, `15FTGg`, etc.

## Why Base62 Instead of Random Strings?

I choose Base62 over random strings to avoid checking the database for duplicates on every generation.

**Problem with random strings:**

- Every time you generate a code, you need to check if the random str already exists in the database
- As you get more URLs, this check gets slower

**Why Base62:**

- Database IDs are already guaranteed to be unique
- No need to check for collisions

## The 1 Billion Offset

Without the offset, the first URLs would start from `1`, `2`, `3` - single digit codes that don't look good as short urls.

By adding 1 billion offset before encoding:

```
ID 1 → 1,000,000,001 → 15FTGf (6 characters)
ID 2 → 1,000,000,002 → 15FTGg (6 characters)
```

**Why 1 billion specifically?**

I did the math on Base62:

- 62^5 = ~916 million
- 62^6 = ~56 billion

Starting at 1 billion ensures all codes are at least 6 characters long, which looks more professional and user-friendly.

## Limitations & Issues

### Short url codes are too predictable

The short URLs follow a pattern: `15FTGf` → `15FTGg` → `15FTGh`. A user with malicious intent could potentially predict all the URLs in the system.

The 1 billion offset makes codes start at 6 characters but doesn't fix the sequential
pattern. For production, I would add a 2 character random suffix (like `15FTGf` → `15FTGfX7`)
to make codes unpredictable.

### Can't use 301 redirects even its faster (breaks analytics)

I initially thought about using 301 (permanent) redirects since they're more efficient, but browsers cache them forever. After the first click, the browser would skip the server entirely and go straight to the target url. All the analytics will be lost after the first visit.

So I went with 302 (temporary) redirects instead. This ensure every click hits the server, which means we can track everything. The downside is it adds a bit of latency compared to cached 301 even tho redirect should always prioritize on speed.

### Title fetching blocks the request

When creating a short URL, I fetch the page title from the target website during the request. If that site is slow to respond, the whole API call gets stuck waiting for the data.

The ideal solution is to implement a background job for fetching titles, but I kept it synchronous for simplicity. For a take home assessment it's fine, but in production I would return the short URL immediately and fetch the title async.

### Redirect latency from tracking

Right now when someone clicks a short URL, I geocode their IP and save the visit to the database before redirecting them. This adds latency for every redirect.

I track visits before redirecting because losing clicks would defeat the whole point of
having analytics. The tradeoff is added latency (for geocoding + DB write).
For the traffic levels in this assessment, this is fine. At production scale, I would switch
to async tracking with background jobs (Sidekiq/ActiveJob).

### No rate limiting or caching yet

Everything hits the database directly right now. If someone spams the URL creation endpoint, nothing prevents them from doing it. And the analytics queries (`COUNT(visits.id)`) will get slow as the visits table grows.

For scalability, I would consider Redis for:

- Rate limiting (track requests per IP to prevent spamming)
- Caching visit counts (update in memory instead of counting via query every time)

For this take-home, I focused on getting the core functionality working first. The tradeoffs are documented based on what I understood about the requirements and constraints.
