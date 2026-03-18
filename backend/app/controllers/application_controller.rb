class ApplicationController < ActionController::API
  def root
    render json: { message: "URL Shortener API is running" }, status: :ok
  end
end
