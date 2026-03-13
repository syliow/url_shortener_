class ShortUrlsController < ApplicationController
    def create
      # The Model's after_create hook now handles the unique Base62 generation
      url = ShortUrl.create(long_url: params[:long_url])
      render json: url, status: :created
    end
end
