class ShortUrlsController < ApplicationController
    def create
      url = ShortUrl.create(original_url: params[:long_url])
      render json: url, status: :created
    end

    def redirect
      url = ShortUrl.find_by!(short_url: params[:short_url])
      
      # return the long url and then redirect user to the origina url
      render json: { longUrl: url.original_url }, status: :found, location: url.original_url
    end
end

#TODO: Grab the Title tag from the target url and save it to db
