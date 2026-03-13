class ShortUrlsController < ApplicationController
    def create
      url = ShortUrl.create(original_url: params[:long_url])
      render json: url, status: :created
    end
end
