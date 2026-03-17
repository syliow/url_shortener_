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

Honestly, random strings would be much easier to implement, but I wanted to try and think of something more scalable.

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
