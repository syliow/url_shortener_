class ShortUrlsController < ApplicationController
    def create
      # Testing with hardcoded value for now
      url = ShortUrl.create(
        long_url: params[:long_url],
        short_url: "example123",
        title: "ExampleTitle"
      )
      render json: url, status: :created
    end
end
