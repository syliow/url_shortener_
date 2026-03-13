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

# Database Schema Draft

## Urls Table (For redirect)

- id (PK): integer
- short_url: string
- target_url: string
- title: string
- created_at: datetime

## Clicks Table (For report)

- id (PK): integer
- url_id: integer
- ip_address: string
- country: string
- city: string (city might be optional?)
- clicked_at: datetime
