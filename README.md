URL Shortener README

Deployed Application URL
DEPLOYED_URL_HERE

Installation Guide
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

Frontend: http://localhost:5173
Backend API: http://localhost:3000
