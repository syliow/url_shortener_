Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  post "/shorten", to: "short_urls#create"
  get "/urls", to: "short_urls#index"
  get "/urls/:short_url", to: "short_urls#show"
  get "/:short_url", to: "short_urls#redirect"

  # Defines the root path route ("/")
  # root "posts#index"
end
