URL Shortener README

Deployed Application URL\
https://url-shortener-coingecko-test.onrender.com

## Features

- **Short URL generation** - Convert long URLs into short codes using Base62 encoding
- **Click tracking** - Track every visit with location data (city, country)
- **Analytics dashboard** - View visit counts and geographic breakdown for your URLs

## API Endpoints

```
POST   /api/short_urls          - Create a new short URL
GET    /api/short_urls          - List all short URLs with analytics
GET    /:short_code             - Redirect to original URL (tracks the visit)
```

## Limitations

This is an MVP with some known issues around performance and security. Check out [wiki/SOLUTION.md](wiki/SOLUTION.md) for details on the limitations and workarounds.

If you're curious about my thought process while building this, I kept some rough notes in [THOUGHT_PROCESS.md](THOUGHT_PROCESS.md), they are a bit messy and unpolished but show how I worked through the requirements.

## Installation Guide

Clone the repo
`git clone https://github.com/syliow/url_shortener_coingecko_test.git`

For `/frontend`

1. `cd url_shortener_coingecko_test/frontend`
2. Run `npm install`
3. Copy the variables from `/frontend/.env.example` and create `/frontend/.env`
4. Replace the env placeholder with your value
5. Start the project with `npm run dev`
6. Your frontend is now running on `http://localhost:5173/`

For `/backend`

1. `cd url_shortener_coingecko_test/backend`
2. Copy the variables from `/backend/.env.example` and create `/backend/.env`
3. Replace the env placeholder with your value
4. Install dependencies with `bundle install`
5. Setup PostgreSQL database `rails db:create`
6. Run the migrations `rails db:migrate`
7. Start the server `rails server`
8. Your backend is now running on `http://localhost:3000`

Tech Stack

Frontend

- React
- Vite
- TailwindCSS

Backend

- Ruby
- Rails
- PostgreSQL
- Geocoder gem (For geolocation)

Frontend: https://url-shortener-coingecko-test.vercel.app \
Backend API: https://url-shortener-coingecko-test-1.onrender.com
