Some initial thoughts on the assignment:

# Functional Requirements

- User can shorten a URL: the shorten URL needs to be unique (no duplicate)
- Redirect user to long URL when accessing the shorten URL
- User can view the analytics of the shorten URL (e.g. number of clicks, geolocation, timestamp of each visit)

# Non Functional Requirements

- Focus should be minimizing the latency of redirecting user to long URL, analytics can come after redirect

Example of bit.ly link

- https://bit.ly/4blRtkN -> uses 7 characters for the short URL
- Need to decide on how many characters are we using and why

# API Schema Draft

- POST /api/urls/shorten

  request: long_url

  response: short_url, title

- GET /api/urls/:short_url

  response: redirect to long_url

TODO: Analytics

# Schema Draft

## Urls Table (For redirect)

- id (PK): integer
- short_url: string
- target_url: string
- title: string
- created_at: datetime

## Visits Table (For report)

- id (PK): integer
- short_url: string
- ip_address: string
- country: string
- city: string
- clicked_at: datetime

# Analytics for Visits Table

## (For listing all short_urls)

- short_url: string
- original_url: string
- title: string
- created_at: datetime
- visits_count: integer

## (For each record of short_url visits)

- short_url: string
- original_url: string
- title: string
- city: string
- country: string
- clicked_at: datetime

# Backend API

- Rails uses MVC architecture
- Model, View, Controller
- Model: controls the data logic
- view: the website ui
- controller: the api endpoint

# Tradeoffs

1. for ShortUrl table: use text instead of string because we want to NOT have a limit for long URLS (Example: user can enter long url that exceeds 255 characters)

2. For `Generating unique code for Short URL`

- Chosen solution: Base62 instead of random string
- Issue: Generated code is very predictable (e.g. 000001, 000002, ...)
- Workaround: Add 1 billion to the id before generating the code
- Why it works: 62^5 = 916 132 832 (largest number for 5 digits in base62), so if we start from 1b, we can guarantee every code starts from 6 digits (e.g: 1M8Qfg that does not look as predictable as 000001)

3. For `GET/ urls` under analytics

- ShortUrl.all returns the result fine, but it is not sustainable if the scale grows (e.g. 100k urls)
- Need to add pagination or limit to X amount of urls
- Temp idea: join with visits table and count the number of visits for each url
